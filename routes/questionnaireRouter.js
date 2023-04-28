var express = require('express');
var router = express.Router(); 
const questionnaireController = require('../controllers/questionnaireController')

router.get('/get_questions', questionnaireController.getQuestions)
router.post('/create_questions', questionnaireController.createQuestions)

module.exports = router;
