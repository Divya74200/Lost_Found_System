const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
} = require("../controllers/itemController");

router.post("/", auth, addItem);
router.get("/", getItems);
router.get("/search", searchItems);
router.get("/:id", getItemById);
router.put("/:id", auth, updateItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;