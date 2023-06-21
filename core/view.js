'use strict'

const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')

module.exports = (server) => {
    server.use(express.json({limit: '50mb'}));
    server.set('views', path.join(__dirname, '../source/views'))
    server.set('view engine', 'ejs')
    server.use(express.static('public', {
        dotfiles: "ignore",
        etag: true,
        extensions: ["htm", "html"],
        index: false,
        redirect: false,
        setHeaders: (res, path, stat) => {
            res.set("x-timestamp", Date.now())
        }
    }))
    server.use(expressLayouts)
}
