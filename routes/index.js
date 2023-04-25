const express = require('express');
const router = express.Router();
const historyRouter = require('./historyRouter')
const messageRouter = require('./messageRouter')

router.use('/send_message', messageRouter)
router.use('/get_history', historyRouter)

module.exports = router;