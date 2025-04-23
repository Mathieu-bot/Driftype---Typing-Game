import express from "express";
import cors from "cors";
import sql from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { backupData, restoreData } from "./utils/backup/backupManager.js";
import "dotenv/config";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5500",
      "http://localhost:5500",
      "https://ma-driftype.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json({ limit: "10kb" }));

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/stats", statRoutes);

app.use("/api/user", userRoutes);

// Healthcheck
app.get("/api/status", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// Test DB
const testDatabaseConnection = async () => {
  try {
    const [result] = await sql`SELECT NOW()`;
    console.log("Database connected at:", result.now);
    return true;
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

// Error Handlers (404)
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
});

// Start Server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await testDatabaseConnection();

  // Restore database
  await restoreData();

  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Handle graceful shutdown
  const handleShutdown = async () => {
    console.log("Server shutting down...");
    await backupData();
    server.close(() => {
      console.log("Server stopped");
      process.exit(0);
    });
  };

  // Handle signals
  process.on("SIGTERM", handleShutdown);
  process.on("SIGINT", handleShutdown);
};

startServer();
