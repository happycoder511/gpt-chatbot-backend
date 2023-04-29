const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatHistory = new Schema({
  user_id: String,
  chat_content: [Object],
  created_at: Date
});

// chat_content: [Object] из ChatHistory, состоит из набора следующих объектов:
// {
//   message_id: '',
//   message_type: 'user', //'user/chat/insight/guides'
//   message_text: chatMessage,
//   created_at: new Date,
// }

const UserData = new Schema({
  user_id: String,
  user_email: String, 
  subscription_tier: String,
  chats_list:[String],
  insights_list: [String],
  guides_list: [String],
  is_introduction_question: Boolean,
  introduction_question_number: Number,
  created_at: Date
});

const Questionnaire = new Schema({
  id: String, //q1, q2, q3 ...
  introduction_question_list: Array, //['Question1', 'Question2', 'Question3']
  created_at: Date
});

const UserModel = mongoose.model('UserData', UserData);
const ChatModel = mongoose.model('ChatHistory', ChatHistory);
const QuestionnaireModel = mongoose.model('Questionnaire', Questionnaire);

module.exports = {
  UserModel,
  ChatModel,
  QuestionnaireModel
};
