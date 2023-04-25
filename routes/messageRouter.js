var express = require('express');
var router = express.Router(); 
const messageController = require('../controllers/messageController') 

router.post('/send', messageController.newMessage)

module.exports = router;