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
        ],
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
        ],
    }
};


/*
    sudo certbot --nginx -d mir-mebeli37.ru -d www.mir-mebeli37.ru

    server {
        listen 80;
        listen [::]:80;

        root /var/www/mir-mebeli37/html;

        server_name mir-mebeli37.ru www.mir-mebeli37.ru;

        location / {
                proxy_pass http://localhost:5000
                try_files $uri $uri/ =404;
        }
    }
*/
