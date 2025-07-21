const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { db } = require('./db/db');

const app = express();
const Routes = require("./routes/route.js");

app.use(express.json());
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
app.use("/",Routes)
const server = () => {
  db()
  app.listen(PORT, () => {
      console.log('listening to port:', PORT)
  })
}
server()
