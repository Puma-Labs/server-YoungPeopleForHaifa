const {Schema, model} = require('mongoose')

const EventModel = new Schema({
    title: {type: String, require: true},
    place: {type: String, require: true},
    date: {type: Date, require: true},
    time: {type: Date, require: true},
    cover: {type: String},
    text: {type: String, require: true},
    status: {type: String},
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

module.exports = model('Event', EventModel);
