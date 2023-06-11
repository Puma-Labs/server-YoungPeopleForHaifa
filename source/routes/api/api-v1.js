"use strict";

const express = require("express");
const router = express.Router();

const __middlewareAdmin = require("../../../core/middlewares/admin-middleware");

router.use("/user", require("./section/admin"));
router.use("/events", __middlewareAdmin, require("./section/events"));

router.get("/*", __asyncHandler(__APIE.notFound));

module.exports = router;
