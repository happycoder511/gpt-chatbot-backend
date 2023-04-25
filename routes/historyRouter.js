var express = require('express');
var router = express.Router(); 
const historyController = require('../controllers/historyController')

router.post('/history', historyController.getChat)

module.exports = router;