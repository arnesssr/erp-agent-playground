# Integration Framework

The Integration Framework is a custom framework for connecting AI agents to external services and APIs. It provides a standardized way to define, initialize, and use integrations within the AI Agent Playground.

## Overview

The Integration Framework allows users to connect their agents to various external services such as CRM systems, databases, and APIs. It provides a registry of available integrations, a way to initialize integrations with credentials, and a way to get tools from integrations for use in agents.

## Key Components

### Integration

The `Integration` abstract class is the base class for all integrations. It defines the interface that all integrations must implement:

```typescript
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
```

### IntegrationMetadata

The `IntegrationMetadata` interface defines the metadata for an integration:

```typescript
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
```

### IntegrationRegistry

The `IntegrationRegistry` class manages the registration and initialization of integrations:

```typescript
export class IntegrationRegistry {
  private integrations: Map<string, typeof Integration> = new Map();
  private initializedIntegrations: Map<string, Integration> = new Map();

  // Register a new integration class
  public registerIntegration(integrationClass: typeof Integration): boolean;

  // Get all available integrations
  public getAvailableIntegrations(): IntegrationMetadata[];

  // Initialize an integration with credentials
  public async initializeIntegration(
    integrationId: string,
    credentials: Record<string, string>,
  ): Promise<Integration | null>;

  // Get an initialized integration by ID
  public getIntegration(integrationId: string): Integration | null;

  // Get all tools from initialized integrations
  public getAllTools(): Tool[];

  // Get tools from a specific integration
  public getToolsForIntegration(integrationId: string): Tool[];
}
```

## Available Integrations

The AI Agent Playground includes several built-in integrations:

- **Notion**: Connect to Notion databases and pages
- **Google Sheets**: Read and write data to Google Sheets
- **Salesforce**: Access Salesforce CRM data
- **Slack**: Send messages and interact with Slack
- **Jira**: Manage Jira issues and projects

## Usage

1. Register an integration with the registry:

```typescript
import { integrationRegistry } from "../lib/integrations/integration-framework";
import { NotionIntegration } from "../integrations/notion";

integrationRegistry.registerIntegration(NotionIntegration);
```

2. Initialize an integration with credentials:

```typescript
const notionIntegration = await integrationRegistry.initializeIntegration(
  "notion",
  { notionApiKey: "your-api-key-here" }
);
```

3. Get tools from an integration:

```typescript
const notionTools = integrationRegistry.getToolsForIntegration("notion");
```

4. Use tools in an agent:

```typescript
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAI } from "@langchain/openai";

const llm = new OpenAI({ temperature: 0 });
const tools = integrationRegistry.getAllTools();

const executor = await initializeAgentExecutorWithOptions(tools, llm, {
  agentType: "structured-chat-zero-shot-react-description",
});
```

## Creating Custom Integrations

Users can create custom integrations by extending the `Integration` abstract class:

```typescript
import { Integration, IntegrationMetadata } from "../lib/integrations/integration-framework";
import { Tool } from "langchain/tools";

export class CustomIntegration extends Integration {
  constructor() {
    const metadata: IntegrationMetadata = {
      id: "custom",
      name: "Custom Integration",
      description: "A custom integration",
      logoUrl: "https://example.com/logo.png",
      category: "custom",
      requiredCredentials: ["apiKey"],
      website: "https://example.com",
      documentationUrl: "https://example.com/docs",
    };
    super(metadata);
  }

  async initialize(credentials: Record<string, string>): Promise<boolean> {
    // Initialize the integration with credentials
    return true;
  }

  getTools(): Tool[] {
    // Return tools provided by this integration
    return [];
  }

  async validateCredentials(credentials: Record<string, string>): Promise<boolean> {
    // Validate credentials
    return true;
  }

  async testConnection(): Promise<boolean> {
    // Test connection
    return true;
  }
}
```

## API Reference

- `Integration`: Abstract class for integrations
- `IntegrationMetadata`: Interface for integration metadata
- `IntegrationRegistry`: Class for managing integrations
- `integrationRegistry`: Singleton instance of the registry
