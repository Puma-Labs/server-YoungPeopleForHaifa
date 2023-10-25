const moment = require("moment");
const EventService = require("../../service/event-service");
const QRService = require("../../service/qr-service");

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

  async qr(req, res) {
    const { id } = req.params;
    const QR = await QRService.getOne(id);

    const lang = MainController.setLanguageCookie(req, res);

    res.render("qr", {
      layout: "layout",
      title: "",
      page: "qr",
      data: QR,
      lang,
      moment,
    });
  }

  async qrImage(req, res) {
    const { id } = req.params;
    // const {page = 1, limit = 9} = req.query
    const QR = await QRService.getOne(id);
    const lang = MainController.setLanguageCookie(req, res);

    res.render("qrImage", {
      layout: "infoLayout",
      title: "",
      page: "qrImage",
      data: QR,
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
