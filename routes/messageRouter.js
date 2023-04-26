var express = require('express');
var router = express.Router(); 
const messageController = require('../controllers/messageController') 

router.post('/send_registered', messageController.newSavedMessage) 
router.post('/send_not_registered', messageController.newNotSavedMessage)
router.post('/save-chat-history', messageController.saveChatHistory)

module.exports = router;