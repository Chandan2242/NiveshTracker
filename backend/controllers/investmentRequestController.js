
const pool = require("../config/db");

const allowedRequestStatuses = [
  "pending",
  "under_review",
  "approved",
  "rejected",
  "completed"
];

// Admin: Get all investment requests
const getAdminInvestmentRequests = async (req, res) => {
  try {
    const [requests] = await pool.execute(
      `SELECT
        ir.id,
        ir.user_id,
        client.name AS client_name,
        client.email AS client_email,
        client.phone AS client_phone,
        ir.advisor_id,
        advisor.name AS advisor_name,
        ir.investment_type,
        ir.product_name,
        ir.investment_mode,
        ir.amount,
        ir.duration_months,
        ir.remarks,
        ir.status,
        ir.reviewed_by,
        reviewer.name AS reviewed_by_name,
        ir.reviewed_at,
        ir.created_at,
        ir.updated_at
      FROM investment_requests ir
      INNER JOIN users client
        ON ir.user_id = client.id
      LEFT JOIN users advisor
        ON ir.advisor_id = advisor.id
      LEFT JOIN users reviewer
        ON ir.reviewed_by = reviewer.id
      ORDER BY ir.created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    console.error("GET ADMIN INVESTMENT REQUESTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch investment requests."
    });
  }
};


// Admin: Update investment request status
const updateAdminInvestmentRequestStatus = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const { status } = req.body || {};

    if (!Number.isInteger(requestId) || requestId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID."
      });
    }

    if (!allowedRequestStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment request status."
      });
    }

    const [existing] = await pool.execute(
      "SELECT id FROM investment_requests WHERE id = ? LIMIT 1",
      [requestId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Investment request not found."
      });
    }

    await pool.execute(
      `UPDATE investment_requests
       SET status = ?,
           reviewed_by = ?,
           reviewed_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, req.user.id, requestId]
    );

    return res.status(200).json({
      success: true,
      message: "Investment request status updated successfully."
    });
  } catch (error) {
    console.error("UPDATE ADMIN INVESTMENT REQUEST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update investment request."
    });
  }
};


// Advisor: Get requests of assigned clients only
const getAdvisorInvestmentRequests = async (req, res) => {
  try {
    const [requests] = await pool.execute(
      `SELECT
        ir.id,
        ir.user_id,
        client.name AS client_name,
        client.email AS client_email,
        ir.advisor_id,
        ir.investment_type,
        ir.product_name,
        ir.investment_mode,
        ir.amount,
        ir.duration_months,
        ir.remarks,
        ir.status,
        ir.reviewed_by,
        ir.reviewed_at,
        ir.created_at,
        ir.updated_at
      FROM investment_requests ir
      INNER JOIN users client
        ON ir.user_id = client.id
      WHERE ir.advisor_id = ?
        AND client.advisor_id = ?
        AND client.role = 'client'
      ORDER BY ir.created_at DESC`,
      [req.user.id, req.user.id]
    );

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });
  } catch (error) {
    console.error("GET ADVISOR INVESTMENT REQUESTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch assigned clients' investment requests."
    });
  }
};


// Advisor: Update status of assigned client's request only
const updateAdvisorInvestmentRequestStatus = async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const { status } = req.body || {};

    if (!Number.isInteger(requestId) || requestId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID."
      });
    }

    if (!allowedRequestStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment request status."
      });
    }

    const [result] = await pool.execute(
      `UPDATE investment_requests ir
       INNER JOIN users client
         ON ir.user_id = client.id
       SET ir.status = ?,
           ir.reviewed_by = ?,
           ir.reviewed_at = CURRENT_TIMESTAMP
       WHERE ir.id = ?
         AND ir.advisor_id = ?
         AND client.advisor_id = ?
         AND client.role = 'client'`,
      [status, req.user.id, requestId, req.user.id, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Investment request not found or not assigned to you."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Investment request status updated successfully."
    });
  } catch (error) {
    console.error("UPDATE ADVISOR INVESTMENT REQUEST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update investment request."
    });
  }
};


module.exports = {
  getAdminInvestmentRequests,
  updateAdminInvestmentRequestStatus,
  getAdvisorInvestmentRequests,
  updateAdvisorInvestmentRequestStatus
};
