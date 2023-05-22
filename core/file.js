const fileUpload = require('express-fileupload');
const path = require('path');

module.exports = (server) => {
    server.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
        uriDecodeFileNames: true,
        useTempFiles : true ,
        tempFileDir : path.join(__dirname, '../temp')
    }));
}
