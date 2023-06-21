const path = require('path');
module.exports = {
    production: {
        country: {
            short: 'he',
            full: ''
        },
        google_api_key: 'AIzaSyBNujDHPJ0Ik6kLNeyCwtzJpArrPcq4nuM',
        site: {
            name: 'Young people for Haifa'
        },
        server: {
            host: "localhost",
            port: 5007,
            domain: "scorpion.co.il"
        },
        database: {
            host: "mongodb://localhost:27017/scorpion?retryWrites=true&w=majority",
        },
        jwt_token: {
            access: "$2b$04$B6wnoLPufB4VFc1sA.3daj5HdcksA4cDDVDxvdgfO",
            refresh: "$2b$04$Lor/$2b$VFc1sA.c3scsA4cDDG46grNenyzKpJE3W",
        },
        white_list: [
            'http://localhost:3000',
            'http://localhost:5007',
            'https://young4haifa.co.il',
        ],
        translate: {
            locales: ['ru', 'he'],
            directory: path.join(__dirname, 'locales'),
            defaultLocale: 'ru',
            retryInDefaultLocale: false,
            cookie: 'lang',
            autoReload: true,
        }
    },

    development: {
        country: {
            short: 'he',
            full: ''
        },
        google_api_key: 'AIzaSyBNujDHPJ0Ik6kLNeyCwtzJpArrPcq4nuM',
        site: {
            name: 'Young people for Haifa'
        },
        server: {
            host: "localhost",
            port: 5007,
            domain: "scorpion.co.il"
        },
        database: {
            host: "mongodb://localhost:27017/scorpion?retryWrites=true&w=majority",
        },
        jwt_token: {
            access: "$2b$04$B6wnoLPufB4VFc1sA.3daj5HdcksA4cDDVDxvdgfO",
            refresh: "$2b$04$Lor/$2b$VFc1sA.c3scsA4cDDG46grNenyzKpJE3W",
        },
        white_list: [
            'http://localhost:3000',
            'http://localhost:5007',
            'https://young4haifa.co.il',
        ],
        translate: {
            locales: ['ru', 'he'],
            directory: path.join(__dirname, 'locales'),
            defaultLocale: 'ru',
            retryInDefaultLocale: false,
            cookie: 'lang',
            autoReload: true,
        }
    }
};
