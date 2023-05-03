const { ChatModel, UserModel } = require ("../db_models/db_models");
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
                created_at: new Date
            });
        return res.json({ 
            createChat: createChat.chat_content
        })
    }

    async saveAnsweredQuestion(req, res) {
        let {userId, introductionQuestionNumber, userChatHistory} = req.body

        const updatedUser = await UserModel.findOneAndUpdate(
            {user_id: userId}, 
            {"introduction_question_number": introductionQuestionNumber}
        );
        const updatedChatHistory = await ChatModel.findOneAndUpdate(
            {user_id: userId}, 
            {chat_content: [...userChatHistory]}
        )
        
        return
    }


    async saveAllAnsweredQuestions(req, res) {
        let {userId, introductionQuestionNumber, userChatHistory, isIntroductionQuestion} = req.body

        const questionsForChatGPT = [];
        userChatHistory.map(message => {
            if (message.message_type==='user') {
                questionsForChatGPT.push(message.message_text)
            }
        })
    
        //Waiting for ChatGPT response
        const openaiResponse = await runCompletion(questionsForChatGPT[questionsForChatGPT.length-1])

        const updatedUser = await UserModel.findOneAndUpdate(
            { user_id: userId }, 
            { "$set": 
                { 
                    "is_introduction_question": isIntroductionQuestion, 
                    "introduction_question_number": introductionQuestionNumber
                }
            }
        );

        const updatedChatHistory = await ChatModel.findOneAndUpdate(
            {user_id: userId}, 
            {chat_content: [
                ...userChatHistory,
                {
                    message_id: userState.userChatHistory.length,
                    message_type: 'insight',
                    message_text: openaiResponse,
                    created_at: new Date(),
                }
            ]}
        )

        return res.json({ 
            openaiResponse
        })
    }

    async allAnsweredQuestionsNotRegistered(req, res) {
        let {userChatHistory} = req.body
        const questionsForChatGPT = [];
        userChatHistory.map(message => {
            if (message.message_type==='user') {
                questionsForChatGPT.push(message.message_text)
            }
        })
        
        let content = questionsForChatGPT[questionsForChatGPT.length-1];

        //Waiting for ChatGPT response
        let openaiResponse = [];
        openaiResponse.push(await runCompletion('Personality insight with "' + content + '"'));
        openaiResponse.push(await runCompletion('Work life with "' + content + '"'));
        openaiResponse.push(await runCompletion('Career opportunities with "' + content + '"'));
        return res.json({ 
            openaiResponse
        })
    }
}

module.exports = new messageController()
