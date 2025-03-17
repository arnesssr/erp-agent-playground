# Invoice Processing Agent Tutorial

This tutorial will guide you through creating an agent that automates invoice processing using the AI Agent Playground.

## Overview

The Invoice Processing Agent will:

1. Monitor for new invoices in a system
2. Extract data from the invoices
3. Validate the invoice data
4. Update the ERP system with the processed invoice
5. Send notifications for any issues

## Prerequisites

- AI Agent Playground installed and running
- OpenAI API key for using GPT models
- Access to an ERP system API (or use the mock API for testing)

## Step 1: Create a New Agent

1. Navigate to the dashboard and click on the "Create Agent" button
2. Enter "Invoice Processing Agent" as the name
3. Select the "Invoice Processing" template if available, or "Start from scratch"
4. Click "Create"

## Step 2: Set Up the Workflow

### Add and Configure Components

1. **Add a Trigger**:
   - Drag the "Webhook" trigger onto the canvas
   - Configure it to listen for new invoice events

2. **Add an Action to Extract Data**:
   - Drag the "AI Extract" action below the trigger
   - Connect the trigger to this action
   - Configure it to use GPT-4 for data extraction

3. **Add a Condition for Validation**:
   - Drag the "If Condition" component below the extract action
   - Connect the extract action to this condition
   - Configure it to check if all required fields are present

4. **Add Actions for Valid and Invalid Paths**:
   - For the "True" path: Add an "API Call" action to update the ERP system
   - For the "False" path: Add a "Send Notification" action to alert about invalid invoices

## Step 3: Customize the Code

Switch to the Code Editor tab and customize the following files:

### main.ts

```typescript
import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";

// Define the invoice extraction tool
class InvoiceExtractionTool extends StructuredTool {
  name = "invoice_extraction";
  description = "Extract data from invoice documents";
  schema = z.object({
    invoiceText: z.string().describe("The text content of the invoice"),
  });

  async _call({ invoiceText }: z.infer<typeof this.schema>) {
    console.log("Extracting data from invoice...");
    
    // In a real implementation, this would use more sophisticated extraction
    // For this example, we'll use a simple regex approach
    const invoiceNumberMatch = invoiceText.match(/Invoice #([\w-]+)/i);
    const dateMatch = invoiceText.match(/Date: ([\d/]+)/i);
    const amountMatch = invoiceText.match(/Total: \$(\d+\.\d{2})/i);
    const vendorMatch = invoiceText.match(/From: ([\w\s]+)/i);
    
    return JSON.stringify({
      invoiceNumber: invoiceNumberMatch ? invoiceNumberMatch[1] : null,
      date: dateMatch ? dateMatch[1] : null,
      amount: amountMatch ? parseFloat(amountMatch[1]) : null,
      vendor: vendorMatch ? vendorMatch[1].trim() : null,
    });
  }
}

// Define the invoice validation tool
class InvoiceValidationTool extends StructuredTool {
  name = "invoice_validation";
  description = "Validate extracted invoice data";
  schema = z.object({
    invoiceData: z.string().describe("The extracted invoice data as JSON string"),
  });

  async _call({ invoiceData }: z.infer<typeof this.schema>) {
    console.log("Validating invoice data...");
    
    const data = JSON.parse(invoiceData);
    const requiredFields = ["invoiceNumber", "date", "amount", "vendor"];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    return JSON.stringify({
      isValid: missingFields.length === 0,
      missingFields,
      message: missingFields.length === 0 
        ? "Invoice data is valid" 
        : `Missing required fields: ${missingFields.join(", ")}`
    });
  }
}

// Define the ERP update tool
class ERPUpdateTool extends StructuredTool {
  name = "erp_update";
  description = "Update the ERP system with processed invoice data";
  schema = z.object({
    invoiceData: z.string().describe("The validated invoice data as JSON string"),
  });

  async _call({ invoiceData }: z.infer<typeof this.schema>) {
    console.log("Updating ERP system...");
    
    // In a real implementation, this would call the ERP API
    // For this example, we'll simulate a successful update
    const data = JSON.parse(invoiceData);
    
    return JSON.stringify({
      success: true,
      message: `Invoice ${data.invoiceNumber} successfully processed and added to ERP system`,
      timestamp: new Date().toISOString(),
    });
  }
}

// Create the invoice processing agent
export async function createInvoiceProcessingAgent() {
  // Initialize the language model
  const llm = new OpenAI({
    temperature: 0,
    modelName: "gpt-4",
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  // Create tools
  const tools = [
    new InvoiceExtractionTool(),
    new InvoiceValidationTool(),
    new ERPUpdateTool(),
  ];

  // Initialize the agent executor
  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  return executor;
}
```

## Step 4: Test the Agent

1. Click on the "Simulation" tab
2. Select the "Invoices (Small)" mock dataset
3. Click "Run Simulation"
4. Review the logs to see how the agent processes each invoice
5. Check the results to see which invoices were successfully processed

## Step 5: Refine and Deploy

1. Make any necessary adjustments based on the simulation results
2. Click "Save" to save your changes
3. Click "Deploy" to deploy the agent
4. Configure the deployment settings:
   - Environment: Production
   - Schedule: Daily at 9:00 AM
   - Notifications: Email on failure
5. Click "Confirm Deployment"

## Conclusion

You've successfully created an Invoice Processing Agent that can:

1. Extract data from invoices using AI
2. Validate the extracted data
3. Update your ERP system with valid invoices
4. Send notifications for invalid invoices

This agent will save time and reduce errors in your invoice processing workflow.

## Next Steps

- Add more sophisticated validation rules
- Integrate with your actual ERP system API
- Add support for different invoice formats
- Create a dashboard to monitor the agent's performance
