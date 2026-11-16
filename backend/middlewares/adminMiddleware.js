
const pool = require("../config/db");

const adminOnly = async (req, res, next) => {
  try {
    const [users] = await pool.execute(
      "SELECT id, role, status FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User account not found."
      });
    }

    const user = users[0];

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is not active."
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only."
      });
    }

    next();

  } catch (error) {
    console.error("ADMIN MIDDLEWARE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify admin access."
    });
  }
};

module.exports = { adminOnly };
