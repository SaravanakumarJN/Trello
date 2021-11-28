const express = require("express");
const router = express.Router();

const {
  createCard,
  getCard,
  updateCardName,
  upadateCardDescription,
  updateCardPosition,
  updateCardList,
  deleteCard,
} = require("../controllers/card.controller");
const { authenticate } = require("../middlewares/authenticate");

router.get("/:card_id", authenticate, getCard);
router.post("/create", authenticate, createCard);
router.patch("/name", authenticate, updateCardName);
router.patch("/description", authenticate, upadateCardDescription);
router.patch("/position", authenticate, updateCardPosition);
router.patch("/list", authenticate, updateCardList);
router.delete("/", authenticate, deleteCard);

module.exports = {
  cardRouter: router,
};
