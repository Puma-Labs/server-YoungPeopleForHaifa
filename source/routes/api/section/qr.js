'use strict'

const express = require('express');
const router = express.Router();

const qrController = require('../../../controllers/api-v1/qr-controller')

router.get('/', __asyncHandler(qrController.getters), __APIE.error);
router.get('/:id', __asyncHandler(qrController.getOne), __APIE.error);
router.post('/', __asyncHandler(qrController.create), __APIE.error);
router.put('/:id', __asyncHandler(qrController.update), __APIE.error);
router.delete('/:id', __asyncHandler(qrController.delete), __APIE.error);


module.exports = router;
