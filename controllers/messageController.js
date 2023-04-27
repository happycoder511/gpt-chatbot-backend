const { ChatModel } = require ("../db_models/db_models");
const { runCompletion } = require("../openai");

class messageController {
    async newSavedMessage(req, res) {
        let {userId, chatMessage} = req.body

        //Waiting for ChatGPT response
        const openaiResponse = await runCompletion(chatMessage)

        //Check if user exist
        const isChatExist = await ChatModel.findOne({ user_id: userId })

        //New messages to update our DB with
        //Don't wait for a DB update. We can send AI responce right away
        const newMessages = [
            {
                message_id: isChatExist?.chat_content.length || 0,
                message_type: 'user', //'user/chat/insight/guides'
                message_text: chatMessage,
                created_at: new Date,
            },
            {
                message_id: isChatExist?.chat_content.length+1 || 1,
                message_type: 'chat', //'user/chat/insight/guides'
                message_text: openaiResponse,
                created_at: new Date,
            },
        ];
        res.json({ 
            chat: newMessages
        })

        //If user exist update one
        if (isChatExist) {
            const updateChat = await ChatModel
                .findOneAndUpdate(
                    {user_id: userId}, 
                    {chat_content: [...isChatExist.chat_content, ...newMessages]}
                );
        } else {
            //If user don't exist create one
            const createChat = await ChatModel
                .create({
                    user_id: userId, 
                    chat_content:[...newMessages],
                    isIntroduction: true,
                    created_at: new Date
                });
        }

        return
    }

    async newNotSavedMessage(req, res) {
        let {chatMessage} = req.body

        //Waiting for ChatGPT response
        const openaiResponse = await runCompletion(chatMessage)

        //Messages response
        const messagesRes = [
            {
                message_id: '',
                message_type: 'user', //'user/chat/insight/guides'
                message_text: chatMessage,
                created_at: new Date,
            },
            {
                message_id: '',
                message_type: 'chat', //'user/chat/insight/guides'
                message_text: openaiResponse,
                created_at: new Date,
            },
        ];

        return res.json({ 
            chat: messagesRes
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
            createChat: createChat.chat_content
        })
    }
}

module.exports = new messageController()
