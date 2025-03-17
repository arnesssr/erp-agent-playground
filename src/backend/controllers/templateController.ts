import { Request, Response } from "express";
import { TemplateService } from "../services/templateService";

export class TemplateController {
  private templateService: TemplateService;

  constructor() {
    this.templateService = new TemplateService();
  }

  // Get all templates
  public getAllTemplates = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const templates = await this.templateService.getAllTemplates();
      res.status(200).json(templates);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get template by ID
  public getTemplateById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const template = await this.templateService.getTemplateById(id);

      if (!template) {
        res.status(404).json({ error: "Template not found" });
        return;
      }

      res.status(200).json(template);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Create a new template
  public createTemplate = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const templateData = req.body;
      const newTemplate =
        await this.templateService.createTemplate(templateData);
      res.status(201).json(newTemplate);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update a template
  public updateTemplate = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const templateData = req.body;
      const updatedTemplate = await this.templateService.updateTemplate(
        id,
        templateData,
      );

      if (!updatedTemplate) {
        res.status(404).json({ error: "Template not found" });
        return;
      }

      res.status(200).json(updatedTemplate);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Delete a template
  public deleteTemplate = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.templateService.deleteTemplate(id);

      if (!success) {
        res.status(404).json({ error: "Template not found" });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
