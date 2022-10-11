const express = require('express');
var router = express.Router();

const test = require('../controllers/userManagementControllers/test')
const userController = require('../controllers/userManagementControllers/userController')
const PharmacyController = require('../controllers/pharmacyManagementControllers/PharmacyController')
const appointment = require('../controllers/patient/appointment')


//User Management Routers
router.post('/user_um', userController.addUser);
router.get('/all_users_um', userController.getAllUsers);
router.put('/user_um/:id', userController.updateUser);
router.delete('/user_um/:id', userController.deleteUser);
router.post('/user_validate', userController.login);
router.get('/users_type', userController.getUserByCount);
router.get('/doctors_by_special', userController.getDoctorsBySpecial);

/**
 * Pharmacy management routes
 */
router.post('/pm_add_stock', PharmacyController.addStock);
router.get('/pm_get_stocks', PharmacyController.retrieveStocks);
router.get('/pm_get_stock/:id', PharmacyController.retrieveStock);
router.put('/pm_update_stock/:id', PharmacyController.updateStock);
router.delete('/pm_delete_stock/:id', PharmacyController.deleteStock);

router.post('/appointment', appointment.appointment)
router.get('/appointment/:id', appointment.find)
router.delete('/appointment/:id', appointment.delete);
router.put('/appointment/:id', appointment.update);
router.get('/appointmentsByDocId/:id', appointment.getDoctorsAppointments);
router.get('/appointmentRecord/:id', appointment.getAppointmentById);

module.exports = router