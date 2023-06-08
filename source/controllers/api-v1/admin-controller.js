'use strict'

const authService = require('../../service/auth-service')

class AdminController {
    async register(req, res) {
        const {email, password, name, role} = req.body;
        const userData = await authService.register(email, password, name, role)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    }

    async login(req, res) {
        const {email, password} = req.body;
        const userData = await authService.login(email, password)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true})
        return res.json(userData)
    }

    async logout(req, res) {
        const {refreshToken} = req.cookies
        const token = await authService.logout(refreshToken)
        res.clearCookie('refreshToken')
        return res.json(token)
    }

    async refresh(req, res) {
        const {refreshToken} = req.cookies
        const userData = await authService.refresh(refreshToken)
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json(userData)
    }
}

module.exports = new AdminController()
