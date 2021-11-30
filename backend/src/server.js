const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const { connect } = require("./config/db.config");
const { authRouter } = require("./routes/auth.routes");
const { boardRouter } = require("./routes/board.routes");
const { listRouter } = require("./routes/list.routes");
const { cardRouter } = require("./routes/card.routes");

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/board", boardRouter);
app.use("/api/list", listRouter);
app.use("/api/card", cardRouter);

let port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connect();
  } catch (error) {
    console.log(`Error in connecting to DB: ${error.message}`);
  }
  app.listen(port, () => {
    console.log(`DB connected and server listening on port ${port}`);
  });
};

module.exports = { start };
