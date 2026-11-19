
const express = require("express");
const router = express.Router();

const {
  submitEnquiry,
  getAllEnquiries,
  assignEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
} = require("../controllers/enquiryController");

const {
  protect,
  adminOnly
} = require("../middlewares/authMiddleware");

// Public enquiry submission
router.post("/", submitEnquiry);

// Admin-only enquiry management
router.get("/", protect, adminOnly, getAllEnquiries);
router.put("/:id/assign", protect, adminOnly, assignEnquiry);
router.put("/:id/status", protect, adminOnly, updateEnquiryStatus);
router.delete("/:id", protect, adminOnly, deleteEnquiry);

module.exports = router;
