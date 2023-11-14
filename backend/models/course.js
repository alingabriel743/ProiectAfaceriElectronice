const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  language: {
    type: String,
    required: true,
  },
  skillLevel: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  instructor: {
    name: String,
    bio: String,
  },
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
