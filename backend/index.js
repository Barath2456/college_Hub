require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");

// Route Imports
const authRoutes = require("./routes/authRoutes");
const { register, login } = require("./controllers/authController");
const collegeRoutes = require("./routes/collegeRoutes");
const compareRoutes = require("./routes/compareRoutes");
const savedRoutes = require("./routes/savedRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for Next.js Frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// Route mounting
app.use("/api/auth", authRoutes);
// Legacy/direct auth paths (same handlers as /api/auth/*)
app.post("/api/register", register);
app.post("/api/login", login);
app.use("/api/colleges", collegeRoutes);
app.use("/api/compare", compareRoutes);
// Mount saved routes at /api, giving endpoints: /api/save/:collegeId & /api/saved
app.use("/api", savedRoutes);

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler (must be defined last)
app.use(errorHandler);

// Start the Express Server
app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(` College Discovery Platform API Server   `);
  console.log(` Running on port: ${PORT}                `);
  console.log(` Environment: ${process.env.NODE_ENV || "development"} `);
  console.log(`=========================================`);
});
