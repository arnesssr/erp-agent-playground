# Code Editor

The Code Editor allows users to customize agent behavior and logic by writing code directly in the AI Agent Playground.

## Overview

The Code Editor provides a full-featured code editing experience with syntax highlighting, code completion, and error checking. Users can write custom code to extend the functionality of their agents beyond what is possible with the visual workflow designer.

## Features

- **Syntax Highlighting**: Colorizes code for better readability
- **Multiple Files**: Edit multiple files in tabs
- **Run Code**: Execute code directly in the editor
- **Save Changes**: Save code changes to the agent
- **Console Output**: View console output from code execution

## Supported Languages

- **TypeScript**: Primary language for agent development
- **JavaScript**: Alternative to TypeScript
- **JSON**: For configuration files

## File Types

- **main.ts**: Main entry point for the agent
- **setup.ts**: Configuration and initialization code
- **agent-playground.ts**: Express server for agent API
- **client.tsx**: React frontend for agent interaction
- **package.json**: Project configuration

## Usage

1. Open the Code Editor by selecting the "Code Editor" tab in the agent development interface
2. Select a file to edit from the tabs at the top of the editor
3. Write or modify code in the editor
4. Run the code using the "Run" button
5. View the output in the console tab
6. Save changes using the "Save" button

## Example

```typescript
// Example code for a simple agent
import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { StructuredTool } from "langchain/tools";

// Initialize the LLM
const llm = new OpenAI({
  temperature: 0,
  modelName: "gpt-4",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Define custom tool for inventory queries
class InventoryTool extends StructuredTool {
  name = "inventory_query";
  description = "Query inventory levels for a specific product";
  
  async _call({ productId }) {
    console.log(`Querying inventory for product: ${productId}`);
    // Implementation details
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
  const tools = [
    new InventoryTool(),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  return executor;
}
```

## API Reference

- `CodeEditor`: The main component for the code editor
- `handleCodeChange`: Function to handle code changes
- `handleRun`: Function to execute code
- `handleSave`: Function to save code changes
