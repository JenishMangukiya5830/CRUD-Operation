const express = require('express');

const router = express.Router();

const controller = require('../controler/datacontroller')

router.get('/',controller.get)

router.post('/insertData',controller.insert)

router.get('/view',controller.data)

router.get('/viewData',controller.view)

router.get('/back',controller.back)

router.get('/deletData/:id',controller.delet)

router.get('/editData/:id',controller.edit)

router.post('/updateData',controller.update)

module.exports = router