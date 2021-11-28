const express = require("express");
const router = express.Router();

const {
  createList,
  getList,
  updateListName,
  updateListPosition,
  deleteList,
} = require("../controllers/list.controller");
const { authenticate } = require("../middlewares/authenticate");

router.get("/:list_id", authenticate, getList);
router.post("/create", authenticate, createList);
router.patch("/name", authenticate, updateListName);
router.patch("/position", authenticate, updateListPosition);
router.delete("/", authenticate, deleteList);

module.exports = {
  listRouter: router,
};
