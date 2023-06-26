const moment = require("moment");
const EventService = require("../../service/event-service");

class MainController {
  async home(req, res) {
    const eventsList = await EventService.getList();
    const upcomingEvents = MainController.getUpcomingEvents(eventsList, 4);

    res.render("home", {
      layout: "layout",
      title: "",
      page: "home",
      upcomingEvents,
      moment,
    });
  }

  async events(req, res) {
    const { date } = req.params;

    // let eventsList;
    // if (date) {
    //   eventsList = await EventService.getListByDate(date);
    // } else {
    //   eventsList = await EventService.getList();
    // }

    const eventsList = await EventService.getList();
    const upcomingEvents = MainController.getUpcomingEvents(eventsList, 8);

    res.render("events", {
      layout: "layout",
      title: "",
      page: "events",
      data: eventsList,
      upcomingEvents,
      moment,
    });
  }

  async event(req, res) {
    const { id } = req.params;
    const event = await EventService.getOne(id);
    const eventsList = await EventService.getList();
    const upcomingEvents = MainController.getUpcomingEvents(eventsList.filter(e => e.id !== id), 4);

    res.render("event", {
      layout: "layout",
      title: "",
      page: "event",
      data: event,
      upcomingEvents,
      moment,
    });
  }

  static getUpcomingEvents(eventsList, limit) {
    const upcomingEvents = eventsList
      .filter((event) => moment(event.date).isSameOrAfter(moment()))
      .slice(0, limit);

    upcomingEvents.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return upcomingEvents;
  }
}

module.exports = new MainController();
