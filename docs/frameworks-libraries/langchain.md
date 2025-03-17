# LangChain

LangChain is a framework for developing applications powered by language models. It provides a set of tools and abstractions for working with language models, including chains, agents, and tools.

## Overview

LangChain is used in the AI Agent Playground to create agents that can interact with ERP systems and other external services. It provides the foundation for building agents that can understand natural language, make decisions, and take actions.

## Key Components

### Language Models

LangChain supports various language models, including:

- OpenAI's GPT models (GPT-3.5, GPT-4)
- Anthropic's Claude models
- Google's Gemini models

### Tools

Tools are functions that agents can use to interact with the world. The AI Agent Playground includes several custom tools for interacting with ERP systems:

- `InventoryTool`: Query inventory levels for products
- `CustomerTool`: Get information about customers
- `OrderTool`: Process and manage orders

### Agents

Agents use language models and tools to accomplish tasks. LangChain provides several agent types:

- `structured-chat-zero-shot-react-description`: Used for most ERP agents
- `openai-functions`: Used for agents that leverage OpenAI's function calling capability

## Usage in the Project

LangChain is used throughout the AI Agent Playground, particularly in the agent implementation files:

- `src/lib/agents/agent-orchestration.ts`: Orchestrates multiple agents
- `src/lib/agents/real-erp-agents.ts`: Implements agents for ERP systems

## Example

```typescript
import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";

// Define a custom tool for inventory queries
class InventoryTool extends StructuredTool {
  name = "inventory_query";
  description = "Query inventory levels for a specific product";
  schema = z.object({
    productId: z.string().describe("The ID of the product to check inventory for"),
  });

  async _call({ productId }: z.infer<typeof this.schema>) {
    // In a real implementation, this would query your inventory database/API
    console.log(`Querying inventory for product: ${productId}`);
    // Mock implementation
    return JSON.stringify({
      productId,
      quantity: Math.floor(Math.random() * 100),
      location: "Warehouse A",
      lastUpdated: new Date().toISOString(),
    });
  }
}

// Create an agent executor
async function createERPAgent() {
  // Initialize the language model
  const llm = new OpenAI({
    temperature: 0,
    modelName: "gpt-4",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // Create tools
  const tools = [
    new InventoryTool(),
  ];

  // Initialize the agent executor
  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  return executor;
}
```

## API Reference

- `OpenAI`: Class for interacting with OpenAI's language models
- `StructuredTool`: Base class for creating custom tools
- `initializeAgentExecutorWithOptions`: Function to create an agent executor
- `z`: Zod schema validation library used for tool schemas

## Resources

- [LangChain Documentation](https://js.langchain.com/docs/)
- [LangChain GitHub Repository](https://github.com/langchain-ai/langchainjs)
