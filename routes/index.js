const express = require('express');
const router = express.Router();
const messageRouter = require('./messageRouter')
const userRouter = require('./userRouter')

router.use('/send_message', messageRouter)
router.use('/check_user', userRouter) 

module.exports = router;