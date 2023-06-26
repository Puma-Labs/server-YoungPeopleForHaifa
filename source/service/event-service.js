const EventModel = require('../models/event-model');

class EventService {
  async getList() {
    const res = await EventModel.find().sort({ date: -1 });
    return res
  }

  async getOne(id) {
    const res = await EventModel.findOne({ _id: id });
    return res
}

async getListByDate(date) {
  const res = await EventModel.find({ date: date });
  return res
}

  async create(newEvent) {
      const res = await EventModel.create(newEvent)
      return res
  }

  async update(event) {
      return (await EventModel.updateOne({_id: event._id}, event))
  }

  async remove(id) {
    return (await EventModel.deleteOne({_id: id}))
  }
}

module.exports = new EventService();
