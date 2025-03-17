import { v4 as uuidv4 } from "uuid";
import { Template, TemplateCategory } from "../models/Template";

// Mock database for demo purposes
let templates: Template[] = [
  {
    id: "1",
    name: "Invoice Processing Agent",
    description: "Automate invoice processing with AI",
    category: TemplateCategory.INVOICE_PROCESSING,
    tags: ["invoice", "finance", "automation"],
    thumbnail:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20"),
    authorId: "system",
    authorName: "AI Agent Playground",
    isOfficial: true,
    popularity: 4.8,
    nodes: [
      {
        id: "1",
        type: "trigger",
        position: { x: 100, y: 100 },
        data: {
          label: "New Invoice",
          description: "Triggers when a new invoice is received",
        },
      },
      {
        id: "2",
        type: "action",
        position: { x: 100, y: 250 },
        data: {
          label: "Extract Data",
          description: "Extracts data from invoice",
        },
      },
      {
        id: "3",
        type: "condition",
        position: { x: 100, y: 400 },
        data: {
          label: "Validate Invoice",
          description: "Checks if invoice is valid",
        },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
    ],
    code: {
      "main.ts":
        '// Invoice processing logic\nconsole.log("Processing invoice...");',
    },
    defaultModelConfig: {
      provider: "openai",
      modelName: "gpt-4",
    },
    requiredIntegrations: [],
  },
  {
    id: "2",
    name: "Customer Support Agent",
    description: "AI-powered customer support automation",
    category: TemplateCategory.CUSTOMER_SUPPORT,
    tags: ["support", "customer", "chat"],
    thumbnail:
      "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=500&q=80",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-07-15"),
    authorId: "system",
    authorName: "AI Agent Playground",
    isOfficial: true,
    popularity: 4.6,
    nodes: [
      {
        id: "1",
        type: "trigger",
        position: { x: 100, y: 100 },
        data: {
          label: "Customer Message",
          description: "Triggers when a customer sends a message",
        },
      },
      {
        id: "2",
        type: "action",
        position: { x: 100, y: 250 },
        data: {
          label: "Analyze Intent",
          description: "Analyzes customer intent",
        },
      },
      {
        id: "3",
        type: "action",
        position: { x: 100, y: 400 },
        data: {
          label: "Generate Response",
          description: "Generates a response to the customer",
        },
      },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
    ],
    code: {
      "main.ts":
        '// Customer support logic\nconsole.log("Analyzing customer message...");',
    },
    defaultModelConfig: {
      provider: "openai",
      modelName: "gpt-3.5-turbo",
    },
    requiredIntegrations: ["slack"],
  },
];

export class TemplateService {
  // Get all templates
  public async getAllTemplates(): Promise<Template[]> {
    return templates;
  }

  // Get template by ID
  public async getTemplateById(id: string): Promise<Template | null> {
    const template = templates.find((t) => t.id === id);
    return template || null;
  }

  // Create a new template
  public async createTemplate(
    templateData: Partial<Template>,
  ): Promise<Template> {
    const newTemplate: Template = {
      id: uuidv4(),
      name: templateData.name || "New Template",
      description: templateData.description || "",
      category: templateData.category || TemplateCategory.GENERAL,
      tags: templateData.tags || [],
      thumbnail:
        templateData.thumbnail ||
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80",
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: templateData.authorId || "system",
      authorName: templateData.authorName || "AI Agent Playground",
      isOfficial: templateData.isOfficial || false,
      popularity: 0,
      nodes: templateData.nodes || [],
      edges: templateData.edges || [],
      code: templateData.code || {},
      defaultModelConfig: templateData.defaultModelConfig || {
        provider: "openai",
        modelName: "gpt-3.5-turbo",
      },
      requiredIntegrations: templateData.requiredIntegrations || [],
    };

    templates.push(newTemplate);
    return newTemplate;
  }

  // Update a template
  public async updateTemplate(
    id: string,
    templateData: Partial<Template>,
  ): Promise<Template | null> {
    const index = templates.findIndex((t) => t.id === id);

    if (index === -1) {
      return null;
    }

    const updatedTemplate = {
      ...templates[index],
      ...templateData,
      updatedAt: new Date(),
    };

    templates[index] = updatedTemplate;
    return updatedTemplate;
  }

  // Delete a template
  public async deleteTemplate(id: string): Promise<boolean> {
    const initialLength = templates.length;
    templates = templates.filter((t) => t.id !== id);
    return templates.length < initialLength;
  }
}
