const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/trello";
const connect = () => {
  return new mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = { connect };
