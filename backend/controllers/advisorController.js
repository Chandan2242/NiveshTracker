
const pool = require("../config/db");

// Get all clients assigned to the logged-in advisor
const getMyClients = async (req, res) => {
  try {
    const [clients] = await pool.execute(
      `SELECT
        id,
        name,
        email,
        phone,
        status,
        created_at
      FROM users
      WHERE advisor_id = ?
        AND role = 'client'
      ORDER BY created_at DESC`,
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      count: clients.length,
      clients
    });
  } catch (error) {
    console.error("GET ADVISOR CLIENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch assigned clients."
    });
  }
};

// Get details of one assigned client
const getClientDetails = async (req, res) => {
  try {
    const clientId = Number(req.params.clientId);

    if (!Number.isInteger(clientId) || clientId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID."
      });
    }

    const [clients] = await pool.execute(
      `SELECT
        id,
        name,
        email,
        phone,
        role,
        status,
        created_at
      FROM users
      WHERE id = ?
        AND advisor_id = ?
        AND role = 'client'
      LIMIT 1`,
      [clientId, req.user.id]
    );

    if (clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Assigned client not found."
      });
    }

    return res.status(200).json({
      success: true,
      client: clients[0]
    });
  } catch (error) {
    console.error("GET ADVISOR CLIENT DETAILS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch client details."
    });
  }
};

// Get investments of one assigned client
const getClientInvestments = async (req, res) => {
  try {
    const clientId = Number(req.params.clientId);

    if (!Number.isInteger(clientId) || clientId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID."
      });
    }

    // Verify that this client belongs to the logged-in advisor
    const [clients] = await pool.execute(
      `SELECT id, name
       FROM users
       WHERE id = ?
         AND advisor_id = ?
         AND role = 'client'
       LIMIT 1`,
      [clientId, req.user.id]
    );

    if (clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Assigned client not found."
      });
    }

    // Fetch only this client's investments
    const [investments] = await pool.execute(
      `SELECT
        id,
        user_id,
        investment_type,
        product_name,
        folio_number,
        invested_amount,
        units,
        purchase_nav,
        investment_date,
        status,
        notes,
        created_at,
        updated_at
      FROM investments
      WHERE user_id = ?
      ORDER BY created_at DESC`,
      [clientId]
    );

    const totalInvested = investments.reduce(
      (total, investment) =>
        total + Number(investment.invested_amount || 0),
      0
    );

    return res.status(200).json({
      success: true,
      client: clients[0],
      count: investments.length,
      total_invested: totalInvested,
      investments
    });
  } catch (error) {
    console.error("GET ADVISOR CLIENT INVESTMENTS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch client investments."
    });
  }
};

// Get dashboard statistics for the logged-in advisor
const getDashboardStats = async (req, res) => {
  try {
    const [[clientStats]] = await pool.execute(
      `SELECT
        COUNT(*) AS total_clients,
        SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_clients,
        SUM(CASE WHEN status = 'suspended' THEN 1 ELSE 0 END) AS suspended_clients
      FROM users
      WHERE advisor_id = ?
        AND role = 'client'`,
      [req.user.id]
    );

    const [[investmentStats]] = await pool.execute(
      `SELECT
        COUNT(investments.id) AS total_investments,
        COALESCE(SUM(investments.invested_amount), 0) AS total_invested
      FROM investments
      INNER JOIN users
        ON investments.user_id = users.id
      WHERE users.advisor_id = ?
        AND users.role = 'client'`,
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      stats: {
        total_clients: Number(clientStats.total_clients || 0),
        active_clients: Number(clientStats.active_clients || 0),
        suspended_clients: Number(clientStats.suspended_clients || 0),
        total_investments: Number(investmentStats.total_investments || 0),
        total_invested: Number(investmentStats.total_invested || 0)
      }
    });
  } catch (error) {
    console.error("GET ADVISOR DASHBOARD ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch advisor dashboard statistics."
    });
  }
};

module.exports = {
  getMyClients,
  getClientDetails,
  getClientInvestments,
  getDashboardStats
};
