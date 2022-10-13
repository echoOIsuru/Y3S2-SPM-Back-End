const express = require('express');
var router = express.Router();

const test = require('../controllers/userManagementControllers/test')
const PharmacyController = require('../controllers/pharmacyManagementControllers/PharmacyController')
const appointment=require('../controllers/patient/appointment')


/**
 * Pharmacy management routes
 */
router.post('/pm_add_stock', PharmacyController.addStock);
router.get('/pm_get_stocks', PharmacyController.retrieveStocks);
router.get('/pm_get_stock/:id', PharmacyController.retrieveStock);
router.put('/pm_update_stock/:id', PharmacyController.updateStock);
router.delete('/pm_delete_stock/:id', PharmacyController.deleteStock);
router.post('/pm_check_medicine', PharmacyController.checkMedicine);
router.post('/pm_add_prescription', PharmacyController.addPrescription);


router.post('/appointment', appointment.appointment)
router.get('/appointment/:id', appointment.find)
router.delete('/appointment/:id',  appointment.delete);
router.put('/appointment/:id',  appointment.update);
router.get('/appointmentsByDocId/:id',  appointment.getDoctorsAppointments);
router.get('/appointmentRecord/:id',  appointment.getAppointmentById);
module.exports = router