const {Schema, model} = require('mongoose')

const QRModel = new Schema({
    id: {type: String, require: true},
    title: {type: String, require: true},
    svgURL: {type: String},
    content: {type: String},
    sheetURL: {type: String},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

module.exports = model('QR', QRModel);
