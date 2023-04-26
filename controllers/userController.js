const { UserModel, ChatModel } = require ("../db_models/db_models")

class userController {
    async checkUser(req, res) {
        let {userId, userEmail} = req.body

        const isUserExist = await UserModel.findOne({ user_id: userId })
        //If user exist return his chat history
        if (isUserExist) {
            const getChatHistory = await ChatModel.findOne({ user_id: userId })
            if (getChatHistory) {
                const chatHistory = getChatHistory.chat_content;
                return res.json({ 
                    chatHistory
                })
            }
            return res.json({ 
                chatHistory: "No chat history"
            })
        } else {
            //If user don't exist - create one
            const createUser = await UserModel
                .create({
                    user_id: userId,
                    user_email: userEmail, 
                    subscription_tier: 'free/pro',
                    chats_list:[],
                    insights_list: [],
                    guides_list: [],
                    created_at: new Date
                });
            return res.json({ 
                chatHistory: "No chat history"
            })
        }
    }
}

module.exports = new userController()
