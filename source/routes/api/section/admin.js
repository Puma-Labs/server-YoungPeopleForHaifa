'use strict'

const express = require('express');
const router = express.Router();

const adminController = require('../../../controllers/api-v1/admin-controller')
const __middlewareAdmin = require('../../../../core/middlewares/admin-middleware')

router.post('/register', __asyncHandler(adminController.register), __APIE.error);
router.get('/refresh', __middlewareAdmin,  __asyncHandler(adminController.refresh), __APIE.error);

router.post('/login', __asyncHandler(adminController.login), __APIE.error);
router.post('/logout', __asyncHandler(adminController.logout), __APIE.error);

module.exports = router;
