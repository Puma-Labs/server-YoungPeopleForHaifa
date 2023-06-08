const ApiError = require('../exceptions/api-error')
const tokenService = require('../../service/token-service')

module.exports = async function (req, res, next) {
    try {
        const {token} = req.cookies
        if (!token) {
            console.log(1)
            res.writeHead(301, {
                Location: `/sign-in`
            }).end()
        }
        const userData = await tokenService.validateFirebaseToken(token)
        if (!userData) {
            console.log(2)
            res.writeHead(301, {
                Location: `/sign-in`
            }).end()
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
