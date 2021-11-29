const { Card } = require("../models/Card.model");
const { errorTemplate } = require("../utilities/errorTemplate");
const { getFirst, getLast, getMean } = require("../utilities/getPosition");

const getCard = async (req, res) => {
  let { card_id } = req.params;
  try {
    let card = await Card.findOne({ _id: card_id }).lean().exec();

    if (!card) {
      return errorTemplate(res, 400, "Invalid card id");
    }

    return res.status(200).json({
      error: false,
      data: {
        card,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const createCard = async (req, res) => {
  let { name, description, position, list_id, board_id } = req.body;
  let { user_id } = req;

  try {
    let payload = {
      name,
      position,
      list_id,
      board_id,
      user_id,
    };
    if (description) {
      payload.description = description;
    }

    let card = await Card.create(payload);

    return res.status(200).json({
      error: false,
      data: {
        card,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const updateCardNameDes = async (req, res) => {
  let { card_id } = req.params;

  try {
    const card = await Card.findOneAndUpdate({ _id: card_id }, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: {
        card,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const updateCardPositionList = async (req, res) => {
  let { card_id } = req.params;
  let { prev_position, next_position, list_id } = req.body;

  try {
    let position =
      prev_position === undefined && next_position === undefined
        ? 1
        : prev_position === undefined
        ? getFirst(next_position)
        : next_position === undefined
        ? getLast(prev_position)
        : getMean(prev_position, next_position);

    let payload = { position, list_id };
    let card = await Card.findOneAndUpdate({ _id: card_id }, payload, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).json({
      error: false,
      data: {
        card,
      },
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

const deleteCard = async (req, res) => {
  let { card_id } = req.body;

  try {
    await Card.findOneAndDelete({ _id: card_id }).lean().exec();

    return res.status(200).json({
      error: false,
      message: "Card deleted successfully",
    });
  } catch (error) {
    return errorTemplate(res, 400, error.message);
  }
};

module.exports = {
  getCard,
  createCard,
  updateCardNameDes,
  updateCardPositionList,
  deleteCard,
};
