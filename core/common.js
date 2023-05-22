'use strict'

const fs = require('fs');

module.exports = {
    getConfig() {
        let configPath = './config/main.js';
        let config = {}

        if (fs.existsSync(configPath)) {
            throw new Error('Not found default config!!!');
        }

        if (process.env.NODE_ENV === 'production') {
            config = require(configPath).production;
            config.mode = '[PROD]'
            config.color = '\x1b[31m%s\x1b[0m'
        } else {
            config = require(configPath).development;
            config.mode = '[DEV]'
            config.color = '\x1b[36m%s\x1b[0m'
        }

        return config
    }
}
