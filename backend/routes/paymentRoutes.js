const express = require("express");
const {
  createPayPalOrder,
  capturePayPalOrder,
} = require("../controllers/paymentController");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.post("/order/create", protect, createPayPalOrder);
router.post("/order/capture", protect, capturePayPalOrder);

module.exports = router;
