const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs');
const { promisify } = require('util');
const parser = new xml2js.Parser();

exports.getTropicalCycloneData = async (req, res) => {
    try {
        const kmlUrl = 'https://www.nhc.noaa.gov/gis/kml/nhc_active.kml';
        const { data } = await axios.get(kmlUrl);
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error('Parsing error:', err);
                res.status(500).send('Error parsing KML data');
                return;
            }
            if (!result || !result.kml || !result.kml.Document || !result.kml.Document[0].Folder) {
                console.error('Unexpected data structure:', result);
                res.status(500).send('KML data structure is not as expected');
                return;
            }
            let item = 0;
            const items = result.kml.Document[0].Folder.map(folder => {
                console.log(item);
                if(item == 0){
                    //Header data
                    console.log(folder);
                }else if (item == 1){
                    //Hurricane data
                    console.log(folder.ExtendedData[1])
                    console.log(folder.NetworkLink);
                }else{
                    //Something went wrong
                }

                
                item++;
            });
            

            res.json(items);
        });
    } catch (error) {
        console.error('Error fetching tropical cyclone data:', error);
        res.status(500).send('Failed to fetch tropical cyclone data');
    }
};
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
