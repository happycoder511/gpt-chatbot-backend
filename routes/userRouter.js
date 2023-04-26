var express = require('express');
var router = express.Router(); 
const userController = require('../controllers/userController')

router.post('/user', userController.checkUser)

module.exports = router;