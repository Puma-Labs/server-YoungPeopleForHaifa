'use strict'

require('dotenv').config({path: './.env'});

const cookieParser  = require('cookie-parser')
const bodyParser    = require('body-parser')
const express       = require('express')
const i18n= require('./core/i18n')
const database      = require('./core/database')
const server        = express()

require('./core/corsS')(server)
require('./core/view')(server)
require('./core/global')(server)
require('./core/file')(server)


server.use(bodyParser.urlencoded({extended: false}));
server.use(cookieParser())
server.use(express.json())


server.use('/api/v1', require('./source/routes/api/api-v1'));
server.use('/', require('./source/routes/web/web-v1'));

database.start()
    .then(r => {
        const listener = server.listen(__CONFIG.server.port)
        console.log(__CONFIG.color, __CONFIG.mode, `\x1b[35mServer has been started use link http://localhost:${__CONFIG.server.port} \x1b[0m`)
        require('./core/process')(listener)
    })
    .catch(e => {
        console.error(e)
    })
