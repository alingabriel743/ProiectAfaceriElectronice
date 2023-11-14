const Order = require("../models/order");

exports.createOrder = async (req, res, next) => {
  const { courses } = req.body;

  try {
    let totalPrice = 0;
    console.log(courses);
    courses.forEach((course) => {
      totalPrice += course.price;
    });

    const order = new Order({
      user: req.user._id,
      courses,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "courses.course"
    );
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.orderId,
      user: req.user._id,
      status: { $ne: "cancelled" },
    });

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or already cancelled" });
    }

    order.status = "cancelled";
    const updatedOrder = await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};
