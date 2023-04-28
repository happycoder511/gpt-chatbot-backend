const { UserModel, ChatModel, QuestionnaireModel } = require ("../db_models/db_models")

class questionnaireController {
    async getQuestions(req, res) {
        const questionnaire = await QuestionnaireModel.findOne({ id: 'q1' })
        return res.json({ 
            questionnaire: questionnaire.introduction_question_list
        })
    }

    async createQuestions(req, res) {
        let {questionId, questionList} = req.body
        const newQuestionnaire = await QuestionnaireModel
            .create({
                id: questionId,
                introduction_question_list: questionList,
                created_at: new Date
            });
        return res.json({ 
            newQuestionnaire
        })
    }
}

module.exports = new questionnaireController()
