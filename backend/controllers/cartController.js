const Cart = require("../models/cart");

exports.addItemToCart = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const isCourseExist = cart.items.find(
        (item) => item.course.toString() === courseId
      );
      if (isCourseExist) {
        return res.status(400).json({ message: "Course already in cart" });
      }
      cart.items.push({ course: courseId });
    } else {
      const newCart = await Cart.create({
        user: req.user._id,
        items: [{ course: courseId }],
      });
      cart = newCart;
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.course"
    );
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

exports.removeItemFromCart = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.course.toString() !== courseId
      );
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};
