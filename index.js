require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const { client } = require('./db')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes); 

const start = async() => {
  try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
}
start()

app.listen(process.env.PORT || 3001, () => console.log(`Server is running on the port ${process.env.PORT}`))
