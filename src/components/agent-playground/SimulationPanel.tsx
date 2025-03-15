import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Download,
} from "lucide-react";

interface SimulationPanelProps {
  onRunSimulation?: () => void;
  simulationData?: {
    status: "idle" | "running" | "success" | "error";
    logs: Array<{
      type: "info" | "error" | "success";
      message: string;
      timestamp: string;
    }>;
    metrics?: {
      executionTime: number;
      memoryUsage: number;
      successRate: number;
    };
  };
  mockDataSets?: Array<{ id: string; name: string; description: string }>;
}

const SimulationPanel = ({
  onRunSimulation = () => {},
  simulationData = {
    status: "idle",
    logs: [
      {
        type: "info",
        message: "Agent ready for simulation",
        timestamp: "2023-06-15T10:30:00Z",
      },
      {
        type: "info",
        message: "Select mock data and run simulation",
        timestamp: "2023-06-15T10:30:05Z",
      },
    ],
  },
  mockDataSets = [
    {
      id: "invoices-small",
      name: "Invoices (Small)",
      description: "A small dataset of 10 invoices for testing",
    },
    {
      id: "invoices-large",
      name: "Invoices (Large)",
      description: "A large dataset of 100 invoices for performance testing",
    },
    {
      id: "inventory",
      name: "Inventory Data",
      description: "Inventory records with stock levels and product details",
    },
    {
      id: "customers",
      name: "Customer Records",
      description: "Customer information and purchase history",
    },
  ],
}: SimulationPanelProps) => {
  const [selectedDataSet, setSelectedDataSet] = useState(
    mockDataSets[0]?.id || "",
  );
  const [activeTab, setActiveTab] = useState("logs");

  // Determine status icon and color
  const getStatusIcon = () => {
    switch (simulationData.status) {
      case "running":
        return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-background border rounded-lg overflow-hidden flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Simulation Panel</h2>
          {getStatusIcon()}
          {simulationData.status !== "idle" && (
            <span className="text-sm capitalize">
              {simulationData.status === "running"
                ? "Running..."
                : simulationData.status}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedDataSet} onValueChange={setSelectedDataSet}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select mock data" />
            </SelectTrigger>
            <SelectContent>
              {mockDataSets.map((dataset) => (
                <SelectItem key={dataset.id} value={dataset.id}>
                  {dataset.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={onRunSimulation}
            disabled={simulationData.status === "running"}
            className="flex items-center space-x-1"
          >
            <Play className="h-4 w-4 mr-1" />
            Run Simulation
          </Button>
        </div>
      </div>

      <div className="p-4 flex-grow overflow-hidden flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full h-full flex flex-col"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          <div className="flex-grow overflow-auto">
            <TabsContent value="logs" className="h-full">
              <div className="bg-black/10 p-4 rounded-md h-full overflow-auto font-mono text-sm">
                {simulationData.logs.map((log, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${log.type === "error" ? "text-red-500" : log.type === "success" ? "text-green-500" : "text-gray-700"}`}
                  >
                    <span className="text-gray-500">
                      [{new Date(log.timestamp).toLocaleTimeString()}]
                    </span>{" "}
                    {log.message}
                  </div>
                ))}
                {simulationData.status === "running" && (
                  <div className="mb-2 text-blue-500">
                    <span className="text-gray-500">
                      [{new Date().toLocaleTimeString()}]
                    </span>{" "}
                    Simulation in progress...
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="results" className="h-full">
              {simulationData.status === "success" ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Simulation Results</CardTitle>
                    <CardDescription>
                      Results from running the agent against the selected mock
                      data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Processed Items</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-green-50 p-3 rounded-md border border-green-100">
                            <div className="text-2xl font-bold text-green-600">
                              42
                            </div>
                            <div className="text-sm text-green-700">
                              Successful
                            </div>
                          </div>
                          <div className="bg-red-50 p-3 rounded-md border border-red-100">
                            <div className="text-2xl font-bold text-red-600">
                              3
                            </div>
                            <div className="text-sm text-red-700">Failed</div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                            <div className="text-2xl font-bold text-blue-600">
                              45
                            </div>
                            <div className="text-sm text-blue-700">Total</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Common Errors</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>
                            Missing required field 'invoice_number' in 2 records
                          </li>
                          <li>Invalid date format in 1 record</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  {simulationData.status === "running" ? (
                    <div className="flex flex-col items-center">
                      <RefreshCw className="h-8 w-8 animate-spin mb-2" />
                      <p>Processing simulation data...</p>
                    </div>
                  ) : (
                    <p>Run a simulation to see results</p>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="metrics" className="h-full">
              {simulationData.metrics ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Execution Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {simulationData.metrics.executionTime}ms
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Average processing time per item
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Memory Usage</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {simulationData.metrics.memoryUsage}MB
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Peak memory consumption
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Success Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {simulationData.metrics.successRate}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Items successfully processed
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>Run a simulation to see metrics</p>
                </div>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SimulationPanel;
