const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
const { promisify } = require('util');
const parser = new xml2js.Parser();

exports.getTropicalCycloneData = async (req, res) => {
    try {
        const kmlUrl = 'https://www.nhc.noaa.gov/gis/kml/nhc_active.kml';
        const { data } = await axios.get(kmlUrl);
        
        // Using promisify to handle the xml parsing in an async/await fashion
        const parseStringAsync = promisify(parser.parseString);
        try {
            const result = await parseStringAsync(data);
            if (!result || !result.kml || !result.kml.Document || !result.kml.Document[0].Folder) {
                console.error('Unexpected data structure:', result);
                return res.status(500).send('KML data structure is not as expected');
            }
            
            const parsedData = result.kml.Document[0].Folder.map(folder => {
                if (folder.$.id.startsWith('wsp')) {
                    return parseWindSpeedProbabilities(folder);
                } else {
                    return parseTropicalStorm(folder);
                }
            });

            res.json(parsedData); // Send the parsed data as a response
        } catch (parseError) {
            console.error('Parsing error:', parseError);
            res.status(500).send('Error parsing KML data');
        }
    } catch (error) {
        console.error('Error fetching tropical cyclone data:', error);
        res.status(500).send('Failed to fetch tropical cyclone data');
    }
};

function parseWindSpeedProbabilities(folder) {
    return {
        type: 'WindSpeedProbability',
        details: {
            name: folder.name[0],
            visibility: parseInt(folder.visibility[0]),
            open: parseInt(folder.open[0]),
            links: folder.Folder[0].NetworkLink.map(link => ({
                id: link.$.id,
                name: link.name[0],
                visibility: parseInt(link.visibility[0]),
                open: parseInt(link.open[0]),
                href: link.Link[0].href[0]
            }))
        }
    };
}

function parseTropicalStorm(folder) {
    const extendedData = {};
    if (folder.ExtendedData && folder.ExtendedData[0] && folder.ExtendedData[0].Data) {
        folder.ExtendedData[0].Data.forEach(dataItem => {
            if (dataItem.$ && dataItem.$.name && dataItem.value) {
                extendedData[dataItem.$.name] = dataItem.value[0];
            }
        });
    }

    return {
        type: 'TropicalStorm',
        details: {
            name: folder.name[0],
            visibility: parseInt(folder.visibility[0], 10),
            open: parseInt(folder.open[0], 10),
            extendedData: extendedData // this is now an object with named properties
        },
        links: folder.NetworkLink ? folder.NetworkLink.map(link => ({
            id: link.$ ? link.$.id : undefined,
            name: link.name[0],
            visibility: parseInt(link.visibility[0], 10),
            open: parseInt(link.open[0], 10),
            href: link.Link ? link.Link[0].href[0] : undefined
        })) : []
    };
}

exports.downloadKmzFiles = async (req, res) => {
    const kmzUrl = req.query.kmzUrl; // URL to a KMZ file
    const response = await axios({
        url: kmzUrl,
        method: 'GET',
        responseType: 'stream'
    });

    const path = `downloads/${kmzUrl.split('/').pop()}`;
    const writer = fs.createWriteStream(path);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};
