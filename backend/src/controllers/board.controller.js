const mongodb = require("mongodb");

const { Board } = require("../models/Board.model");
const { List } = require("../models/List.model");
const { Card } = require("../models/Card.model");
const { errorTemplate } = require("../utilities/errorTemplate");

const getBoard = async (req, res) => {
  let { board_id } = req.params;

  try {
    let board = await Board.findOne({ _id: board_id }).lean().exec();

    if (!board) {
      return errorTemplate(res, 400, "Invalid board id");
    }

    let lists = await List.find({ board_id })
      .sort({ position: 1 })
      .lean()
      .exec();
    let cards_array = await Card.aggregate([
      {
        $match: {
          board_id: mongodb.ObjectID(board_id),
        },
      },
      {
        $sort: {
          position: 1,
        },
      },
      {
        $group: {
          _id: "$list_id",
          list_items: {
            $push: {
              _id: "$_id",
              name: "$name",
              description: "$description",
              position: "$position",
              list_id: "$list_id",
              board_id: "$board_id",
            },
          },
        },
      },
    ]);

    cards = {};
    cards_array.forEach((ele) => {
      cards[ele._id] = ele.list_items;
    });

    lists = lists.map((ele) => {
      return { ...ele, cards: cards[ele._id] || [] };
    });
    board.lists = lists;

    return res.status(200).json({
      error: false,
      data: {
        board,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const getAllUsersBoards = async (req, res) => {
  let { user_id } = req;

  try {
    let boards = await Board.find({ user_id }).lean().exec();

    return res.status(200).json({
      error: false,
      data: {
        boards,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const createBoard = async (req, res) => {
  let { name } = req.body;
  let { user_id } = req;

  try {
    let payload = {
      name,
      user_id,
    };
    let board = await Board.create(payload);

    return res.status(200).json({
      error: false,
      data: {
        board,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const updateBoard = async (req, res) => {
  let { name, board_id } = req.body;

  try {
    let payload = {
      name,
    };
    let board = await Board.findOneAndUpdate({ _id: board_id }, payload, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: {
        board,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const deleteBoard = async (req, res) => {
  let { board_id } = req.body;

  try {
    await Board.findOneAndDelete({ _id: board_id }).lean().exec();
    await List.deleteMany({ board_id }).lean().exec();
    await Card.deleteMany({ board_id }).lean().exec();

    return res.status(200).json({
      error: false,
      message: "Board deleted successfully",
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = {
  getBoard,
  getAllUsersBoards,
  createBoard,
  updateBoard,
  deleteBoard,
};
