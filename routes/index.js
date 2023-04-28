const express = require('express');
const router = express.Router();
const messageRouter = require('./messageRouter')
const userRouter = require('./userRouter')
const questionnaireRouter = require('./questionnaireRouter')

router.use('/send_message', messageRouter)
router.use('/check_user', userRouter)
router.use('/questionnaire', questionnaireRouter)

module.exports = router;