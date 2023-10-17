'use strict'

const path = require('path')
const { writeFileSync } = require('fs')
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
        const HOST = 'http://localhost:5007'
        const url = `${HOST}/images/qr/${qrId}`
        const svg = qrImageGen.imageSync(url, { type: 'svg' });
        newQR.svgURL = `${HOST}/images/qr/${newQR._id}.svg`
        const newQRUpdate = await QRService.update(newQR)
        writeFileSync(path.resolve(__dirname, `../../../public/images/qr/${newQR._id}.svg`), svg)

        console.log(newQRUpdate);

        res.json(newQRUpdate)
    }

    async delete(req, res) {
        const {id} = req.params
        const dataDelete = await QRService.remove(id)
        res.json(dataDelete)
    }
}

module.exports = new QRController()
