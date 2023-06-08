const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')
const adminFB = require('../../core/middlewares/config/firebase-config')

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, __CONFIG.jwt_token.access, {expiresIn:'12h'})
        const refreshToken = jwt.sign(payload, __CONFIG.jwt_token.refresh, {expiresIn:'7d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, __CONFIG.jwt_token.access)
            return userData
        } catch (e) {
            return null
        }
    }

    async validateFirebaseToken(token) {
        try {
            const userData = await adminFB.auth().verifyIdToken(token)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, __CONFIG.jwt_token.refresh)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }
}

module.exports = new TokenService();
