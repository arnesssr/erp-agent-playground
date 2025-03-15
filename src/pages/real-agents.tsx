import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Settings, Bot, Server, Database } from "lucide-react";
import RealAgentClient from "@/components/agent-playground/RealAgentClient";

const RealAgentsPage = () => {
  const [activeTab, setActiveTab] = useState("agent");
  const [isConfigured, setIsConfigured] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [configValues, setConfigValues] = useState({
    apiBaseUrl: "",
    apiKey: "",
    openAiKey: "",
  });
  const [testConnectionStatus, setTestConnectionStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");
  const [testConnectionMessage, setTestConnectionMessage] = useState("");

  // Mock function to simulate sending a query to the agent
  const handleSendQuery = async (query: string, agentType?: string) => {
    // In a real implementation, this would call your backend API
    console.log(
      `Sending query to ${agentType || "auto-routed"} agent: ${query}`,
    );

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock response based on query content
    if (
      query.toLowerCase().includes("inventory") ||
      query.toLowerCase().includes("stock")
    ) {
      return {
        result: `I've checked our inventory system. We currently have 42 units of product P1001 in stock at Warehouse A, and 18 units at Warehouse B. The inventory was last updated on ${new Date().toISOString()}.`,
        agent: "inventory",
      };
    } else if (query.toLowerCase().includes("order")) {
      return {
        result: `I found order ORD12345 in our system. It was placed on 2023-09-15 and contains 3 items. The current status is "Processing". Would you like me to expedite this order or provide more details?`,
        agent: "order",
      };
    } else if (query.toLowerCase().includes("customer")) {
      return {
        result: `Customer C5002 is a premium account holder who has been with us since 2020. Their last purchase was on 2023-09-10 for $1,250. They have a total of 15 orders in our system.`,
        agent: "customer",
      };
    } else {
      return {
        result: `I've analyzed your query and determined that it's best handled by our Order agent. I can help you with order management, inventory queries, and customer information. Please provide more specific details about what you're looking for.`,
        agent: "order",
      };
    }
  };

  // Mock function to simulate processing an order
  const handleProcessOrder = async (orderId: string) => {
    console.log(`Processing order: ${orderId}`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock response
    return {
      orderId,
      status: "ready_for_shipment",
      inventoryChecks: [
        {
          productId: "P1001",
          result: "In stock (42 units available)",
        },
        {
          productId: "P1002",
          result: "In stock (18 units available)",
        },
      ],
      processingResult: "Order status updated successfully",
      message: "Order is ready for shipment, inventory updated",
    };
  };

  // Handle saving configuration
  const handleSaveConfig = () => {
    // In a real implementation, you would validate and store these securely
    console.log("Saving configuration:", configValues);
    setIsConfigured(true);
    setActiveTab("agent");
  };

  // Handle testing connection
  const handleTestConnection = async () => {
    setTestConnectionStatus("testing");

    // Simulate API connection test
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (configValues.apiBaseUrl && configValues.apiKey) {
      setTestConnectionStatus("success");
      setTestConnectionMessage("Successfully connected to ERP API");
      setIsConnected(true);
    } else {
      setTestConnectionStatus("error");
      setTestConnectionMessage("Failed to connect: Missing API URL or key");
      setIsConnected(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Real ERP Agents</h1>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="agent">Agent</TabsTrigger>
              <TabsTrigger value="config">Configuration</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab("config")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-4">
        <TabsContent value="agent" className="h-full">
          {!isConfigured ? (
            <Card className="w-full h-full flex items-center justify-center">
              <CardContent className="text-center p-6">
                <Server className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-xl font-semibold mb-2">
                  ERP Connection Required
                </h2>
                <p className="text-muted-foreground mb-4">
                  You need to configure your ERP system connection before using
                  real agents.
                </p>
                <Button onClick={() => setActiveTab("config")}>
                  Configure Connection
                </Button>
              </CardContent>
            </Card>
          ) : (
            <RealAgentClient
              onSendQuery={handleSendQuery}
              onProcessOrder={handleProcessOrder}
              isConnected={isConnected}
            />
          )}
        </TabsContent>

        <TabsContent value="config" className="h-full">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>ERP System Configuration</CardTitle>
              <CardDescription>
                Configure your connection to your ERP system API and LLM
                provider.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">ERP API Connection</h3>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="apiBaseUrl">ERP API Base URL</Label>
                    <Input
                      id="apiBaseUrl"
                      placeholder="https://your-erp-api.example.com"
                      value={configValues.apiBaseUrl}
                      onChange={(e) =>
                        setConfigValues({
                          ...configValues,
                          apiBaseUrl: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="apiKey">ERP API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Your ERP API key"
                      value={configValues.apiKey}
                      onChange={(e) =>
                        setConfigValues({
                          ...configValues,
                          apiKey: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="openAiKey">OpenAI API Key</Label>
                    <Input
                      id="openAiKey"
                      type="password"
                      placeholder="Your OpenAI API key"
                      value={configValues.openAiKey}
                      onChange={(e) =>
                        setConfigValues({
                          ...configValues,
                          openAiKey: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleTestConnection}
                    variant="outline"
                    disabled={testConnectionStatus === "testing"}
                  >
                    {testConnectionStatus === "testing"
                      ? "Testing..."
                      : "Test Connection"}
                  </Button>
                  <Button onClick={handleSaveConfig}>Save Configuration</Button>
                </div>

                {testConnectionStatus === "success" && (
                  <Alert
                    variant="default"
                    className="bg-green-50 border-green-200"
                  >
                    <AlertCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-600">
                      Connection Successful
                    </AlertTitle>
                    <AlertDescription className="text-green-600">
                      {testConnectionMessage}
                    </AlertDescription>
                  </Alert>
                )}

                {testConnectionStatus === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Failed</AlertTitle>
                    <AlertDescription>{testConnectionMessage}</AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Agent Configuration</h3>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Advanced Configuration</AlertTitle>
                  <AlertDescription>
                    For advanced agent configuration, including custom tools and
                    specialized agents, please refer to the documentation or
                    contact your system administrator.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="h-full">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Agent Logs</CardTitle>
              <CardDescription>
                View logs and performance metrics for your ERP agents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-zinc-900 text-zinc-100 font-mono text-sm p-4 rounded-md h-[500px] overflow-auto">
                <p>[2023-09-15 14:30:22] INFO: Inventory agent initialized</p>
                <p>[2023-09-15 14:30:23] INFO: Order agent initialized</p>
                <p>[2023-09-15 14:30:24] INFO: Customer agent initialized</p>
                <p>
                  [2023-09-15 14:31:05] INFO: Received query: "What's the
                  inventory level for product P1001?"
                </p>
                <p>
                  [2023-09-15 14:31:06] INFO: Router directed query to INVENTORY
                  agent
                </p>
                <p>
                  [2023-09-15 14:31:08] INFO: Inventory agent executing tool:
                  inventory_system
                </p>
                <p>
                  [2023-09-15 14:31:10] INFO: API request to /inventory/P1001
                </p>
                <p>
                  [2023-09-15 14:31:11] INFO: Response received from inventory
                  API
                </p>
                <p>
                  [2023-09-15 14:31:12] INFO: Agent response generated
                  successfully
                </p>
                <p>
                  [2023-09-15 14:35:42] INFO: Received query: "Get customer
                  information for C5002"
                </p>
                <p>
                  [2023-09-15 14:35:43] INFO: Router directed query to CUSTOMER
                  agent
                </p>
                <p>
                  [2023-09-15 14:35:45] INFO: Customer agent executing tool:
                  customer_system
                </p>
                <p>
                  [2023-09-15 14:35:46] INFO: API request to /customers/C5002
                </p>
                <p>
                  [2023-09-15 14:35:47] INFO: Response received from customer
                  API
                </p>
                <p>
                  [2023-09-15 14:35:48] INFO: Agent response generated
                  successfully
                </p>
                <p>
                  [2023-09-15 14:40:15] INFO: Order fulfillment process
                  initiated for order ORD12345
                </p>
                <p>
                  [2023-09-15 14:40:16] INFO: Checking order details for
                  ORD12345
                </p>
                <p>
                  [2023-09-15 14:40:18] INFO: Checking inventory for 2 items
                </p>
                <p>
                  [2023-09-15 14:40:20] INFO: All items in stock, updating order
                  status
                </p>
                <p>
                  [2023-09-15 14:40:22] INFO: Order status updated to
                  ready_for_shipment
                </p>
                <p>[2023-09-15 14:40:24] INFO: Updating inventory levels</p>
                <p>
                  [2023-09-15 14:40:26] INFO: Order fulfillment process
                  completed successfully
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
};

export default RealAgentsPage;
