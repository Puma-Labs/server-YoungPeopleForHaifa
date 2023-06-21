const ApiError = require('../exceptions/api-error')
const tokenService = require('../../source/service/token-service')

module.exports = async function (req, res, next) {
    try {
        const {token} = req.cookies
        if (!token) {
            res.status(403)
            res.render('user/sing_in_modal', {
                layout: false
            })
            return new ApiError(401, 'User not authorized')
        }
        const userData = await tokenService.validateRefreshToken(token)
        if (!userData) {
            res.status(403)
            res.render('user/sing_in_modal', {
                layout: false
            })
            return new ApiError(401, 'User not authorized')
        }
        req.user = userData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}
