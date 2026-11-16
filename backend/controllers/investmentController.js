
const pool = require("../config/db");

// Get investments of the logged-in user
const getMyInvestments = async (req, res) => {
  try {
    const [investments] = await pool.execute(
      `SELECT
        id,
        investment_type,
        product_name,
        folio_number,
        invested_amount,
        units,
        purchase_nav,
        investment_date,
        status,
        notes,
        created_at
      FROM investments
      WHERE user_id = ?
      ORDER BY created_at DESC`,
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      count: investments.length,
      investments
    });

  } catch (error) {
    console.error("GET INVESTMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch investments."
    });
  }
};


// Get assigned advisor of the logged-in client
const getMyAdvisor = async (req, res) => {
  try {
    const clientId = req.user.id;

    const [results] = await pool.execute(
      `SELECT
        advisor.id,
        advisor.name,
        advisor.email,
        advisor.phone
      FROM users AS client
      LEFT JOIN users AS advisor
        ON client.advisor_id = advisor.id
        AND advisor.role = 'advisor'
        AND advisor.status = 'active'
      WHERE client.id = ?
        AND client.role = 'client'
        AND client.status = 'active'
      LIMIT 1`,
      [clientId]
    );

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Client account not found."
      });
    }

    const advisor = results[0];

    if (!advisor.id) {
      return res.status(200).json({
        success: true,
        assigned: false,
        message: "No advisor assigned yet.",
        advisor: null
      });
    }

    return res.status(200).json({
      success: true,
      assigned: true,
      advisor
    });

  } catch (error) {
    console.error("GET MY ADVISOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch advisor details."
    });
  }
};


// Create investment request
const createInvestmentRequest = async (req, res) => {
  try {
    const {
      investment_type,
      product_name,
      investment_mode,
      amount,
      duration_months,
      remarks
    } = req.body;

    if (
      !investment_type ||
      !product_name ||
      !investment_mode ||
      amount === undefined ||
      amount === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required investment details."
      });
    }

    const validModes = ["SIP", "LUMP_SUM"];

    if (!validModes.includes(investment_mode)) {
      return res.status(400).json({
        success: false,
        message: "Investment mode must be SIP or LUMP_SUM."
      });
    }

    const investmentAmount = Number(amount);

    if (!Number.isFinite(investmentAmount) || investmentAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid investment amount."
      });
    }

    const duration = duration_months === "" ||
      duration_months === undefined ||
      duration_months === null
      ? null
      : Number(duration_months);

    if (
      duration !== null &&
      (!Number.isInteger(duration) || duration <= 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid investment duration."
      });
    }

    if (investment_mode === "SIP" && duration === null) {
      return res.status(400).json({
        success: false,
        message: "Duration is required for SIP requests."
      });
    }

    // Verify logged-in client and get assigned advisor
    const [clients] = await pool.execute(
      `SELECT id, advisor_id
       FROM users
       WHERE id = ?
         AND role = 'client'
         AND status = 'active'
       LIMIT 1`,
      [req.user.id]
    );

    if (clients.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Only active client accounts can submit investment requests."
      });
    }

    const advisorId = clients[0].advisor_id || null;

    const [result] = await pool.execute(
      `INSERT INTO investment_requests
        (
          user_id,
          advisor_id,
          investment_type,
          product_name,
          investment_mode,
          amount,
          duration_months,
          remarks
        )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        advisorId,
        investment_type.trim(),
        product_name.trim(),
        investment_mode,
        investmentAmount,
        duration,
        remarks ? remarks.trim() : null
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Investment request submitted successfully. It is pending review.",
      requestId: result.insertId
    });

  } catch (error) {
    console.error("CREATE INVESTMENT REQUEST ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit investment request."
    });
  }
};


// Get investment requests of logged-in client
const getMyInvestmentRequests = async (req, res) => {
  try {
    const [requests] = await pool.execute(
      `SELECT
        id,
        investment_type,
        product_name,
        investment_mode,
        amount,
        duration_months,
        remarks,
        status,
        reviewed_at,
        created_at,
        updated_at
       FROM investment_requests
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests
    });

  } catch (error) {
    console.error("GET MY INVESTMENT REQUESTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch investment requests."
    });
  }
};


module.exports = {
  getMyInvestments,
  getMyAdvisor,
  createInvestmentRequest,
  getMyInvestmentRequests
};
