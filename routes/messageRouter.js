var express = require('express');
var router = express.Router(); 
const messageController = require('../controllers/messageController') 

router.post('/send_registered', messageController.newSavedMessage) 
router.post('/send_not_registered', messageController.newNotSavedMessage)
router.post('/save-chat-history', messageController.saveChatHistory)
router.post('/answered_question_registered', messageController.saveAnsweredQuestion)
router.post('/all_answered_questions_registered', messageController.saveAllAnsweredQuestions)
router.post('/all_answered_questions_not_registered', messageController.allAnsweredQuestionsNotRegistered)

module.exports = router;