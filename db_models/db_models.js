const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// _id: ObjectId

const UserData = new Schema({
  user_id: String,
  user_email: String, 
  subscription_tier: String,
  chats_list:[String],
  insights_list: [String],
  guides_list: [String],
  created_at: Date
});

const ChatHistory = new Schema({
  user_id: String,
  chat_content: [Object],
  isIntroduction: Boolean,
  created_at: Date
});

const UserModel = mongoose.model('UserData', UserData);
const ChatModel = mongoose.model('ChatHistory', ChatHistory);

module.exports = {
  UserModel,
  ChatModel
};

