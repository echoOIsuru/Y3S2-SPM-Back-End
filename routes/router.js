const express = require('express');
var router = express.Router();

const test = require('../controllers/userManagementControllers/test')
const PharmacyController = require('../controllers/pharmacyManagementControllers/PharmacyController')

router.post('/', test.test)

/**
 * Pharmacy management routes
 */
router.post('/pm_add_stock', PharmacyController.addStock);
router.get('/pm_get_stocks', PharmacyController.retrieveStocks);
router.put('/pm_update_stock/:id', PharmacyController.updateStock);
router.delete('/pm_delete_stock/:id', PharmacyController.deleteStock);

module.exports = router