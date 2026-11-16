
const express = require("express");
const router = express.Router();

const {
  getMyInvestments,
  getMyAdvisor,
  createInvestmentRequest,
  getMyInvestmentRequests
} = require("../controllers/investmentController");

const { protect } = require("../middlewares/authMiddleware");

// Client investment routes
router.get("/my-investments", protect, getMyInvestments);

// Client assigned advisor route
router.get("/my-advisor", protect, getMyAdvisor);

// Submit new investment request
router.post("/requests", protect, createInvestmentRequest);

// Get logged-in client's investment requests
router.get("/my-requests", protect, getMyInvestmentRequests);

module.exports = router;
