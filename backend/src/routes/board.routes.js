const express = require("express");
const router = express.Router();

const {
  createBoard,
  getBoard,
  getAllUsersBoards,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");
const { authenticate } = require("../middlewares/authenticate");

router.get("/user", authenticate, getAllUsersBoards);
router.get("/:board_id", authenticate, getBoard);
router.post("/create", authenticate, createBoard);
router.patch("/", authenticate, updateBoard);
router.delete("/", authenticate, deleteBoard);

module.exports = {
  boardRouter: router,
};
