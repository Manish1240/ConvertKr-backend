const express = require('express');
const { connectDb } = require('./db-connection');
const app = express();
require('dotenv').config();

const port = 3000 || process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  connectDb();
  console.log(`Example app listening on port ${port}`)
})