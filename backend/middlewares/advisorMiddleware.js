
const pool = require("../config/db");

const advisorOnly = async (req, res, next) => {
  try {
    const [users] = await pool.execute(
      `SELECT id, role, status
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found."
      });
    }

    const user = users[0];

    if (user.role !== "advisor" || user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Active advisor account required."
      });
    }

    next();
  } catch (error) {
    console.error("ADVISOR MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify advisor access."
    });
  }
};

module.exports = { advisorOnly };
