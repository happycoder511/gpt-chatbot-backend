const { ChatModel } = require ("../db_models/db_models")

class messageController {
    async newSavedMessage(req, res) {
        let {userId, chatMessage} = req.body

        //Check if user exist and update/create one
        const isChatExist = await ChatModel.findOne({ user_id: userId })
        let chat;
        if (isChatExist) {
            const updateChat = await ChatModel
                .findOneAndUpdate(
                    {user_id: userId}, 
                    {chat_content: [
                        ...isChatExist.chat_content, 
                        {
                            message_id: isChatExist.chat_content.length,
                            message_type: 'user', //'user/chat/insight/guides'
                            message_text: chatMessage,
                            created_at: new Date,
                        }
                    ]}
                );
            chat = updateChat;
        } else {
            const createChat = await ChatModel
                .create({
                    user_id: userId, 
                    chat_content:[{
                        message_id: 0,
                        message_type: 'user', //'user/chat/insight/guides'
                        message_text: chatMessage,
                        created_at: new Date,
                    }],
                    isIntroduction: true,
                    created_at: new Date
                });
            chat = createChat;
        }
        return res.json({ 
            chat
        })
    }

    async newNotSavedMessage(req, res) {
        let {chatMessage} = req.body

        return res.json({ 
            chat: "Chat Response"
        })
    }

    async saveChatHistory(req, res) {
        let {userId, chatHistory} = req.body
        const createChat = await ChatModel
            .create({
                user_id: userId, 
                chat_content: chatHistory,
                isIntroduction: true,
                created_at: new Date
            });
        return res.json({ 
            createChat
        })
    }
    
}

module.exports = new messageController()
