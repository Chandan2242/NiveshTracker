
const express = require("express");
const router = express.Router();

const {
  submitEnquiry,
  getAllEnquiries,
  assignEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
} = require("../controllers/enquiryController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// Public: Submit enquiry
router.post("/", submitEnquiry);

// Admin: Get all enquiries
router.get("/", protect, adminOnly, getAllEnquiries);

// Admin: Assign enquiry to advisor
router.put("/:id/assign", protect, adminOnly, assignEnquiry);

// Admin: Update enquiry status
router.put("/:id/status", protect, adminOnly, updateEnquiryStatus);

// Admin: Delete enquiry
router.delete("/:id", protect, adminOnly, deleteEnquiry);

module.exports = router;
