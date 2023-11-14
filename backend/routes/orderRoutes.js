const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  cancelOrder,
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

router.route("/").post(protect, createOrder);
router.route("/myorders").get(protect, getUserOrders);
router.patch("/:orderId/cancel", protect, cancelOrder);

module.exports = router;
