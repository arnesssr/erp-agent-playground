import { Tool } from "langchain/tools";
import { z } from "zod";

export interface IntegrationMetadata {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  category: string;
  requiredCredentials: string[];
  website: string;
  documentationUrl: string;
}

export abstract class Integration {
  public metadata: IntegrationMetadata;

  constructor(metadata: IntegrationMetadata) {
    this.metadata = metadata;
  }

  // Initialize the integration with credentials
  abstract initialize(credentials: Record<string, string>): Promise<boolean>;

  // Get tools provided by this integration
  abstract getTools(): Tool[];

  // Validate credentials for this integration
  abstract validateCredentials(
    credentials: Record<string, string>,
  ): Promise<boolean>;

  // Test connection to ensure integration is working
  abstract testConnection(): Promise<boolean>;
}

export class IntegrationRegistry {
  private integrations: Map<string, typeof Integration> = new Map();
  private initializedIntegrations: Map<string, Integration> = new Map();

  constructor() {
    // In a real implementation, this would load built-in integrations
  }

  // Register a new integration class
  public registerIntegration(integrationClass: typeof Integration): boolean {
    try {
      // Create a temporary instance to get metadata
      const tempInstance = new (integrationClass as any)();

      this.integrations.set(tempInstance.metadata.id, integrationClass);
      console.log(`Registered integration: ${tempInstance.metadata.name}`);
      return true;
    } catch (error) {
      console.error("Failed to register integration:", error);
      return false;
    }
  }

  // Get all available integrations
  public getAvailableIntegrations(): IntegrationMetadata[] {
    const metadataList: IntegrationMetadata[] = [];

    for (const [id, integrationClass] of this.integrations.entries()) {
      try {
        const tempInstance = new (integrationClass as any)();
        metadataList.push(tempInstance.metadata);
      } catch (error) {
        console.error(`Error getting metadata for integration ${id}:`, error);
      }
    }

    return metadataList;
  }

  // Initialize an integration with credentials
  public async initializeIntegration(
    integrationId: string,
    credentials: Record<string, string>,
  ): Promise<Integration | null> {
    const integrationClass = this.integrations.get(integrationId);

    if (!integrationClass) {
      console.error(`Integration ${integrationId} not found`);
      return null;
    }

    try {
      const integration = new (integrationClass as any)();
      const success = await integration.initialize(credentials);

      if (success) {
        this.initializedIntegrations.set(integrationId, integration);
        return integration;
      } else {
        console.error(`Failed to initialize integration ${integrationId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error initializing integration ${integrationId}:`, error);
      return null;
    }
  }

  // Get an initialized integration by ID
  public getIntegration(integrationId: string): Integration | null {
    return this.initializedIntegrations.get(integrationId) || null;
  }

  // Get all tools from initialized integrations
  public getAllTools(): Tool[] {
    let tools: Tool[] = [];

    for (const integration of this.initializedIntegrations.values()) {
      tools = tools.concat(integration.getTools());
    }

    return tools;
  }

  // Get tools from a specific integration
  public getToolsForIntegration(integrationId: string): Tool[] {
    const integration = this.initializedIntegrations.get(integrationId);
    return integration ? integration.getTools() : [];
  }
}

// Singleton instance of integration registry
export const integrationRegistry = new IntegrationRegistry();
