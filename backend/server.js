
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const adminInvestmentRoutes = require("./routes/adminInvestmentRoutes");
const advisorRoutes = require("./routes/advisorRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();

// Security
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Body Parsers
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// Rate Limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 200
}));

// Home API
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Financial Advisor API is running"
  });
});

// Database Health Check
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.status(200).json({
      api: "OK",
      database: "Connected"
    });
  } catch (error) {
    console.error("Database health check failed:", error.message);

    res.status(500).json({
      api: "OK",
      database: "Disconnected"
    });
  }
});

// Application Routes
app.use("/api/auth", authRoutes);
app.use("/api/investments", investmentRoutes);
app.use("/api/admin/investments", adminInvestmentRoutes);
app.use("/api/advisor", advisorRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/services", serviceRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found."
  });
});

// Global Error Handler
app.use((error, req, res, next) => {
  console.error("GLOBAL ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
