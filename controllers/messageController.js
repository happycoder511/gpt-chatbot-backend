const ChatHistory = require ("../db_models/db_models")

class messageController {
    async newMessage(req, res) {
        let {chatContent} = req.body
        const chat = await ChatHistory.create([{chat_id:'123', chat_content:{1:'1'}}])
        console.log(chat)
        return res.json({ 
            chat
        })
    }
}

module.exports = new messageController()