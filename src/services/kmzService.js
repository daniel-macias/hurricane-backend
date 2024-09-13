const axios = require('axios');
const JSZip = require('jszip');
const xml2js = require('xml2js');

async function downloadKMZ(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const zip = new JSZip();
  return zip.loadAsync(response.data);
}

async function extractAndConvertKMZ(kmzData) {
    const kmlFile = Object.keys(kmzData.files).find(filename => filename.endsWith('.kml'));
    const kmlContent = await kmzData.file(kmlFile).async("string");
    return convertKMLtoJSON(kmlContent);
}
  
function convertKMLtoJSON(kml) {
    return new Promise((resolve, reject) => {
      xml2js.parseString(kml, { mergeAttrs: true }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
}

module.exports = {
  downloadKMZ,
  extractAndConvertKMZ,
  convertKMLtoJSON,
};