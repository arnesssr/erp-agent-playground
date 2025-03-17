import express from "express";
import agentRoutes from "./agentRoutes";
import templateRoutes from "./templateRoutes";

const router = express.Router();

// API routes
router.use("/api/agents", agentRoutes);
router.use("/api/templates", templateRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;
