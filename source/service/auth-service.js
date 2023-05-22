const UserModel = require('../models/admin-model')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const AdminDto = require('../dtos/user-dto')

class AuthService {
    async register (email, password, name, role) {
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            throw __APIE.BedRequest('User with this email already exists')
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({email, password: hashPassword, name, role})

        const adminDto = new AdminDto(user); // id, email, name, role
        const tokens = tokenService.generateToken({...adminDto})

        await tokenService.saveToken(adminDto.id, tokens.refreshToken)
        return {...tokens, user: adminDto}
    }

    async login (email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
           throw __APIE.BedRequest('User is not found')
        }

        const isPassEquals = await  bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw __APIE.BedRequest('Wrong password')
        }

        const adminDto = new AdminDto(user)
        const tokens = tokenService.generateToken({...adminDto})

        await tokenService.saveToken(adminDto.id, tokens.refreshToken)
        return {...tokens, user: adminDto}
    }

    async logout(refreshToken) {
        return (await tokenService.removeToken(refreshToken))
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw __APIE.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromBD = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromBD) {
            throw __APIE.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const adminDto = new AdminDto(user)
        const tokens = tokenService.generateToken({...adminDto})

        await tokenService.saveToken(adminDto.id, tokens.refreshToken)
        return {...tokens, user: adminDto}
    }
}

module.exports = new AuthService();
