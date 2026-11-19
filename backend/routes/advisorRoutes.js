
const express = require("express");
const router = express.Router();

const {
  getMyClients,
  getClientDetails,
  getClientInvestments,
  getDashboardStats
} = require("../controllers/advisorController");

const {
  getAdvisorInvestmentRequests,
  updateAdvisorInvestmentRequestStatus
} = require("../controllers/investmentRequestController");

const { protect } = require("../middlewares/authMiddleware");
const { advisorOnly } = require("../middlewares/advisorMiddleware");

// All advisor routes require authentication and active advisor role
router.use(protect, advisorOnly);

// ================= ADVISOR DASHBOARD =================
router.get("/dashboard", getDashboardStats);

// ================= ASSIGNED REGISTERED CLIENTS =================
router.get("/clients", getMyClients);

router.get("/clients/:clientId", getClientDetails);

router.get(
  "/clients/:clientId/investments",
  getClientInvestments
);

// ================= INVESTMENT REQUESTS =================
router.get(
  "/investment-requests",
  getAdvisorInvestmentRequests
);

router.patch(
  "/investment-requests/:id/status",
  updateAdvisorInvestmentRequestStatus
);

module.exports = router;
