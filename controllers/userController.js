const { UserModel, ChatModel, QuestionnaireModel } = require ("../db_models/db_models")

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
                    is_introduction_question: true,
                    introduction_question_number: 0,
                    created_at: new Date
                });
            return res.json({ 
                chatHistory: "No chat history"
            })
        }
    }

    async updateQueqstionHistory(req, res) {
        let {userId, isIntroductionQuestion, introductionQuestionNumber} = req.body

        const updatedUser = await UserModel.findOneAndUpdate(
            { user_id: userId }, 
            { "$set": 
                { 
                    "is_introduction_question": isIntroductionQuestion, 
                    "introduction_question_number": introductionQuestionNumber
                }
            }
        );
        return res.json({ 
            chatHistory: "No chat history"
        });
    }

    async getUserQuestionHistory(req, res) {
        let {userId} = req.body

        const getUser = await UserModel.findOne({ user_id: userId })
        const questionnaire = await QuestionnaireModel.findOne({ id: 'q1' })

        return res.json({ 
            isIntroductionQuestion: getUser.is_introduction_question,
            introductionQuestionNumber: getUser.introduction_question_number,
            questionnaire: questionnaire.introduction_question_list
        });
    }
}

module.exports = new userController()