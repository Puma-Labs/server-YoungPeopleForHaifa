const moment = require("moment");
const EventModel = require('../models/event-model');

class EventService {
  async getOne(id) {
    const res = await EventModel.findOne({ _id: id });
    return res
}

/* для событий:
    кол-во постов на 1 странице = 9

 */
async getList(page = 1, limit = 9, date = null) {
  let filter = {};
  if(date) {
      const startDate = moment(date).startOf('day').toISOString();
      const endDate = moment(date).endOf('day').toISOString();
      filter = {
          date: {
              $gte: startDate,
              $lte: endDate
          }
      }
  }

  const eventsList = await EventModel.find(filter)
      .limit(limit)
      .skip((page - 1) * limit)
      .sort('-date')
      .lean();

  const count = await EventModel.find(filter).count()
  return {eventsList, count}
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

  //-----------------------------------------------

  async getUpcomingEvents(limit = 8) {
    return EventModel.find({
        date: {$gte: new Date()}
    }).sort('date').limit(limit).lean()
  }
}

module.exports = new EventService();
