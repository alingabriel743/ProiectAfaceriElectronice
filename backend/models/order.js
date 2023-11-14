const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course",
      },
    },
  ],
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
