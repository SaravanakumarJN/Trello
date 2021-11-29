const express = require("express");
const router = express.Router();

const {
  createCard,
  getCard,
  updateCardNameDes,
  updateCardPositionList,
  deleteCard,
} = require("../controllers/card.controller");
const { authenticate } = require("../middlewares/authenticate");

router.get("/:card_id", authenticate, getCard);
router.post("/create", authenticate, createCard);
router.patch("/name_des/:card_id", authenticate, updateCardNameDes);
router.patch("/position_list/:card_id", authenticate, updateCardPositionList);
router.delete("/", authenticate, deleteCard);

module.exports = {
  cardRouter: router,
};
