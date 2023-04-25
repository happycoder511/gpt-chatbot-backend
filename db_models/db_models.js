const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserData = new Schema({
  author: ObjectId,
  email: String, 
  title: String,
  body: String,
  date: Date
});

const ChatHistory = new Schema({
  chat_content: [Object],
});

module.exports = mongoose.model('ChatHistory', ChatHistory)

// User:
// {
//     user_id: 456;
//     chat_list: [123, 123];
//     registration_date: new Date;
//     insights: [];
//     guides: [];
//     staus: 'free/pro';
// }

// Chat:
// {
//     chat_id: 123;
//     chat_content: [{text: 'abc'}];
//     created_at: new Date;
// }

// {
//   message_id: Number;
//   message_type: String; //('user/chat/insight/guides')
//   message_text: String
//   created_at: Date;
// }