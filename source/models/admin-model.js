const {Schema, model} = require('mongoose')

const AdminModel = new Schema({
    email: {type: String, unique: true, require: true},
    name: {type: String, require: true},
    password: {type: String, require: true},
    role: {type: Number, require: true},
})

module.exports = model('Admin', AdminModel);
