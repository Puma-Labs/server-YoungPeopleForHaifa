'use strict'
const NodeCache = require('node-cache');
const appCache = new NodeCache();

module.exports = {
    set: (key, value, ttl = 0) => {
        appCache.set(key, value, ttl || null);
        return true;
    },

    get: (key) => {
        return appCache.get(key);
    },

    remove(key) {
        appCache.del(key);
        return true;
    }
}
