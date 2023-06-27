const moment = require("moment");
const EventService = require("../../service/event-service");

class MainController {

  async home(req, res) {
    const eventsList = await EventService.getList();
    const upcomingEvents = MainController.getUpcomingEvents(eventsList, 4);
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

  async events(req, res) {
    const selectedDate = req.query.date;
    console.log(selectedDate);

    let eventsList;
    if (selectedDate) {
      eventsList = await EventService.getListByDate(selectedDate);

      res.json(eventsList);
      return;

    } else {
      eventsList = await EventService.getList();
    }

    const upcomingEvents = MainController.getUpcomingEvents(eventsList, 8);
    const lang = MainController.setLanguageCookie(req, res);

    res.render("events", {
      layout: "layout",
      title: "",
      page: "events",
      data: eventsList,
      upcomingEvents,
      lang,
      moment,
    });
  }

  async event(req, res) {
    const { id } = req.params;
    const event = await EventService.getOne(id);
    const eventsList = await EventService.getList();
    const upcomingEvents = MainController.getUpcomingEvents(
      eventsList.filter((e) => e.id !== id),
      4
    );
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

  static getUpcomingEvents(eventsList, limit) {
    const upcomingEvents = eventsList
      .filter((event) => moment(event.date).isSameOrAfter(moment()))
      .slice(0, limit);

    upcomingEvents.sort((a, b) => moment(a.date).diff(moment(b.date)));

    return upcomingEvents;
  }
}

module.exports = new MainController();