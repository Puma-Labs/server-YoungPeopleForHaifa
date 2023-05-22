'use strict'

const express = require('express');
const router = express.Router();

router.use('/user', require('./section/admin'));

router.get('/*', __asyncHandler(__APIE.notFount));

module.exports = router;
