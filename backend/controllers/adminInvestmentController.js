
const pool = require("../config/db");

const allowedTypes = [
  "mutual_fund",
  "pms",
  "aif",
  "sif",
  "insurance",
  "fd",
  "bonds",
  "other"
];

const allowedStatuses = ["active", "redeemed", "pending"];


// Get all active clients
const getClients = async (req, res) => {
  try {
    const [clients] = await pool.execute(
      `SELECT id, name, email, phone, advisor_id
       FROM users
       WHERE role = 'client' AND status = 'active'
       ORDER BY name ASC`
    );

    return res.status(200).json({
      success: true,
      count: clients.length,
      clients
    });
  } catch (error) {
    console.error("GET CLIENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch clients."
    });
  }
};


// Get all active advisors
const getAdvisors = async (req, res) => {
  try {
    const [advisors] = await pool.execute(
      `SELECT id, name, email, phone
       FROM users
       WHERE role = 'advisor'
       AND status = 'active'
       ORDER BY name ASC`
    );

    return res.status(200).json({
      success: true,
      count: advisors.length,
      advisors
    });
  } catch (error) {
    console.error("GET ADVISORS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch advisors."
    });
  }
};


// Get logged-in client's assigned advisor
const getMyAdvisor = async (req, res) => {
  try {
    const clientId = req.user.id;

    const [advisors] = await pool.execute(
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

    if (advisors.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Client account not found."
      });
    }

    if (!advisors[0].id) {
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
      advisor: advisors[0]
    });

  } catch (error) {
    console.error("GET MY ADVISOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch advisor details."
    });
  }
};

// Assign advisor to a client
const assignAdvisor = async (req, res) => {
  try {
    const clientId = Number(req.params.clientId);
    const advisorId = Number(req.body?.advisor_id);

    if (!Number.isInteger(clientId) || clientId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID."
      });
    }

    if (!Number.isInteger(advisorId) || advisorId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid advisor ID is required."
      });
    }

    const [clients] = await pool.execute(
      `SELECT id
       FROM users
       WHERE id = ?
       AND role = 'client'
       AND status = 'active'
       LIMIT 1`,
      [clientId]
    );

    if (clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Active client not found."
      });
    }

    const [advisors] = await pool.execute(
      `SELECT id
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
        message: "Active advisor not found."
      });
    }

    await pool.execute(
      `UPDATE users
       SET advisor_id = ?
       WHERE id = ?`,
      [advisorId, clientId]
    );

    return res.status(200).json({
      success: true,
      message: "Advisor assigned successfully."
    });

  } catch (error) {
    console.error("ASSIGN ADVISOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to assign advisor."
    });
  }
};


// Add investment for a client
const addInvestment = async (req, res) => {
  try {
    const body = req.body || {};

    const {
      user_id,
      investment_type,
      product_name,
      folio_number,
      invested_amount,
      units,
      purchase_nav,
      investment_date,
      status,
      notes
    } = body;

    if (!user_id || !investment_type || !product_name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Client, investment type and product name are required."
      });
    }

    if (!Number.isInteger(Number(user_id)) || Number(user_id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID."
      });
    }

    if (!allowedTypes.includes(investment_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment type."
      });
    }

    const amount = Number(invested_amount);

    if (
      invested_amount === undefined ||
      invested_amount === null ||
      invested_amount === "" ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid invested amount."
      });
    }

    const investmentStatus = status || "active";

    if (!allowedStatuses.includes(investmentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment status."
      });
    }

    const [clients] = await pool.execute(
      `SELECT id FROM users
       WHERE id = ? AND role = 'client' AND status = 'active'
       LIMIT 1`,
      [Number(user_id)]
    );

    if (clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Active client not found."
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO investments (
        user_id,
        investment_type,
        product_name,
        folio_number,
        invested_amount,
        units,
        purchase_nav,
        investment_date,
        status,
        notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Number(user_id),
        investment_type,
        product_name.trim(),
        folio_number || null,
        amount,
        units === "" || units === undefined || units === null ? null : units,
        purchase_nav === "" || purchase_nav === undefined || purchase_nav === null ? null : purchase_nav,
        investment_date || null,
        investmentStatus,
        notes || null
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Investment added successfully.",
      investmentId: result.insertId
    });
  } catch (error) {
    console.error("ADD INVESTMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to add investment."
    });
  }
};


// Get all investments with client details
const getAllInvestments = async (req, res) => {
  try {
    const [investments] = await pool.execute(
      `SELECT
        i.id,
        i.user_id,
        u.name AS client_name,
        u.email AS client_email,
        i.investment_type,
        i.product_name,
        i.folio_number,
        i.invested_amount,
        i.units,
        i.purchase_nav,
        i.investment_date,
        i.status,
        i.notes,
        i.created_at
      FROM investments i
      INNER JOIN users u ON i.user_id = u.id
      ORDER BY i.created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: investments.length,
      investments
    });
  } catch (error) {
    console.error("GET ALL INVESTMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch investments."
    });
  }
};


// Update existing investment
const updateInvestment = async (req, res) => {
  try {
    const investmentId = Number(req.params.id);

    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      return res.status(400).json({
        success: false,
        message: "Request body is missing. Select raw JSON in Postman."
      });
    }

    const {
      user_id,
      investment_type,
      product_name,
      folio_number,
      invested_amount,
      units,
      purchase_nav,
      investment_date,
      status,
      notes
    } = req.body;

    if (!Number.isInteger(investmentId) || investmentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment ID."
      });
    }

    if (!user_id || !investment_type || !product_name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Client, investment type and product name are required."
      });
    }

    if (!Number.isInteger(Number(user_id)) || Number(user_id) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID."
      });
    }

    if (!allowedTypes.includes(investment_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment type."
      });
    }

    const amount = Number(invested_amount);

    if (
      invested_amount === undefined ||
      invested_amount === null ||
      invested_amount === "" ||
      !Number.isFinite(amount) ||
      amount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid invested amount."
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment status."
      });
    }

    const parseOptionalNumber = (value) => {
      if (value === "" || value === undefined || value === null) {
        return { valid: true, value: null };
      }

      const number = Number(value);

      if (!Number.isFinite(number) || number < 0) {
        return { valid: false, value: null };
      }

      return { valid: true, value: number };
    };

    const parsedUnits = parseOptionalNumber(units);
    const parsedNav = parseOptionalNumber(purchase_nav);

    if (!parsedUnits.valid || !parsedNav.valid) {
      return res.status(400).json({
        success: false,
        message: "Units and purchase NAV must be valid non-negative numbers."
      });
    }

    const [existing] = await pool.execute(
      "SELECT id FROM investments WHERE id = ? LIMIT 1",
      [investmentId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Investment not found."
      });
    }

    const [clients] = await pool.execute(
      `SELECT id FROM users
       WHERE id = ? AND role = 'client' AND status = 'active'
       LIMIT 1`,
      [Number(user_id)]
    );

    if (clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Active client not found."
      });
    }

    await pool.execute(
      `UPDATE investments SET
        user_id = ?,
        investment_type = ?,
        product_name = ?,
        folio_number = ?,
        invested_amount = ?,
        units = ?,
        purchase_nav = ?,
        investment_date = ?,
        status = ?,
        notes = ?
      WHERE id = ?`,
      [
        Number(user_id),
        investment_type,
        product_name.trim(),
        folio_number || null,
        amount,
        parsedUnits.value,
        parsedNav.value,
        investment_date || null,
        status,
        notes || null,
        investmentId
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Investment updated successfully."
    });
  } catch (error) {
    console.error("UPDATE INVESTMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update investment."
    });
  }
};


// Delete investment
const deleteInvestment = async (req, res) => {
  try {
    const investmentId = Number(req.params.id);

    if (!Number.isInteger(investmentId) || investmentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid investment ID."
      });
    }

    const [existing] = await pool.execute(
      "SELECT id FROM investments WHERE id = ? LIMIT 1",
      [investmentId]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Investment not found."
      });
    }

    await pool.execute(
      "DELETE FROM investments WHERE id = ?",
      [investmentId]
    );

    return res.status(200).json({
      success: true,
      message: "Investment deleted successfully."
    });
  } catch (error) {
    console.error("DELETE INVESTMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete investment."
    });
  }
};


// Export Controllers
module.exports = {
  getClients,
  getAdvisors,
  getMyAdvisor,
  assignAdvisor,
  addInvestment,
  getAllInvestments,
  updateInvestment,
  deleteInvestment
};