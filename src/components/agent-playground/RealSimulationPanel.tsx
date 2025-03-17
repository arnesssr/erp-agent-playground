import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  FileJson,
  Loader2,
  BarChart3,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { SimulationLog, SimulationResult } from "@/backend/models/Agent";

interface RealSimulationPanelProps {
  agentId?: string;
  onRunSimulation?: (mockDataId: string) => void;
}

const mockDataOptions = [
  { id: "invoice-1", name: "Sample Invoice", type: "invoice" },
  { id: "order-1", name: "Sample Order", type: "order" },
  { id: "customer-1", name: "Sample Customer", type: "customer" },
  { id: "custom-1", name: "Custom Data", type: "custom" },
];

const RealSimulationPanel: React.FC<RealSimulationPanelProps> = ({
  agentId,
  onRunSimulation,
}) => {
  const [selectedMockData, setSelectedMockData] = useState(
    mockDataOptions[0].id,
  );
  const [customData, setCustomData] = useState("");
  const [activeTab, setActiveTab] = useState("data");
  const [simulationStatus, setSimulationStatus] = useState<
    "idle" | "running" | "success" | "error"
  >("idle");
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);

  const handleRunSimulation = () => {
    setSimulationStatus("running");

    // Create initial simulation result
    const initialResult: SimulationResult = {
      id: `sim-${Date.now()}`,
      agentId: agentId || "",
      status: "running",
      startTime: new Date(),
      logs: [
        {
          timestamp: new Date(),
          level: "info",
          message: "Starting simulation...",
        },
      ],
      metrics: {
        executionTimeMs: 0,
      },
    };

    setSimulationResult(initialResult);
    setActiveTab("logs");

    // Simulate API call delay
    setTimeout(() => {
      // Add processing log
      setSimulationResult((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          logs: [
            ...prev.logs,
            {
              timestamp: new Date(),
              level: "info",
              message: "Processing data...",
            },
          ],
        };
      });

      // Simulate more processing and completion
      setTimeout(() => {
        const endTime = new Date();
        const startTime = simulationResult?.startTime || new Date();
        const executionTimeMs = endTime.getTime() - startTime.getTime();

        setSimulationResult((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            status: "success",
            endTime,
            logs: [
              ...prev.logs,
              {
                timestamp: new Date(),
                level: "success",
                message: "Simulation completed successfully",
              },
            ],
            metrics: {
              executionTimeMs,
              tokenUsage: {
                prompt: 1250,
                completion: 750,
                total: 2000,
              },
              successRate: 95,
              errorRate: 5,
            },
          };
        });

        setSimulationStatus("success");
        setActiveTab("results");

        if (onRunSimulation) {
          onRunSimulation(selectedMockData);
        }
      }, 2000);
    }, 1000);
  };

  const renderLogs = () => {
    if (!simulationResult || simulationResult.logs.length === 0) {
      return (
        <div className="flex items-center justify-center h-[200px]">
          <p className="text-muted-foreground">No logs available</p>
        </div>
      );
    }

    return (
      <ScrollArea className="h-[300px]">
        <div className="space-y-2 p-2">
          {simulationResult.logs.map((log, index) => (
            <div
              key={index}
              className={`p-2 rounded-md text-sm ${
                log.level === "error"
                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                  : log.level === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">
                  {log.level === "error" ? (
                    <AlertCircle className="h-4 w-4" />
                  ) : log.level === "success" ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full bg-blue-500" />
                  )}
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {log.timestamp.toLocaleTimeString()}
                  </div>
                  <div>{log.message}</div>
                  {log.nodeId && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Node: {log.nodeId}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    );
  };

  const renderMetrics = () => {
    if (!simulationResult || simulationResult.status !== "success") {
      return (
        <div className="flex items-center justify-center h-[200px]">
          <p className="text-muted-foreground">No metrics available</p>
        </div>
      );
    }

    const { metrics } = simulationResult;

    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {(metrics.executionTimeMs / 1000).toFixed(2)}s
            </div>
            <p className="text-sm text-muted-foreground">Execution Time</p>
          </CardContent>
        </Card>

        {metrics.tokenUsage && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">
                {metrics.tokenUsage.total.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Total Tokens</p>
              <div className="text-xs text-muted-foreground mt-2">
                Prompt: {metrics.tokenUsage.prompt.toLocaleString()} |
                Completion: {metrics.tokenUsage.completion.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        )}

        {metrics.successRate !== undefined && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{metrics.successRate}%</div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>
        )}

        {metrics.errorRate !== undefined && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{metrics.errorRate}%</div>
              <p className="text-sm text-muted-foreground">Error Rate</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <Card className="w-full h-full border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Simulation</CardTitle>
          <Badge
            variant="outline"
            className={`${simulationStatus === "idle" ? "bg-gray-100 text-gray-800" : simulationStatus === "running" ? "bg-blue-100 text-blue-800" : simulationStatus === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {simulationStatus === "idle"
              ? "Ready"
              : simulationStatus === "running"
                ? "Running"
                : simulationStatus === "success"
                  ? "Success"
                  : "Error"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="data">Test Data</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Select Mock Data</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => setSelectedMockData("custom-1")}
                >
                  <FileJson className="mr-2 h-4 w-4" />
                  Use Custom Data
                </Button>
              </div>

              <Select
                value={selectedMockData}
                onValueChange={setSelectedMockData}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mock data" />
                </SelectTrigger>
                <SelectContent>
                  {mockDataOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      <div className="flex items-center">
                        <Badge
                          variant="outline"
                          className="mr-2 px-1 py-0 text-xs"
                        >
                          {option.type}
                        </Badge>
                        {option.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedMockData === "custom-1" && (
                <div className="mt-4">
                  <Textarea
                    placeholder="Enter custom JSON data"
                    className="font-mono text-sm min-h-[200px]"
                    value={customData}
                    onChange={(e) => setCustomData(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter valid JSON data for testing your agent
                  </p>
                </div>
              )}

              {selectedMockData === "invoice-1" && (
                <div className="mt-4 rounded-md border p-4 bg-muted/30">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(
                      {
                        invoiceNumber: "INV-2023-0042",
                        date: "2023-05-15",
                        dueDate: "2023-06-15",
                        customer: {
                          id: "CUST-001",
                          name: "Acme Corporation",
                          email: "billing@acme.com",
                        },
                        items: [
                          {
                            id: "ITEM-001",
                            description: "Web Development Services",
                            quantity: 40,
                            unitPrice: 150,
                            total: 6000,
                          },
                          {
                            id: "ITEM-002",
                            description: "Server Maintenance",
                            quantity: 10,
                            unitPrice: 85,
                            total: 850,
                          },
                        ],
                        subtotal: 6850,
                        tax: 685,
                        total: 7535,
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              )}

              {selectedMockData === "order-1" && (
                <div className="mt-4 rounded-md border p-4 bg-muted/30">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(
                      {
                        orderNumber: "ORD-2023-1234",
                        date: "2023-05-10",
                        customer: {
                          id: "CUST-001",
                          name: "Acme Corporation",
                          email: "orders@acme.com",
                        },
                        items: [
                          {
                            id: "PROD-001",
                            name: "Enterprise Software License",
                            quantity: 5,
                            unitPrice: 1200,
                            total: 6000,
                          },
                          {
                            id: "PROD-002",
                            name: "Support Package - Premium",
                            quantity: 1,
                            unitPrice: 2500,
                            total: 2500,
                          },
                        ],
                        shipping: {
                          method: "Express",
                          cost: 150,
                          address: {
                            street: "123 Business Ave",
                            city: "Enterprise City",
                            state: "CA",
                            zip: "94105",
                            country: "USA",
                          },
                        },
                        subtotal: 8500,
                        tax: 850,
                        total: 9500,
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              )}

              {selectedMockData === "customer-1" && (
                <div className="mt-4 rounded-md border p-4 bg-muted/30">
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {JSON.stringify(
                      {
                        id: "CUST-001",
                        name: "Acme Corporation",
                        type: "Enterprise",
                        industry: "Technology",
                        contacts: [
                          {
                            name: "John Doe",
                            title: "CTO",
                            email: "john.doe@acme.com",
                            phone: "+1-555-123-4567",
                          },
                          {
                            name: "Jane Smith",
                            title: "Procurement Manager",
                            email: "jane.smith@acme.com",
                            phone: "+1-555-987-6543",
                          },
                        ],
                        billing: {
                          address: {
                            street: "123 Business Ave",
                            city: "Enterprise City",
                            state: "CA",
                            zip: "94105",
                            country: "USA",
                          },
                          paymentTerms: "Net 30",
                          creditLimit: 50000,
                        },
                        metrics: {
                          lifetimeValue: 125000,
                          openInvoices: 3,
                          averagePaymentTime: 28,
                        },
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleRunSimulation}
                disabled={simulationStatus === "running"}
              >
                {simulationStatus === "running" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Run Simulation
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <div className="rounded-md border">{renderLogs()}</div>
          </TabsContent>

          <TabsContent value="results" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-muted-foreground" />
                <h3 className="text-sm font-medium">Performance Metrics</h3>
              </div>
              {renderMetrics()}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RealSimulationPanel;
