const express = require('express');
var router = express.Router();

const test = require('../controllers/userManagementControllers/test')
const appointment=require('../controllers/patient/appointment')


router.post('/appointment/', appointment.appointment)
router.get('/appointment/:id', appointment.find)
router.get('/appointment/byid/:id', appointment.findbyid)
router.get('/appointment', appointment.findall)
router.delete('/appointment/:id',  appointment.delete);
router.put('/appointment/update:id',  appointment.update);
module.exports = router