const moment = require("moment");
const EventService = require("../../service/event-service");

class MainController {

  async home(req, res) {
    const {page = 1, limit = 9} = req.query
    const upcomingEvents = await EventService.getUpcomingEvents(4);
    const lang = MainController.setLanguageCookie(req, res);

    res.render("home", {
      layout: "layout",
      title: "",
      page: "home",
      upcomingEvents,
      lang,
      moment,
    });
  }

  async eventsJSON(req, res) {
      console.log('eventsJSON')
      const {page = 1, limit = 9} = req.query
      const selectedDate = req.query?.selectedDate;

      const lang = MainController.setLanguageCookie(req, res);
      const {eventsList, count} = await EventService.getList(page, limit, selectedDate);

      res.render("components/events-section", {
          layout: false,
          data: eventsList,
          count: count || 1,
          currentPage: page,
          moment,
          lang,
      });
  }

  async events(req, res) {
      const {page = 1, limit = 9} = req.query
      const selectedDate = req.query?.selectedDate;
      const date = req.query.date;

    let eventsList;
    let count;
    if (selectedDate) {
        const eventListData = await EventService.getList(page, limit, selectedDate);
        eventsList = eventListData.eventsList
      res.json({eventsList, count: eventListData.count});
      return;
    } else {
        const eventListData = await EventService.getList(page, limit, date);
        eventsList = eventListData.eventsList
        count = eventListData.count
    }

    const upcomingEvents = await EventService.getUpcomingEvents(4);
    const lang = MainController.setLanguageCookie(req, res);

   console.log('count', count)

    res.render("events", {
      title: "",
      page: "events",
      data: eventsList,
      upcomingEvents,
      count: count || 1,
      currentPage: page,
      lang,
      moment,
    });
  }

  async event(req, res) {
    const { id } = req.params;
    const {page = 1, limit = 9} = req.query
    const event = await EventService.getOne(id);
    const upcomingEvents = await EventService.getUpcomingEvents(4);
    const lang = MainController.setLanguageCookie(req, res);

    res.render("event", {
      layout: "layout",
      title: "",
      page: "event",
      data: event,
      upcomingEvents,
      lang,
      moment,
    });
  }

  static setLanguageCookie(req, res) {
    let lang = req.cookies["lang"];
    if (typeof lang === "undefined") {
      res.cookie("lang", "ru", {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
      });
      lang = "ru";
    }
    return lang;
  }
}

module.exports = new MainController();
