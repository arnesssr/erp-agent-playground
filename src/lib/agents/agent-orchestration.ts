import {
  createInventoryAgent,
  createOrderAgent,
  createCustomerAgent,
} from "./real-erp-agents";
import { AgentExecutor } from "langchain/agents";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { OpenAI } from "@langchain/openai";

// Initialize agents
let inventoryAgent: AgentExecutor;
let orderAgent: AgentExecutor;
let customerAgent: AgentExecutor;

// Set up routing agent to direct requests to the appropriate specialized agent
const routerLLM = new OpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo", // Using a smaller model for routing is cost-effective
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const routerTemplate = `
You are a router that directs ERP-related queries to the appropriate specialized agent.
Given the following query, determine which agent should handle it.
Options are:
1. INVENTORY - For inventory-related queries about stock levels, locations, products
2. ORDER - For queries about customer orders, creating orders, fulfillment
3. CUSTOMER - For customer-related inquiries, account management, preferences

Query: {query}

Return just one word: either INVENTORY, ORDER, or CUSTOMER.
`;

const routerPrompt = new PromptTemplate({
  template: routerTemplate,
  inputVariables: ["query"],
});

const routerChain = new LLMChain({
  llm: routerLLM,
  prompt: routerPrompt,
});

// Initialize agents on startup
export async function initializeAgents() {
  try {
    console.log("Initializing ERP agents...");

    inventoryAgent = await createInventoryAgent();
    console.log("✅ Inventory agent ready");

    orderAgent = await createOrderAgent();
    console.log("✅ Order agent ready");

    customerAgent = await createCustomerAgent();
    console.log("✅ Customer agent ready");

    console.log("All ERP agents initialized successfully");

    return {
      inventoryAgent,
      orderAgent,
      customerAgent,
      routerChain,
    };
  } catch (error) {
    console.error("Failed to initialize agents:", error);
    throw error;
  }
}

// Process a query through the appropriate agent
export async function processAgentQuery(
  query: string,
  specificAgentType?: string,
) {
  try {
    // If agent type is specified, use that agent directly
    if (specificAgentType) {
      switch (specificAgentType.toUpperCase()) {
        case "INVENTORY":
          const inventoryResult = await inventoryAgent.invoke({ input: query });
          return { result: inventoryResult.output, agent: "inventory" };

        case "ORDER":
          const orderResult = await orderAgent.invoke({ input: query });
          return { result: orderResult.output, agent: "order" };

        case "CUSTOMER":
          const customerResult = await customerAgent.invoke({ input: query });
          return { result: customerResult.output, agent: "customer" };

        default:
          throw new Error("Invalid agent type");
      }
    }

    // Otherwise, route to the appropriate agent automatically
    const routingResult = await routerChain.call({ query });
    const agentToUse = routingResult.text.trim().toUpperCase();

    console.log(`Routing query to ${agentToUse} agent: "${query}"`);

    let result;
    switch (agentToUse) {
      case "INVENTORY":
        result = await inventoryAgent.invoke({ input: query });
        return { result: result.output, agent: "inventory" };

      case "ORDER":
        result = await orderAgent.invoke({ input: query });
        return { result: result.output, agent: "order" };

      case "CUSTOMER":
        result = await customerAgent.invoke({ input: query });
        return { result: result.output, agent: "customer" };

      default:
        // Fallback to order agent which has access to all tools
        result = await orderAgent.invoke({ input: query });
        return { result: result.output, agent: "order" };
    }
  } catch (error: any) {
    console.error("Error processing ERP agent request:", error);
    throw new Error(`Failed to process request: ${error.message}`);
  }
}

// Process order fulfillment
export async function processOrderFulfillment(orderId: string) {
  try {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    // 1. Check order details
    const orderCheckResult = await orderAgent.invoke({
      input: `Get complete details for order ${orderId}`,
    });

    // Parse the output - in a real implementation, you'd handle this more robustly
    let orderData;
    try {
      orderData = JSON.parse(orderCheckResult.output);
    } catch (e) {
      // If parsing fails, create a mock structure for demo purposes
      orderData = {
        orderId,
        items: [
          { productId: "P1001", quantity: 5 },
          { productId: "P1002", quantity: 2 },
        ],
      };
    }

    // 2. Check inventory for all items
    const inventoryChecks = await Promise.all(
      orderData.items.map(async (item: any) => {
        const query = `Check if we have ${item.quantity} units of product ${item.productId} in stock`;
        const inventoryResult = await inventoryAgent.invoke({ input: query });
        return {
          productId: item.productId,
          result: inventoryResult.output,
        };
      }),
    );

    // 3. Update order status based on inventory check
    const allItemsInStock = inventoryChecks.every(
      (check) =>
        !check.result.toLowerCase().includes("insufficient") &&
        !check.result.toLowerCase().includes("out of stock"),
    );

    const statusUpdate = allItemsInStock
      ? "ready_for_shipment"
      : "awaiting_stock";

    const updateResult = await orderAgent.invoke({
      input: `Update order ${orderId} status to ${statusUpdate}`,
    });

    // 4. If ready for shipment, update inventory
    if (allItemsInStock) {
      await Promise.all(
        orderData.items.map(async (item: any) => {
          const updateQuery = `Reduce inventory for product ${item.productId} by ${item.quantity} units`;
          await inventoryAgent.invoke({ input: updateQuery });
        }),
      );
    }

    return {
      orderId,
      status: statusUpdate,
      inventoryChecks,
      processingResult: updateResult.output,
      message: allItemsInStock
        ? "Order is ready for shipment, inventory updated"
        : "Order awaiting stock, inventory check failed",
    };
  } catch (error: any) {
    console.error("Error in order fulfillment process:", error);
    throw new Error(`Failed to process order fulfillment: ${error.message}`);
  }
}
