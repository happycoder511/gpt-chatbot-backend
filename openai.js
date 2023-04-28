require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const runCompletion = async (input) => {
    const completion = await openai.createChatCompletion({
        model: process.env.OPENAI_API_MODEL, 
        messages: [
            {role: "user", content: input}
        ]
    })
    const res = completion.data.choices[0].message.content;
    return res;
}

module.exports = {
    runCompletion
};