
const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMe,
  addMobileNumber,
  changePassword,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  createAdvisor,
  getAllUsers
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// Register and Login
router.post("/register", register);
router.post("/login", login);

// Logged-in user profile
router.get("/me", protect, getMe);

// Add new mobile number
router.post("/add-mobile", protect, addMobileNumber);

// Change Password
router.put("/change-password", protect, changePassword);

// Admin-only: Get all users
router.get("/users", protect, adminOnly, getAllUsers);

// Admin-only: Create advisor account
router.post("/create-advisor", protect, adminOnly, createAdvisor);

// Forgot Password APIs
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
