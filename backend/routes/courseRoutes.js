const express = require("express");
const router = express.Router();

const coursesController = require("../controllers/courseController");

router.post("/", coursesController.createCourse);
router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getCourseById);
router.put("/:id", coursesController.updateCourseById);
router.delete("/:id", coursesController.deleteCourseById);

module.exports = router;
