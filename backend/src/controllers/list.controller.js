const { List } = require("../models/List.model");
const { Card } = require("../models/Card.model");
const { errorTemplate } = require("../utilities/errorTemplate");
const { getFirst, getLast, getMean } = require("../utilities/getPosition");

const getList = async (req, res) => {
  let { list_id } = req.params;

  try {
    let list = await List.findOne({ _id: list_id }).lean().exec();

    if (!list) {
      return errorTemplate(res, 400, "Invalid list id");
    }

    let cards = await Card.find({ list_id })
      .sort({ position: 1 })
      .lean()
      .exec();
    list.cards = cards;

    return res.status(200).json({
      error: false,
      data: {
        list,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const createList = async (req, res) => {
  let { name, position, board_id } = req.body;
  let { user_id } = req;

  try {
    let payload = {
      name,
      position,
      board_id,
      user_id,
    };

    let list = await List.create(payload);
    list._doc.cards = [];

    return res.status(200).json({
      error: false,
      data: {
        list,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const updateListName = async (req, res) => {
  let { name, list_id } = req.body;

  try {
    let payload = { name };
    let list = await List.findOneAndUpdate({ _id: list_id }, payload, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: {
        list,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const updateListPosition = async (req, res) => {
  let { prev_position, next_position, list_id } = req.body;

  try {
    let position =
      prev_position === undefined
        ? getFirst(next_position)
        : next_position === undefined
        ? getLast(prev_position)
        : getMean(prev_position, next_position);

    let payload = { position };
    let list = await List.findOneAndUpdate({ _id: list_id }, payload, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: {
        list,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const deleteList = async (req, res) => {
  let { list_id } = req.body;

  try {
    await List.findOneAndDelete({ _id: list_id }).lean().exec();
    await Card.deleteMany({ list_id }).lean().exec();

    return res.status(200).json({
      error: false,
      message: "List deleted successfully",
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = {
  getList,
  createList,
  updateListName,
  updateListPosition,
  deleteList,
};
