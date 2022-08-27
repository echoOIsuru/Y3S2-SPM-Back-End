const express = require('express');
var router = express.Router();

const test = require('../controllers/userManagementControllers/test')

router.post('/', test.test)

module.exports = router