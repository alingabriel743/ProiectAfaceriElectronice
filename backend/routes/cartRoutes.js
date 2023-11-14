const express = require("express");
const router = express.Router();
const {
  addItemToCart,
  getCart,
  removeItemFromCart,
} = require("../controllers/cartController");

const protect = require("../middleware/authMiddleware");

router.post("/cart", protect, addItemToCart);
router.get("/cart", protect, getCart);
router.delete("/cart", protect, removeItemFromCart);

module.exports = router;
