const { Card } = require("../models/Card.model");
const { errorTemplate } = require("../utilities/errorTemplate");

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

const updateCardName = async (req, res) => {
  let { name, card_id } = req.body;

  try {
    let payload = { name };
    const card = await Card.findOneAndUpdate({ _id: card_id }, payload, {
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

const upadateCardDescription = async (req, res) => {
  let { description, card_id } = req.body;

  try {
    let payload = { description };
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

const updateCardPosition = async (req, res) => {
  let { position, card_id } = req.body;

  try {
    let payload = { position };
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

const updateCardList = async (req, res) => {
  const { list_id, position, card_id } = req.body;
  try {
    let payload = { list_id, position };
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
  updateCardName,
  upadateCardDescription,
  updateCardPosition,
  updateCardList,
  deleteCard,
};
