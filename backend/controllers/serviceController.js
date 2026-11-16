
const pool = require("../config/db");

// ================= GET ALL SERVICES (ADMIN) =================
const getAllServices = async (req, res) => {
  try {
    const [services] = await pool.execute(
      `SELECT id, service_name, description, status, created_at, updated_at
       FROM services
       ORDER BY created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch services.",
    });
  }
};

// ================= GET ACTIVE SERVICES (WEBSITE) =================
const getActiveServices = async (req, res) => {
  try {
    const [services] = await pool.execute(
      `SELECT id, service_name, description, status
       FROM services
       WHERE status = 'active'
       ORDER BY created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("GET ACTIVE SERVICES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch active services.",
    });
  }
};

// ================= ADD SERVICE =================
const addService = async (req, res) => {
  try {
    const { service_name, description, status = "active" } = req.body;

    if (!service_name?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Service name and description are required.",
      });
    }

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service status.",
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO services (service_name, description, status)
       VALUES (?, ?, ?)`,
      [service_name.trim(), description.trim(), status]
    );

    return res.status(201).json({
      success: true,
      message: "Service added successfully.",
      serviceId: result.insertId,
    });
  } catch (error) {
    console.error("ADD SERVICE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to add service.",
    });
  }
};

// ================= UPDATE SERVICE =================
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { service_name, description, status } = req.body;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    if (!service_name?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Service name and description are required.",
      });
    }

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service status.",
      });
    }

    // Check whether service exists
    const [existing] = await pool.execute(
      "SELECT id FROM services WHERE id = ? LIMIT 1",
      [Number(id)]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    await pool.execute(
      `UPDATE services
       SET service_name = ?, description = ?, status = ?
       WHERE id = ?`,
      [service_name.trim(), description.trim(), status, Number(id)]
    );

    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
    });
  } catch (error) {
    console.error("UPDATE SERVICE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to update service.",
    });
  }
};

// ================= DELETE SERVICE =================
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID.",
      });
    }

    const [result] = await pool.execute(
      "DELETE FROM services WHERE id = ?",
      [Number(id)]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE SERVICE ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to delete service.",
    });
  }
};

module.exports = {
  getAllServices,
  getActiveServices,
  addService,
  updateService,
  deleteService,
};
