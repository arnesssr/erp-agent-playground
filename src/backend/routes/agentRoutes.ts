import express from "express";
import { AgentController } from "../controllers/agentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const agentController = new AgentController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all agents
router.get("/", agentController.getAllAgents);

// Get agent by ID
router.get("/:id", agentController.getAgentById);

// Create a new agent
router.post("/", agentController.createAgent);

// Update an agent
router.put("/:id", agentController.updateAgent);

// Delete an agent
router.delete("/:id", agentController.deleteAgent);

// Run agent simulation
router.post("/:id/simulate", agentController.runAgentSimulation);

// Deploy agent
router.post("/:id/deploy", agentController.deployAgent);

export default router;
