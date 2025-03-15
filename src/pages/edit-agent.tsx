import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAgent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("canvas");

  // Mock data for agent
  const agents = [
    {
      name: "Invoice Processor",
      description: "Automates invoice processing workflow",
      type: "process",
      erp: "sap",
    },
    {
      name: "Inventory Manager",
      description: "Monitors and updates inventory levels",
      type: "data",
      erp: "oracle",
    },
    {
      name: "Customer Support",
      description: "Handles customer inquiries and tickets",
      type: "support",
      erp: "ms",
    },
  ];

  const agent = agents[parseInt(id || "0")];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">
          Edit Agent: {agent.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Agent Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter agent name"
                    className="mt-1"
                    defaultValue={agent.name}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this agent does"
                    className="mt-1"
                    defaultValue={agent.description}
                  />
                </div>
                <div>
                  <Label htmlFor="type">Agent Type</Label>
                  <Select defaultValue={agent.type}>
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue placeholder="Select agent type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="process">
                        Process Automation
                      </SelectItem>
                      <SelectItem value="data">Data Management</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="erp">ERP System</Label>
                  <Select defaultValue={agent.erp}>
                    <SelectTrigger id="erp" className="mt-1">
                      <SelectValue placeholder="Select ERP system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sap">SAP</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                      <SelectItem value="ms">Microsoft Dynamics</SelectItem>
                      <SelectItem value="netsuite">NetSuite</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-4">
                  <Button
                    className="w-full"
                    onClick={() => navigate("/my-agents")}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="canvas">Canvas</TabsTrigger>
              <TabsTrigger value="code">Code Editor</TabsTrigger>
              <TabsTrigger value="simulation">Simulation</TabsTrigger>
            </TabsList>
            <TabsContent value="canvas" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-lg font-medium">
                        Interactive Canvas
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        Edit your agent workflow
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="code" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-[600px] flex items-center justify-center bg-muted/50">
                    <div className="text-center">
                      <h3 className="text-lg font-medium">Code Editor</h3>
                      <p className="text-muted-foreground mt-1">
                        Edit custom logic for your agent
                      </p>
                      <pre className="mt-4 text-left bg-background p-4 rounded-md overflow-auto max-w-full">
                        <code className="text-sm">
                          {`// Agent logic for ${agent.name}
function processData(input) {
  // Extract relevant information
  const data = extractData(input);
  
  // Validate the data
  if (!validateData(data)) {
    return { status: "error", message: "Invalid data format" };
  }
  
  // Process according to business rules
  const result = applyBusinessRules(data);
  
  // Return the processed result
  return { status: "success", data: result };
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="simulation" className="mt-4">
              <Card>
                <CardContent className="p-6">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-lg font-medium">Simulation Panel</h3>
                      <p className="text-muted-foreground mt-1">
                        Test your agent with mock ERP data
                      </p>
                      <Button className="mt-4">Run Simulation</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
