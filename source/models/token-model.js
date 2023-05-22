const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'Admin'},
    refreshToken: {type: String, require: true},
})

module.exports = model('Token', TokenSchema);
