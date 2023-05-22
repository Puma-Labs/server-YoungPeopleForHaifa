'use strict'

const corsS = require('cors');

module.exports = (server) => {
    server.use(corsS({
            credentials: true,
            origin: function (origin, callback) {
                if (! origin) return callback (null, true);
                if (__CONFIG.white_list.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            }
        }
    ))
}
