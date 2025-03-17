import express from "express";
import { TemplateController } from "../controllers/templateController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const templateController = new TemplateController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Get all templates
router.get("/", templateController.getAllTemplates);

// Get template by ID
router.get("/:id", templateController.getTemplateById);

// Create a new template (admin only)
router.post("/", templateController.createTemplate);

// Update a template (admin only)
router.put("/:id", templateController.updateTemplate);

// Delete a template (admin only)
router.delete("/:id", templateController.deleteTemplate);

export default router;
