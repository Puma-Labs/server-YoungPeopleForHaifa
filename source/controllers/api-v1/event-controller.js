'use strict'

const EventService = require('../../service/event-service')

class EventController {
    async getters(req, res) {

        const eventsList = await EventService.getList()
        res.json(eventsList)
    }

    async getOne(req, res) {
        const {id} = req.params
        const event = await EventService.getOne(id)
        res.json(event)
    }

    async update(req, res) {
        const dataUpdate = req.body

        if(dataUpdate.cover && dataUpdate.cover.includes("base64")) {
            const coverData = dataUpdate.cover
            // const type = coverData.substring("data:image/".length, coverData.indexOf(";base64")).slice(0, 3);
            const path = `/images/events/`
            const fileName = `${__translit(dataUpdate.title.slice(0, 20))}-${__randomString(10)}.jpeg`
            
            dataUpdate.cover = __imageSave(path, fileName, coverData)
        }

        const newEvent = await EventService.update(dataUpdate)
        res.json(newEvent)
    }

    async create(req, res) {
        const dataCreate = req.body

        if (dataCreate.cover) {
          const coverData = dataCreate.cover
          // const type = coverData.substring("data:image/".length, coverData.indexOf(";base64")).slice(0, 3);
          const path = `/images/events/`
          const fileName = `${__translit(dataCreate.title.slice(0, 20))}-${__randomString(10)}.jpeg`
  
          dataCreate.cover = __imageSave(path, fileName, coverData)
        }

        const newEvent = await EventService.create(dataCreate)
        res.json(newEvent)
    }

    async delete(req, res) {
        const {id} = req.query
        const dataDelete = await EventService.remove(id)
        res.json(dataDelete)
    }
}

module.exports = new EventController()
