'use strict'

const path = require('path')
const { writeFile, unlink } = require('fs')
const qrImageGen = require('node-qr-image');
const QRService = require('../../service/qr-service')

class QRController {
    async getters(req, res) {
        const { qrList } = await QRService.getList()
        res.json({qrList})
    }

    async getOne(req, res) {
        const {id} = req.params
        const qr = await QRService.getOne(id)
        res.json(qr)
    }

    async update(req, res) {
        const dataUpdate = req.body

        const updQR = await QRService.update(dataUpdate)
        res.json(updQR)
    }

    async create(req, res) {
        const dataCreate = req.body
        const newQR = await QRService.create(dataCreate) // await QRService.create(dataCreate) // {_id: Math.random().toString(32)}
        const qrId = newQR._id
        const url = `${process.env.SERVER_HOST}/images/qr/${qrId}`
        const svg = qrImageGen.imageSync(url, { type: 'svg' });

        writeFile(path.resolve(__dirname, `../../../public/images/qr/${newQR._id}.svg`), svg)
        newQR.svgURL = `${process.env.SERVER_HOST}/images/qr/${newQR._id}.svg`

        const newQRUpdate = await QRService.update(newQR)

        res.json(newQRUpdate)
    }

    async delete(req, res) {
        const {id} = req.params
        const dataDelete = await QRService.remove(id)
        unlink(path.resolve(__dirname, `../../../public/images/qr/${id}.svg`))
        res.json(dataDelete)
    }
}

module.exports = new QRController()
