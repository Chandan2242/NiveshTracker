
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
    } = req.body || {};

    // Required fields validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required."
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanMessage = String(message).trim();
    const cleanPhone = phone ? String(phone).trim() : null;
    const cleanService = service ? String(service).trim() : null;

    // Validate name
    if (cleanName.length < 2 || cleanName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 100 characters."
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    // Validate phone if provided
    if (cleanPhone && !/^[0-9+\-\s()]{10,20}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number."
      });
    }

    // Validate message
    if (cleanMessage.length < 5 || cleanMessage.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message must be between 5 and 2000 characters."
      });
    }

    // Validate monthly amount
    let cleanMonthlyAmount = null;

    if (
      monthlyAmount !== undefined &&
      monthlyAmount !== null &&
      monthlyAmount !== ""
    ) {
      cleanMonthlyAmount = Number(monthlyAmount);

      if (
        !Number.isFinite(cleanMonthlyAmount) ||
        cleanMonthlyAmount < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid monthly amount."
        });
      }
    }

    // Insert enquiry
    const [result] = await pool.execute(
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
      message: "Your enquiry has been submitted successfully. Our advisor will contact you soon.",
      enquiryId: result.insertId
    });

  } catch (error) {
    console.error("SUBMIT ENQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit enquiry. Please try again later."
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
        advisor.name AS advisor_name,
        assigner.name AS assigned_by_name
      FROM enquiries e
      LEFT JOIN users advisor
        ON e.assigned_advisor_id = advisor.id
      LEFT JOIN users assigner
        ON e.assigned_by = assigner.id
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

// ================= ASSIGN / REASSIGN ENQUIRY (ADMIN) =================
const assignEnquiry = async (req, res) => {
  try {
    const enquiryId = Number(req.params.id);
    const advisorId = Number(req.body?.advisorId);

    if (!Number.isInteger(enquiryId) || enquiryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID."
      });
    }

    if (!Number.isInteger(advisorId) || advisorId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid advisor."
      });
    }

    // Check enquiry exists
    const [enquiries] = await pool.execute(
      `SELECT id, assigned_advisor_id
       FROM enquiries
       WHERE id = ?
       LIMIT 1`,
      [enquiryId]
    );

    if (enquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found."
      });
    }

    // Check advisor exists, is active and has advisor role
    const [advisors] = await pool.execute(
      `SELECT id, name, email
       FROM users
       WHERE id = ?
         AND role = 'advisor'
         AND status = 'active'
       LIMIT 1`,
      [advisorId]
    );

    if (advisors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Selected advisor not found or is inactive."
      });
    }

    // Assign or reassign enquiry
    await pool.execute(
      `UPDATE enquiries
       SET assigned_advisor_id = ?,
           assigned_by = ?,
           assigned_at = NOW(),
           status = 'assigned',
           updated_at = NOW()
       WHERE id = ?`,
      [advisorId, req.user.id, enquiryId]
    );

    return res.status(200).json({
      success: true,
      message: "Enquiry assigned successfully.",
      enquiryId,
      advisor: advisors[0]
    });

  } catch (error) {
    console.error("ASSIGN ENQUIRY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to assign enquiry."
    });
  }
};

// ================= UPDATE ENQUIRY STATUS (ADMIN) =================
const updateEnquiryStatus = async (req, res) => {
  try {
    const enquiryId = Number(req.params.id);
    const { status } = req.body || {};

    const allowedStatuses = [
      "new",
      "assigned",
      "in_progress",
      "resolved"
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
        message: "Invalid status. Allowed: new, assigned, in_progress, resolved."
      });
    }

    const [result] = await pool.execute(
      `UPDATE enquiries
       SET status = ?,
           updated_at = NOW()
       WHERE id = ?`,
      [status, enquiryId]
    );

    if (result.affectedRows === 0) {
      const [existing] = await pool.execute(
        `SELECT id FROM enquiries WHERE id = ? LIMIT 1`,
        [enquiryId]
      );

      if (existing.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Enquiry not found."
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully.",
      status
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
    const enquiryId = Number(req.params.id);

    if (!Number.isInteger(enquiryId) || enquiryId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID."
      });
    }

    const [result] = await pool.execute(
      `DELETE FROM enquiries WHERE id = ?`,
      [enquiryId]
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

// ================= EXPORTS =================
module.exports = {
  submitEnquiry,
  getAllEnquiries,
  assignEnquiry,
  updateEnquiryStatus,
  deleteEnquiry
};
