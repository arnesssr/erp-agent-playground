# Creating Your First Agent

This tutorial will guide you through the process of creating your first agent in the AI Agent Playground.

## Prerequisites

- AI Agent Playground installed and running
- Basic understanding of React and TypeScript
- (Optional) OpenAI API key for using GPT models

## Step 1: Create a New Agent

1. Navigate to the dashboard and click on the "Create Agent" button
2. Enter a name for your agent, e.g., "Invoice Processor"
3. (Optional) Select a template to start with, or choose "Start from scratch"
4. Click "Create"

## Step 2: Add Components to the Canvas

1. In the Component Palette on the left, find the "Trigger" section
2. Drag the "Schedule" trigger onto the canvas
3. Find the "Action" section in the Component Palette
4. Drag the "API Call" action onto the canvas below the trigger
5. Drag the "Transform Data" action onto the canvas below the API Call

## Step 3: Connect the Components

1. Click and drag from the bottom of the Schedule trigger to the top of the API Call action
2. Click and drag from the bottom of the API Call action to the top of the Transform Data action

## Step 4: Configure the Components

1. Click on the Schedule trigger to select it
2. In the Properties Panel on the right, set the schedule to run daily at 9:00 AM
3. Click on the API Call action to select it
4. In the Properties Panel, set the following properties:
   - Method: GET
   - URL: https://api.example.com/invoices
   - Authentication: Bearer Token
   - Token: ${env.API_TOKEN}
5. Click on the Transform Data action to select it
6. In the Properties Panel, add a transformation script to extract invoice data

## Step 5: Add Custom Code

1. Click on the "Code Editor" tab at the top of the screen
2. Select the "main.ts" file
3. Add the following code to process the invoices:

```typescript
import { OpenAI } from "@langchain/openai";
import { StructuredTool } from "langchain/tools";

// Initialize the LLM
const llm = new OpenAI({
  temperature: 0,
  modelName: "gpt-4",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Define custom tool for invoice processing
class InvoiceProcessorTool extends StructuredTool {
  name = "invoice_processor";
  description = "Process invoices and extract data";
  
  async _call({ invoiceData }) {
    console.log(`Processing invoice data: ${invoiceData}`);
    // Implementation details
    return JSON.stringify({
      success: true,
      processedInvoices: invoiceData.length,
      timestamp: new Date().toISOString(),
    });
  }
}

// Create an agent executor
async function createInvoiceAgent() {
  const tools = [
    new InvoiceProcessorTool(),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  return executor;
}
```

## Step 6: Test the Agent

1. Click on the "Simulation" tab at the top of the screen
2. Select the "Invoices (Small)" mock dataset from the dropdown
3. Click the "Run Simulation" button
4. View the logs and results in the Simulation Panel

## Step 7: Deploy the Agent

1. Click the "Save" button in the header
2. Click the "Deploy" button in the header
3. Configure the deployment settings
4. Click "Confirm Deployment"

## Conclusion

Congratulations! You have created your first agent in the AI Agent Playground. This agent will run daily at 9:00 AM, fetch invoices from an API, transform the data, and process the invoices using a custom tool.

## Next Steps

- [Learn how to use templates](./using-templates.md)
- [Create custom components](./custom-components.md)
- [Add integrations to your agent](./custom-integrations.md)
