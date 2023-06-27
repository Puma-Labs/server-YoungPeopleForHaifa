"use strict";

const express = require("express");
const router = express.Router();
const mainController = require("../../controllers/web-v1/main-controller");

// router.use('/shop', require('./section/shop'));

router.get("/", __asyncHandler(mainController.home));
router.get("/events/", __asyncHandler(mainController.events));
router.get("/events/json", __asyncHandler(mainController.eventsJSON));
router.get("/events/:id", __asyncHandler(mainController.event));

router.get("/*", __asyncHandler(__WEBE.notFound));

module.exports = router;
