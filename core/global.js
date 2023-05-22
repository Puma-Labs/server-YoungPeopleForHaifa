'use strict'

module.exports = (server) => {
    const __common          = require('../core/common.js');
    global.__CONFIG         = __common.getConfig();
    global.__cache          = require('../core/cache.js');
    global.__APIE           = require('../core/exceptions/api-error');
    global.__WEBE           = require('../core/exceptions/web-error');

    global.__imageSave      = require('../core/helpers/saveImage');
    global.__translit       = require('../core/helpers/transliterating');
    global.__handelFile     = require('../core/helpers/handelFile');
    global.__randomString   = require('../core/helpers/randomString');
    global.__asyncHandler   = require('../core/exceptions/async-handler');
}
