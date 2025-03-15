import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Loader2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RealAgentClientProps {
  onSendQuery?: (query: string, agentType?: string) => Promise<any>;
  onProcessOrder?: (orderId: string) => Promise<any>;
  isConnected?: boolean;
}

const RealAgentClient: React.FC<RealAgentClientProps> = ({
  onSendQuery = async () => ({}),
  onProcessOrder = async () => ({}),
  isConnected = false,
}) => {
  const [input, setInput] = useState("");
  const [orderId, setOrderId] = useState("");
  const [selectedAgentType, setSelectedAgentType] = useState<
    string | undefined
  >();
  const [responses, setResponses] = useState<
    { query: string; response: string; agent?: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [orderResult, setOrderResult] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (!isConnected) {
      setResponses([
        ...responses,
        {
          query: input,
          response:
            "Error: No connection to ERP system. Please configure your ERP API credentials in the settings.",
        },
      ]);
      setInput("");
      return;
    }

    setLoading(true);
    const query = input;
    setInput("");

    try {
      const result = await onSendQuery(query, selectedAgentType);
      setResponses([
        ...responses,
        { query, response: result.result, agent: result.agent },
      ]);
    } catch (error: any) {
      setResponses([
        ...responses,
        {
          query,
          response: `Error: ${error.message || "Failed to process your request"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleProcessOrder = async () => {
    if (!orderId.trim()) return;
    if (!isConnected) {
      setOrderResult({
        error:
          "No connection to ERP system. Please configure your ERP API credentials in the settings.",
      });
      return;
    }

    setOrderLoading(true);
    try {
      const result = await onProcessOrder(orderId);
      setOrderResult(result);
    } catch (error: any) {
      setOrderResult({
        error: error.message || "Failed to process order",
      });
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col bg-background border rounded-md shadow-sm overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Agent Chat</TabsTrigger>
          <TabsTrigger value="process">Business Processes</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {!isConnected && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not Connected</AlertTitle>
                <AlertDescription>
                  Your agent is not connected to any ERP system. Configure your
                  ERP API credentials in settings.
                </AlertDescription>
              </Alert>
            )}

            {responses.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 mt-0.5 text-primary" />
                    <div>
                      <p className="font-medium text-sm text-primary">You</p>
                      <p className="text-sm">{item.query}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Bot className="h-5 w-5 mt-0.5 text-secondary" />
                    <div>
                      <p className="font-medium text-sm text-secondary">
                        {item.agent
                          ? `${item.agent.charAt(0).toUpperCase() + item.agent.slice(1)} Agent`
                          : "ERP Agent"}
                      </p>
                      <p className="text-sm whitespace-pre-line">
                        {item.response}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Agent is processing your request...
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t space-y-2">
            <div className="flex gap-2">
              <Select
                value={selectedAgentType}
                onValueChange={setSelectedAgentType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Auto-route" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Auto-route</SelectItem>
                  <SelectItem value="inventory">Inventory Agent</SelectItem>
                  <SelectItem value="order">Order Agent</SelectItem>
                  <SelectItem value="customer">Customer Agent</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex-1 flex gap-2">
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask your ERP agent a question..."
                  className="flex-1"
                />
                <Button type="submit" disabled={loading}>
                  {loading ? "Processing..." : "Send"}
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="process" className="flex-1 flex flex-col">
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {!isConnected && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Not Connected</AlertTitle>
                <AlertDescription>
                  Your agent is not connected to any ERP system. Configure your
                  ERP API credentials in settings.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-4">
                  Order Fulfillment Process
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This process will check inventory for all items in an order,
                  update the order status, and adjust inventory levels if the
                  order is ready for shipment.
                </p>

                <div className="flex gap-2 mb-4">
                  <Input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter Order ID (e.g., ORD12345)"
                    className="flex-1"
                  />
                  <Button onClick={handleProcessOrder} disabled={orderLoading}>
                    {orderLoading ? "Processing..." : "Process Order"}
                  </Button>
                </div>

                {orderResult && (
                  <div className="mt-4 border rounded-md p-4 bg-muted/20">
                    <h4 className="font-medium mb-2">Process Result</h4>
                    {orderResult.error ? (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{orderResult.error}</AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-2">
                        <p>
                          <strong>Order ID:</strong> {orderResult.orderId}
                        </p>
                        <p>
                          <strong>Status:</strong> {orderResult.status}
                        </p>
                        <p>
                          <strong>Message:</strong> {orderResult.message}
                        </p>

                        {orderResult.inventoryChecks && (
                          <div>
                            <p className="font-medium mt-2">
                              Inventory Checks:
                            </p>
                            <ul className="list-disc pl-5 space-y-1">
                              {orderResult.inventoryChecks.map(
                                (check: any, i: number) => (
                                  <li key={i} className="text-sm">
                                    <strong>{check.productId}:</strong>{" "}
                                    {check.result}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default RealAgentClient;
