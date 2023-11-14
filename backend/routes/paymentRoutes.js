const express = require("express");
const {
  createPayPalOrder,
  capturePayPalOrder,
} = require("../controllers/paymentController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Route to create a PayPal order
router.post("/order/create", protect, createPayPalOrder);

// Route to capture a PayPal order
router.post("/order/capture", protect, capturePayPalOrder);

module.exports = router;
