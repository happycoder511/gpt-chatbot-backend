var express = require('express');
var router = express.Router(); 
const userController = require('../controllers/userController')

router.post('/check_user', userController.checkUser)
router.post('/update_queqstion_history', userController.updateQueqstionHistory)
router.post('/get_queqstion_history', userController.getUserQuestionHistory)

module.exports = router;