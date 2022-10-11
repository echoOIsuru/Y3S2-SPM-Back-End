const express = require('express');
var router = express.Router();

const test = require('../controllers/userManagementControllers/test')
const appointment=require('../controllers/patient/appointment')
const d=require('../controllers/patient/d')

router.post('/appointment/', appointment.appointment)
router.get('/appointment/:id', appointment.find)
router.get('/appointment/byid/:id', appointment.findbyid)
router.get('/appointment', appointment.findall)
router.delete('/appointment/:id',  appointment.delete);
router.put('/appointment/update/:id',  appointment.update);
router.get('/appointment/d', appointment.finddata)

router.post('/d/', d.d)
router.get('/d/', d.findall)

module.exports = router