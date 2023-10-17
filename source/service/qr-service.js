const moment = require("moment");
const QRModel = require('../models/qr-model');

class QRService {
  async getOne(id) {
    const res = await QRModel.findOne({ _id: id });
    return res
  }

  async getImage (id) {
    const res = await QRModel.findOne({ _id: id });
    return res
  }

async getList() {
  const qrList = await QRModel.find()
      .lean();
  return {qrList}
}

  async create(newEvent) {
      const res = await QRModel.create(newEvent)
      return res
  }

  async update(event) {
      return (await QRModel.updateOne({_id: event._id}, event))
  }

  async remove(id) {
    return (await QRModel.deleteOne({_id: id}))
  }

  //-----------------------------------------------

  async getUpcomingEvents(limit = 8) {
    return QRModel.find({
        date: {$gte: new Date()}
    }).sort('date').limit(limit).lean()
  }
}

module.exports = new QRService();
