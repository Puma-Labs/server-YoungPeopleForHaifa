'use strict'

const express = require('express');
const router = express.Router();

const eventController = require('../../../controllers/api-v1/event-controller')

router.get('/', __asyncHandler(eventController.getters), __APIE.error);
router.get('/:id', __asyncHandler(eventController.getOne), __APIE.error);
router.post('/', __asyncHandler(eventController.create), __APIE.error);
router.put('/', __asyncHandler(eventController.update), __APIE.error);
router.delete('/', __asyncHandler(eventController.delete), __APIE.error);


module.exports = router;
