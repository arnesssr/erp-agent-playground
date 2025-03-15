import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import axios from "axios";

// Initialize the LLM
const llm = new OpenAI({
  temperature: 0,
  modelName: "gpt-4",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Real ERP System connection tools
class InventorySystem extends StructuredTool {
  name = "inventory_system";
  description = "Query and update inventory in the ERP system";
  schema = z.object({
    action: z
      .enum(["query", "update"])
      .describe("The action to perform: 'query' or 'update'"),
    productId: z.string().describe("The ID of the product"),
    quantity: z
      .number()
      .optional()
      .describe("The quantity to update (for 'update' action only)"),
    locationId: z.string().optional().describe("The warehouse location ID"),
  });

  async _call(args: z.infer<typeof this.schema>) {
    const { action, productId, quantity, locationId } = args;

    try {
      // Real implementation connecting to your inventory API
      if (action === "query") {
        const response = await axios.get(
          `${process.env.ERP_API_BASE_URL}/inventory/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );
        return JSON.stringify(response.data);
      } else if (action === "update") {
        if (!quantity)
          throw new Error("Quantity is required for update actions");

        const response = await axios.put(
          `${process.env.ERP_API_BASE_URL}/inventory/${productId}`,
          {
            quantity,
            locationId: locationId || "DEFAULT",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );
        return JSON.stringify(response.data);
      }
    } catch (error: any) {
      return `Error connecting to inventory system: ${error.message}`;
    }
  }
}

class OrderSystem extends StructuredTool {
  name = "order_system";
  description = "Create, query, and update customer orders";
  schema = z.object({
    action: z
      .enum(["create", "query", "update"])
      .describe("The action to perform"),
    orderId: z.string().optional().describe("The order ID (for query/update)"),
    customerId: z.string().optional().describe("The customer ID (for create)"),
    orderItems: z
      .array(
        z.object({
          productId: z.string(),
          quantity: z.number(),
          unitPrice: z.number().optional(),
        }),
      )
      .optional()
      .describe("Items in the order (for create/update)"),
    status: z.string().optional().describe("Order status (for update)"),
  });

  async _call(args: z.infer<typeof this.schema>) {
    const { action, orderId, customerId, orderItems, status } = args;

    try {
      if (action === "create") {
        if (!customerId || !orderItems)
          throw new Error("customerId and orderItems are required");

        const response = await axios.post(
          `${process.env.ERP_API_BASE_URL}/orders`,
          {
            customerId,
            items: orderItems,
            createdAt: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );
        return JSON.stringify(response.data);
      } else if (action === "query") {
        if (!orderId) throw new Error("orderId is required for query");

        const response = await axios.get(
          `${process.env.ERP_API_BASE_URL}/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
            },
          },
        );
        return JSON.stringify(response.data);
      } else if (action === "update") {
        if (!orderId) throw new Error("orderId is required for update");

        const updateData: any = {};
        if (status) updateData.status = status;
        if (orderItems) updateData.items = orderItems;

        const response = await axios.put(
          `${process.env.ERP_API_BASE_URL}/orders/${orderId}`,
          updateData,
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );
        return JSON.stringify(response.data);
      }
    } catch (error: any) {
      return `Error connecting to order system: ${error.message}`;
    }
  }
}

class CustomerSystem extends StructuredTool {
  name = "customer_system";
  description = "Query and update customer information";
  schema = z.object({
    action: z
      .enum(["query", "update", "create"])
      .describe("The action to perform"),
    customerId: z.string().optional().describe("The customer ID"),
    customerData: z
      .object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        type: z.string().optional(),
      })
      .optional()
      .describe("Customer data for create/update operations"),
  });

  async _call(args: z.infer<typeof this.schema>) {
    const { action, customerId, customerData } = args;

    try {
      if (action === "query") {
        if (!customerId) throw new Error("customerId is required for query");

        const response = await axios.get(
          `${process.env.ERP_API_BASE_URL}/customers/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
            },
          },
        );
        return JSON.stringify(response.data);
      } else if (action === "update") {
        if (!customerId || !customerData)
          throw new Error("customerId and customerData required");

        const response = await axios.put(
          `${process.env.ERP_API_BASE_URL}/customers/${customerId}`,
          customerData,
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );
        return JSON.stringify(response.data);
      } else if (action === "create") {
        if (!customerData)
          throw new Error("customerData is required for create");

        const response = await axios.post(
          `${process.env.ERP_API_BASE_URL}/customers`,
          customerData,
          {
            headers: {
              Authorization: `Bearer ${process.env.ERP_API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );
        return JSON.stringify(response.data);
      }
    } catch (error: any) {
      return `Error connecting to customer system: ${error.message}`;
    }
  }
}

// Create specialized agents for different ERP functions
export async function createInventoryAgent() {
  const tools = [new InventorySystem()];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
    maxIterations: 5,
  });

  return executor;
}

export async function createOrderAgent() {
  const tools = [
    new OrderSystem(),
    new InventorySystem(),
    new CustomerSystem(),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
    maxIterations: 7,
  });

  return executor;
}

export async function createCustomerAgent() {
  const tools = [new CustomerSystem(), new OrderSystem()];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
    maxIterations: 5,
  });

  return executor;
}
