
const express = require("express");
const router = express.Router();

const {
  getClients,
  getAdvisors,
  assignAdvisor,
  addInvestment,
  getAllInvestments,
  updateInvestment,
  deleteInvestment
} = require("../controllers/adminInvestmentController");

const {
  getAdminInvestmentRequests,
  updateAdminInvestmentRequestStatus
} = require("../controllers/investmentRequestController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// All admin routes require authentication and active admin role
router.use(protect, adminOnly);

// Clients and advisors
router.get("/clients", getClients);
router.get("/advisors", getAdvisors);

// Assign advisor to client
router.put("/assign-advisor/:clientId", assignAdvisor);

// Existing investment management
router.get("/all", getAllInvestments);
router.post("/add-investment", addInvestment);
router.put("/:id", updateInvestment);
router.delete("/:id", deleteInvestment);

// Investment request management
router.get("/requests", getAdminInvestmentRequests);
router.patch("/requests/:id/status", updateAdminInvestmentRequestStatus);

module.exports = router;
