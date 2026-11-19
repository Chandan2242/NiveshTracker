
const pool = require("../config/db");

// ================= GET ASSIGNED REGISTERED CLIENTS =================
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


// ================= GET ONE ASSIGNED CLIENT =================
const getClientDetails = async (req, res) => {
  try {
    const clientId = Number(req.params.clientId);

    if (!Number.isSafeInteger(clientId) || clientId <= 0) {
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


// ================= GET ASSIGNED CLIENT INVESTMENTS =================
const getClientInvestments = async (req, res) => {
  try {
    const clientId = Number(req.params.clientId);

    if (!Number.isSafeInteger(clientId) || clientId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid client ID."
      });
    }

    // Verify client belongs to logged-in Advisor
    const [clients] = await pool.execute(
      `SELECT
        id,
        name,
        email,
        phone,
        status
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

    const client = clients[0];

    // Fetch investments using verified registered user ID
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
      client,
      registered_account: true,
      user_id: clientId,
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


// ================= ADVISOR DASHBOARD STATS =================
const getDashboardStats = async (req, res) => {
  try {
    // Assigned registered clients
    const [[clientStats]] = await pool.execute(
      `SELECT
        COUNT(*) AS total_clients,
        COALESCE(SUM(status = 'active'), 0) AS active_clients,
        COALESCE(SUM(status = 'suspended'), 0) AS suspended_clients
      FROM users
      WHERE advisor_id = ?
        AND role = 'client'`,
      [req.user.id]
    );

    // Investments of assigned registered clients only
    const [[investmentStats]] = await pool.execute(
      `SELECT
        COUNT(i.id) AS total_investments,
        COALESCE(SUM(i.invested_amount), 0) AS total_invested
      FROM users u
      INNER JOIN investments i
        ON i.user_id = u.id
      WHERE u.advisor_id = ?
        AND u.role = 'client'`,
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


// ================= EXPORTS =================
module.exports = {
  getMyClients,
  getClientDetails,
  getClientInvestments,
  getDashboardStats
};
