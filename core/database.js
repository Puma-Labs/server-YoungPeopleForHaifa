'use strict'

const mongoose = require('mongoose');

class DataBase {
    async start()  {
        await mongoose.connect(__CONFIG.database.host)
    }
}

module.exports = new DataBase()
