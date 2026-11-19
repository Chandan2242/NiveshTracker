
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
  getAllUsers,
  getAdvisors,
  getAdvisorCandidates,
  promoteUserToAdvisor,
  removeAdvisor
} = require("../controllers/authController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// ================= REGISTER AND LOGIN =================
router.post("/register", register);
router.post("/login", login);

// ================= USER PROFILE =================
router.get("/me", protect, getMe);

// ================= MOBILE NUMBER =================
router.post("/add-mobile", protect, addMobileNumber);

// ================= CHANGE PASSWORD =================
router.put("/change-password", protect, changePassword);

// ================= ADMIN: ALL USERS =================
router.get("/users", protect, adminOnly, getAllUsers);

// ================= ADMIN: ADVISOR MANAGEMENT =================

// Get all Advisors
router.get("/advisors", protect, adminOnly, getAdvisors);

// Search registered Clients by email
router.get(
  "/advisor-candidates",
  protect,
  adminOnly,
  getAdvisorCandidates
);

// Promote existing Client to Advisor
router.put(
  "/users/:id/promote-advisor",
  protect,
  adminOnly,
  promoteUserToAdvisor
);

// Remove Advisor privilege (account remains)
router.delete(
  "/advisors/:id",
  protect,
  adminOnly,
  removeAdvisor
);

// ================= FORGOT PASSWORD =================
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
