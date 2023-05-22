'use strict'

const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/web-v1/main-controller')

// router.use('/shop', require('./section/shop'));

router.get('/', __asyncHandler(mainController.home));
router.get('/events', __asyncHandler(mainController.events));
router.get('/events/event', __asyncHandler(mainController.event));

router.get('/*', __asyncHandler(__WEBE.notFount));

module.exports = router;
