const { I18n } = require('i18n')

module.exports = (req, res, next) => {
    const i18n = new I18n(__CONFIG.translate)
    i18n.init(req, res)
    return next();
};
