const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: Number,
      required: true,
    },
    board_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

const List = mongoose.model("list", listSchema);

module.exports = { List };
