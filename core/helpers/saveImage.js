const FileSystem = require('fs');
const ApiError = require('../exceptions/api-error')
const fsExtra = require('fs-extra');

function saveImage (path, fileName, base64) {
    if(typeof base64 === 'undefined' || base64.length < 30) {
        throw ApiError.BedRequest("Image cannot be less than 30 bytes")
    }

    let base64Image = base64.replace("data:image/png;base64,", "");
    base64Image = base64.replace("data:image/jpeg;base64,", "");

    fsExtra.ensureFileSync(`./public${path}${fileName}`);
    FileSystem.writeFile(`./public${path}${fileName}`, base64Image, 'base64', () => {});
    return `${path}${fileName}`
}

module.exports = saveImage
