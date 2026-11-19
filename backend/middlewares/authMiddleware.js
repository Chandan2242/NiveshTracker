
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

// ================= PROTECT MIDDLEWARE =================
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Token missing."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
};

// ================= ADMIN ONLY MIDDLEWARE =================
const adminOnly = async (req, res, next) => {
  try {
    const [users] = await pool.execute(
      `SELECT id, role, status
       FROM users
       WHERE id = ?
       LIMIT 1`,
      [req.user.id]
    );

    if (
      users.length === 0 ||
      users[0].role !== "admin" ||
      users[0].status !== "active"
    ) {
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

module.exports = {
  protect,
  adminOnly
};
