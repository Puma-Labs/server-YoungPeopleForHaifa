const tokenService = require('../../service/token-service')
const ApiError = require('../exceptions/api-error')

/**
 * проверяет доступ пользователя к функциональному составляющему
 * |0 - programmer | 1 - super admin | 2 - admin | 3 - moderator |
 * @param requiredRole
 * @returns {(function(*, *, *): (*))|*}
 */
module.exports = function (requiredRole) {
    return (req, res, next) => {
        const authHeader = req.headers.authorization
        const accessToken = authHeader.split(' ')[1]
        const userData = tokenService.validateAccessToken(accessToken)
        if(userData) {
            const userRole = userData.role
            const access = requiredRole.filter((role) => {
                return (role === userRole)
            })
            if (access.length !== 0) {
                return next();
            } else {
                return next(ApiError.accessDenied())
            }
        } else {
            return next(ApiError.UnauthorizedError())
        }
    }
}
