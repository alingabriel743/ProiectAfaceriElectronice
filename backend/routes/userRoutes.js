const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  updateUserToAdmin,
  enrollCourse,
  getEnrolledCourses,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.post("/enroll", protect, enrollCourse);
router.get("/enrolled-courses", protect, getEnrolledCourses);
router.put("/:id", protect, admin, updateUser);
router.put("/:id/make-admin", protect, admin, updateUserToAdmin);

module.exports = router;
