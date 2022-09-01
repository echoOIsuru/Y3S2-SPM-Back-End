const express = require('express');
var router = express.Router();

const test = require('../controllers/userManagementControllers/test')
const userController = require('../controllers/userManagementControllers/userController')

router.post('/', test.test)

//User Management Routers
router.post('/user_um', userController.addUser);
router.get('/all_users_um', userController.getAllUsers);
router.put('/user_um/:id', userController.updateUser);
router.delete('/user_um/:id', userController.deleteUser);
router.post('/user_validate', userController.login);

module.exports = router