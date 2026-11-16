
const express = require("express");
const router = express.Router();

const {
  getAllServices,
  getActiveServices,
  addService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

// Public API: Website par sirf active services dikhengi
router.get("/public", getActiveServices);

// Admin-only access
router.use(protect, adminOnly);

// Get all services (Admin)
router.get("/", getAllServices);

// Add service
router.post("/", addService);

// Update service
router.put("/:id", updateService);

// Delete service
router.delete("/:id", deleteService);

module.exports = router;
