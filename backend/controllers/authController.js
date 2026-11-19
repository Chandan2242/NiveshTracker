
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../config/db");

// ================= REGISTER =================
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters."
      });
    }

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1",
      [email.trim().toLowerCase(), phone]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email or mobile number already registered."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.query(
      `INSERT INTO users (name, email, phone, password_hash, role)
       VALUES (?, ?, ?, ?, 'client')`,
      [name.trim(), email.trim().toLowerCase(), phone, passwordHash]
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      userId: result.insertId
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again."
    });
  }
};


// ================= LOGIN =================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    const [users] = await pool.query(
      `SELECT id, name, email, phone, password_hash, role, status
       FROM users WHERE email = ? LIMIT 1`,
      [email.trim().toLowerCase()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const user = users[0];

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: "Your account is suspended. Contact support."
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again."
    });
  }
};


// ================= GET ME =================
const getMe = async (req, res) => {
  try {
    const [users] = await pool.query(
      `SELECT id, name, email, phone, role, status, created_at
       FROM users WHERE id = ? LIMIT 1`,
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    const [phoneHistory] = await pool.query(
      `SELECT phone, created_at
       FROM user_phone_history
       WHERE user_id = ?
       ORDER BY id DESC`,
      [req.user.id]
    );

    return res.status(200).json({
      success: true,
      user: users[0],
      phoneHistory
    });

  } catch (error) {
    console.error("Profile error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch user profile."
    });
  }
};


// ================= ADD NEW MOBILE NUMBER =================
const addMobileNumber = async (req, res) => {
  let connection;
  let transactionStarted = false;

  try {
    const userId = req.user.id;
    const phone = String(req.body.phone || "").trim();

    if (!/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number."
      });
    }

    connection = await pool.getConnection();

    await connection.beginTransaction();
    transactionStarted = true;

    const [users] = await connection.execute(
      `SELECT id, phone
       FROM users
       WHERE id = ?
       FOR UPDATE`,
      [userId]
    );

    if (users.length === 0) {
      await connection.rollback();
      transactionStarted = false;

      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    const oldPhone = users[0].phone;

    if (oldPhone === phone) {
      await connection.rollback();
      transactionStarted = false;

      return res.status(400).json({
        success: false,
        message: "This is already your current mobile number."
      });
    }

    const [existingUsers] = await connection.execute(
      `SELECT id
       FROM users
       WHERE phone = ? AND id != ?
       LIMIT 1`,
      [phone, userId]
    );

    if (existingUsers.length > 0) {
      await connection.rollback();
      transactionStarted = false;

      return res.status(409).json({
        success: false,
        message: "This mobile number is already registered."
      });
    }

    if (oldPhone) {
      await connection.execute(
        `INSERT INTO user_phone_history (user_id, phone)
         VALUES (?, ?)`,
        [userId, oldPhone]
      );
    }

    await connection.execute(
      "UPDATE users SET phone = ? WHERE id = ?",
      [phone, userId]
    );

    const [updatedUsers] = await connection.execute(
      `SELECT id, name, email, phone, role, status, created_at
       FROM users
       WHERE id = ?`,
      [userId]
    );

    const [phoneHistory] = await connection.execute(
      `SELECT phone, created_at
       FROM user_phone_history
       WHERE user_id = ?
       ORDER BY id DESC`,
      [userId]
    );

    await connection.commit();
    transactionStarted = false;

    return res.status(200).json({
      success: true,
      message: "Mobile number updated successfully.",
      user: updatedUsers[0],
      phoneHistory
    });

  } catch (error) {
    if (connection && transactionStarted) {
      await connection.rollback();
    }

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This mobile number is already registered."
      });
    }

    console.error("Add mobile number error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update mobile number."
    });

  } finally {
    if (connection) {
      connection.release();
    }
  }
};


// ================= CHANGE PASSWORD =================
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required."
      });
    }

    if (
      typeof newPassword !== "string" ||
      newPassword.length < 8
    ) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters."
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match."
      });
    }

    const [users] = await pool.query(
      "SELECT password_hash FROM users WHERE id = ? LIMIT 1",
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      users[0].password_hash
    );

    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect."
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password."
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    await pool.query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [newPasswordHash, req.user.id]
    );

    return res.status(200).json({
      success: true,
      message: "Password changed successfully."
    });

  } catch (error) {
    console.error("Change password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to change password."
    });
  }
};


// ================= FORGOT PASSWORD =================
const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required."
      });
    }

    const [users] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email."
      });
    }

    const userId = users[0].id;
    const otp = crypto.randomInt(100000, 1000000).toString();
    const otpHash = await bcrypt.hash(otp, 10);

    await pool.query(
      `UPDATE password_reset_otps
       SET used_at = NOW()
       WHERE user_id = ? AND used_at IS NULL`,
      [userId]
    );

    await pool.query(
      `INSERT INTO password_reset_otps
       (user_id, otp_hash, expires_at)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))`,
      [userId, otpHash]
    );

    if (process.env.NODE_ENV !== "production") {
      console.log(`PASSWORD RESET OTP for ${email}: ${otp}`);
    }

    return res.status(200).json({
      success: true,
      message: "OTP generated. Check backend terminal in development mode."
    });

  } catch (error) {
    console.error("Forgot password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to generate OTP."
    });
  }
};


// ================= VERIFY RESET OTP =================
const verifyResetOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required."
      });
    }

    const [users] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request."
      });
    }

    const [records] = await pool.query(
      `SELECT * FROM password_reset_otps
       WHERE user_id = ?
       AND used_at IS NULL
       ORDER BY id DESC LIMIT 1`,
      [users[0].id]
    );

    if (records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found. Request a new OTP."
      });
    }

    const record = records[0];

    if (new Date(record.expires_at) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired. Request a new OTP."
      });
    }

    if (record.attempts >= 5) {
      return res.status(429).json({
        success: false,
        message: "Too many attempts. Request a new OTP."
      });
    }

    const validOtp = await bcrypt.compare(
      otp.toString(),
      record.otp_hash
    );

    if (!validOtp) {
      await pool.query(
        "UPDATE password_reset_otps SET attempts = attempts + 1 WHERE id = ?",
        [record.id]
      );

      return res.status(400).json({
        success: false,
        message: "Incorrect OTP."
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await pool.query(
      `UPDATE password_reset_otps
       SET verified = 1,
           reset_token_hash = ?,
           reset_expires_at = DATE_ADD(NOW(), INTERVAL 10 MINUTE)
       WHERE id = ?`,
      [resetTokenHash, record.id]
    );

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully.",
      resetToken
    });

  } catch (error) {
    console.error("OTP verification error:", error.message);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed."
    });
  }
};


// ================= RESET PASSWORD =================
const resetPassword = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { resetToken, password } = req.body;

    if (!email || !resetToken || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, reset token and new password are required."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters."
      });
    }

    const [users] = await pool.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (users.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid reset request."
      });
    }

    const tokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const [records] = await pool.query(
      `SELECT id FROM password_reset_otps
       WHERE user_id = ?
       AND verified = 1
       AND reset_token_hash = ?
       AND reset_expires_at > NOW()
       AND used_at IS NULL
       ORDER BY id DESC LIMIT 1`,
      [users[0].id, tokenHash]
    );

    if (records.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await pool.query(
      "UPDATE users SET password_hash = ? WHERE id = ?",
      [passwordHash, users[0].id]
    );

    await pool.query(
      "UPDATE password_reset_otps SET used_at = NOW() WHERE id = ?",
      [records[0].id]
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now login."
    });

  } catch (error) {
    console.error("Reset password error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to reset password."
    });
  }
};


// ================= GET ALL ADVISORS =================
const getAdvisors = async (req, res) => {
  try {
    const [advisors] = await pool.execute(
      `SELECT
         a.id,
         a.name,
         a.email,
         a.phone,
         a.status,
         a.created_at,
         COUNT(c.id) AS assigned_clients
       FROM users a
       LEFT JOIN users c
         ON c.advisor_id = a.id
         AND c.role = 'client'
       WHERE a.role = 'advisor'
       GROUP BY
         a.id,
         a.name,
         a.email,
         a.phone,
         a.status,
         a.created_at
       ORDER BY a.created_at DESC`
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


// ================= SEARCH REGISTERED CLIENTS =================
const getAdvisorCandidates = async (req, res) => {
  try {
    const email = String(req.query.email || "")
      .trim()
      .toLowerCase();

    if (!email || email.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Enter at least 3 characters of the email address."
      });
    }

    const [users] = await pool.execute(
      `SELECT id, name, email, phone, role, status
       FROM users
       WHERE role = 'client'
         AND status = 'active'
         AND email LIKE ?
       ORDER BY name ASC
       LIMIT 20`,
      [`%${email}%`]
    );

    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    console.error("SEARCH ADVISOR CANDIDATES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to search registered users."
    });
  }
};


// ================= PROMOTE CLIENT TO ADVISOR =================
const promoteUserToAdvisor = async (req, res) => {
  let connection;
  let transactionStarted = false;

  try {
    const userId = Number(req.params.id);

    if (!Number.isSafeInteger(userId) || userId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID."
      });
    }

    connection = await pool.getConnection();

    await connection.beginTransaction();
    transactionStarted = true;

    const [users] = await connection.execute(
      `SELECT id, name, email, role, status
       FROM users
       WHERE id = ?
       FOR UPDATE`,
      [userId]
    );

    if (users.length === 0) {
      await connection.rollback();
      transactionStarted = false;

      return res.status(404).json({
        success: false,
        message: "Registered user not found."
      });
    }

    const user = users[0];

    if (user.role !== "client") {
      await connection.rollback();
      transactionStarted = false;

      return res.status(409).json({
        success: false,
        message: "Only registered clients can be promoted to Advisor."
      });
    }

    if (user.status !== "active") {
      await connection.rollback();
      transactionStarted = false;

      return res.status(403).json({
        success: false,
        message: "Suspended users cannot become Advisors."
      });
    }

    await connection.execute(
      `UPDATE users
       SET role = 'advisor',
           advisor_id = NULL
       WHERE id = ?`,
      [userId]
    );

    await connection.commit();
    transactionStarted = false;

    return res.status(200).json({
      success: true,
      message: `${user.name} has been promoted to Advisor successfully.`,
      advisor: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: "advisor"
      }
    });

  } catch (error) {
    if (connection && transactionStarted) {
      await connection.rollback();
    }

    console.error("PROMOTE ADVISOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to promote user to Advisor."
    });

  } finally {
    if (connection) {
      connection.release();
    }
  }
};


// ================= REMOVE ADVISOR PRIVILEGE =================
const removeAdvisor = async (req, res) => {
  let connection;
  let transactionStarted = false;

  try {
    const advisorId = Number(req.params.id);

    if (!Number.isSafeInteger(advisorId) || advisorId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid Advisor ID."
      });
    }

    connection = await pool.getConnection();

    await connection.beginTransaction();
    transactionStarted = true;

    const [advisors] = await connection.execute(
      `SELECT id, name, email, role
       FROM users
       WHERE id = ?
       FOR UPDATE`,
      [advisorId]
    );

    if (advisors.length === 0) {
      await connection.rollback();
      transactionStarted = false;

      return res.status(404).json({
        success: false,
        message: "Advisor not found."
      });
    }

    const advisor = advisors[0];

    if (advisor.role !== "advisor") {
      await connection.rollback();
      transactionStarted = false;

      return res.status(409).json({
        success: false,
        message: "This user is not an Advisor."
      });
    }

    const [clients] = await connection.execute(
      `SELECT COUNT(*) AS total
       FROM users
       WHERE advisor_id = ?
         AND role = 'client'`,
      [advisorId]
    );

    const assignedClients = Number(clients[0].total);

    if (assignedClients > 0) {
      await connection.rollback();
      transactionStarted = false;

      return res.status(409).json({
        success: false,
        message: `This Advisor has ${assignedClients} assigned client(s). Reassign or unassign those clients before removing Advisor privileges.`,
        assigned_clients: assignedClients
      });
    }

    await connection.execute(
      `UPDATE users
       SET role = 'client',
           advisor_id = NULL
       WHERE id = ?`,
      [advisorId]
    );

    await connection.commit();
    transactionStarted = false;

    return res.status(200).json({
      success: true,
      message: `${advisor.name} is now a Client. Their account and login credentials have not been deleted.`,
      user: {
        id: advisor.id,
        name: advisor.name,
        email: advisor.email,
        role: "client"
      }
    });

  } catch (error) {
    if (connection && transactionStarted) {
      await connection.rollback();
    }

    console.error("REMOVE ADVISOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to remove Advisor privileges."
    });

  } finally {
    if (connection) {
      connection.release();
    }
  }
};


// ================= CREATE ADVISOR (LEGACY) =================
const createAdvisor = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone and password are required."
      });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters."
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid email address."
      });
    }

    if (!/^[0-9]{10}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid 10-digit mobile number."
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters."
      });
    }

    const [existingUsers] = await pool.execute(
      "SELECT id FROM users WHERE email = ? OR phone = ? LIMIT 1",
      [cleanEmail, cleanPhone]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Email or mobile number already registered."
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `INSERT INTO users
       (name, email, phone, password_hash, role, status)
       VALUES (?, ?, ?, ?, 'advisor', 'active')`,
      [cleanName, cleanEmail, cleanPhone, passwordHash]
    );

    return res.status(201).json({
      success: true,
      message: "Advisor account created successfully.",
      userId: result.insertId
    });

  } catch (error) {
    console.error("CREATE ADVISOR ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create advisor account."
    });
  }
};


// ================= GET ALL USERS (ADMIN ONLY) =================
const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.execute(
      `SELECT id, name, email, phone, role, status, created_at
       FROM users
       ORDER BY created_at DESC`
    );

    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });

  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch users."
    });
  }
};


// ================= EXPORTS =================
module.exports = {
  register,
  login,
  getMe,
  addMobileNumber,
  changePassword,
  forgotPassword,
  verifyResetOtp,
  resetPassword,

  // Advisor Management
  getAdvisors,
  getAdvisorCandidates,
  promoteUserToAdvisor,
  removeAdvisor,

  // Existing functions
  createAdvisor,
  getAllUsers
};
