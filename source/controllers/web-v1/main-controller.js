class MainController {
  async home(req, res) {
      let lang = req.cookies['lang']
      if(typeof lang === 'undefined') {
          res.cookie('lang', 'ru', {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false})
          lang = 'ru'
      }

      res.render("home", {
          layout: "layout",
          title: "",
          page: "home",
          lang: lang
      });
  }

  async events(req, res) {
      let lang = req.cookies['lang']
      if(typeof lang === 'undefined') {
          res.cookie('lang', 'ru', {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false})
          lang = 'ru'
      }
      res.render("events", {
          layout: "layout",
          title: "",
          page: "events",
          lang: lang
      });
  }

  async event(req, res) {
      let lang = req.cookies['lang']
      if(typeof lang === 'undefined') {
          res.cookie('lang', 'ru', {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false})
          lang = 'ru'
      }

      res.render("event", {
          layout: "layout",
          title: "",
          page: "event",
          lang: lang
      });
  }
}

module.exports = new MainController()
