import { AgentNode, AgentEdge } from "./Agent";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  authorName: string;
  isOfficial: boolean;
  popularity: number;
  nodes: AgentNode[];
  edges: AgentEdge[];
  code: Record<string, string>;
  defaultModelConfig: {
    provider: string;
    modelName: string;
  };
  requiredIntegrations: string[];
}

export enum TemplateCategory {
  INVOICE_PROCESSING = "invoice_processing",
  CUSTOMER_SUPPORT = "customer_support",
  INVENTORY_MANAGEMENT = "inventory_management",
  SALES_AUTOMATION = "sales_automation",
  DATA_ANALYSIS = "data_analysis",
  GENERAL = "general",
}
