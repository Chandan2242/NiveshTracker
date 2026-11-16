
const pool = require("../config/db");

// ================= SUBMIT ENQUIRY =================
const submitEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      monthlyAmount,
      message
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required."
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = phone ? String(phone).trim() : null;
    const cleanService = service ? String(service).trim() : null;
    const cleanMessage = String(message).trim();

    const cleanMonthlyAmount =
      monthlyAmount !== undefined &&
      monthlyAmount !== null &&
      monthlyAmount !== ""
        ? Number(monthlyAmount)
        : null;

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled."
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    // Phone validation
    if (
      cleanPhone &&
      !/^[0-9+\-\s()]{10,20}$/.test(cleanPhone)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number."
      });
    }

    // Monthly amount validation
    if (
      cleanMonthlyAmount !== null &&
      (!Number.isFinite(cleanMonthlyAmount) ||
        cleanMonthlyAmount <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid monthly investment amount."
      });
    }

    await pool.execute(
      `INSERT INTO enquiries
        (name, email, phone, service, monthly_amount, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`,
      [
        cleanName,
        cleanEmail,
        cleanPhone,
        cleanService,
        cleanMonthlyAmount,
        cleanMessage
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully."
    });

  } catch (error) {
    console.error("SUBMIT ENQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry."
    });
  }
};

// ================= GET ALL ENQUIRIES (ADMIN) =================
const getAllEnquiries = async (req, res) => {
  try {
    const [enquiries] = await pool.execute(
      `SELECT
        e.id,
        e.name,
        e.email,
        e.phone,
        e.service,
        e.monthly_amount,
        e.message,
        e.status,
        e.assigned_advisor_id,
        e.assigned_by,
        e.assigned_at,
        e.created_at,
        e.updated_at,
        advisor.name AS advisor_name
       FROM enquiries e
       LEFT JOIN users advisor
         ON e.assigned_advisor_id = advisor.id
       ORDER BY e.created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries
    });

  } catch (error) {
    console.error("GET ALL ENQUIRIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch enquiries."
    });
  }
};

// ================= ASSIGN ENQUIRY TO ADVISOR =================
const assignEnquiry = async (req, res) => {
  try {
    const enquiryId = Number(req.params.id);
    const advisorId = Number(req.body.advisorId);

    if (!Number.isInteger(enquiryId) || enquiryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID."
      });
    }

    if (!Number.isInteger(advisorId) || advisorId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid advisor ID is required."
      });
    }

    const [enquiries] = await pool.execute(
      "SELECT id FROM enquiries WHERE id = ?",
      [enquiryId]
    );

    if (enquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found."
      });
    }

    const [advisors] = await pool.execute(
      `SELECT id FROM users
       WHERE id = ?
       AND role = 'advisor'
       AND status = 'active'
       LIMIT 1`,
      [advisorId]
    );

    if (advisors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Active advisor not found."
      });
    }

    await pool.execute(
      `UPDATE enquiries
       SET assigned_advisor_id = ?,
           assigned_by = ?,
           assigned_at = NOW(),
           updated_at = NOW()
       WHERE id = ?`,
      [advisorId, req.user.id, enquiryId]
    );

    return res.status(200).json({
      success: true,
      message: "Enquiry assigned to advisor successfully."
    });

  } catch (error) {
    console.error("ASSIGN ENQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to assign enquiry."
    });
  }
};

// ================= UPDATE ENQUIRY STATUS =================
const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiryId = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "in_progress",
      "converted",
      "closed"
    ];

    if (!Number.isInteger(enquiryId) || enquiryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID."
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status."
      });
    }

    const [result] = await pool.execute(
      `UPDATE enquiries
       SET status = ?, updated_at = NOW()
       WHERE id = ?`,
      [status, enquiryId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully."
    });

  } catch (error) {
    console.error("UPDATE ENQUIRY STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update enquiry status."
    });
  }
};

// ================= DELETE ENQUIRY (ADMIN) =================
const deleteEnquiry = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID."
      });
    }

    const [result] = await pool.execute(
      "DELETE FROM enquiries WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully."
    });

  } catch (error) {
    console.error("DELETE ENQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete enquiry."
    });
  }
};

module.exports = {
  submitEnquiry,
  getAllEnquiries,
  assignEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
};
