const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Failed", "Refunded"],
    },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: String,
    method: {
      type: String,
      required: true,
      enum: ["PayPal", "CreditCard", "Other"],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
