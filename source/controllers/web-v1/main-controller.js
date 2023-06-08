class MainController {
  async home(req, res) {
      res.render("home", {
          layout: "layout",
          title: "",
          page: "home",
      });
  }

  async events(req, res) {
      res.render("events", {
          layout: "layout",
          title: "",
          page: "events",
      });
  }

  async event(req, res) {
      res.render("event", {
          layout: "layout",
          title: "",
          page: "event",
      });
  }
}

module.exports = new MainController()
