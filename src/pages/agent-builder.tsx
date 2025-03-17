import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNav from "@/components/layout/SideNav";
import FlowCanvas from "@/components/agent-playground/FlowCanvas";
import ComponentSidebar from "@/components/agent-playground/ComponentSidebar";
import PropertiesPanel from "@/components/agent-playground/PropertiesPanel";
import APIKeySettings from "@/components/agent-playground/APIKeySettings";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Play, Code, Settings, Bot, Workflow } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    icon?: string;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

const AgentBuilderPage = () => {
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("New Agent");
  const [agentDescription, setAgentDescription] = useState("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("canvas");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Initialize with some default nodes
  useEffect(() => {
    const initialNodes: Node[] = [
      {
        id: uuidv4(),
        type: "trigger",
        position: { x: 100, y: 100 },
        data: {
          label: "Start",
          description: "Entry point for the flow",
        },
      },
      {
        id: uuidv4(),
        type: "model",
        position: { x: 100, y: 250 },
        data: {
          label: "LLM",
          description: "Process with language model",
        },
      },
      {
        id: uuidv4(),
        type: "output",
        position: { x: 100, y: 400 },
        data: {
          label: "Response",
          description: "Format and return response",
        },
      },
    ];

    const initialEdges: Edge[] = [
      {
        id: `e-${initialNodes[0].id}-${initialNodes[1].id}`,
        source: initialNodes[0].id,
        target: initialNodes[1].id,
      },
      {
        id: `e-${initialNodes[1].id}-${initialNodes[2].id}`,
        source: initialNodes[1].id,
        target: initialNodes[2].id,
      },
    ];

    setNodes(initialNodes);
    setEdges(initialEdges);
  }, []);

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleCanvasChange = (updatedNodes: Node[], updatedEdges: Edge[]) => {
    setNodes(updatedNodes);
    setEdges(updatedEdges);
  };

  const handlePropertyChange = (
    componentId: string,
    propertyId: string,
    value: any,
  ) => {
    if (propertyId === "name" || propertyId === "description") {
      setNodes(
        nodes.map((node) => {
          if (node.id === componentId) {
            return {
              ...node,
              data: {
                ...node.data,
                label: propertyId === "name" ? value : node.data.label,
                description:
                  propertyId === "description" ? value : node.data.description,
              },
            };
          }
          return node;
        }),
      );
    }
  };

  // Find the selected node to pass to properties panel
  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <div className="flex h-screen bg-black">
      <SideNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-gray-800 p-4 bg-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-md bg-gray-800 flex items-center justify-center">
                <Workflow className="h-5 w-5 text-white" />
              </div>
              <div>
                <Input
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="h-7 text-xl font-bold bg-transparent border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white"
                />
                <div className="text-xs text-gray-400">Flow Builder</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
              >
                <Play className="h-4 w-4 mr-2" />
                Test
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {!sidebarCollapsed && (
            <ComponentSidebar
              onDragStart={(component) =>
                console.log("Dragging component:", component)
              }
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          )}

          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="px-4 border-b border-gray-800 bg-black">
                <TabsList className="bg-gray-900">
                  <TabsTrigger
                    value="canvas"
                    className="data-[state=active]:bg-gray-800 text-white"
                  >
                    <Workflow className="h-4 w-4 mr-2" />
                    Canvas
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="data-[state=active]:bg-gray-800 text-white"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="data-[state=active]:bg-gray-800 text-white"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="canvas"
                className="flex-1 p-0 m-0 overflow-hidden"
              >
                <div className="h-full">
                  <FlowCanvas
                    nodes={nodes}
                    edges={edges}
                    onNodeSelect={handleNodeSelect}
                    onCanvasChange={handleCanvasChange}
                    sidebarCollapsed={sidebarCollapsed}
                    onToggleSidebar={() =>
                      setSidebarCollapsed(!sidebarCollapsed)
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent
                value="code"
                className="flex-1 p-4 m-0 overflow-auto bg-gray-900"
              >
                <div className="space-y-4">
                  <div className="p-4 border border-gray-800 rounded-md bg-gray-800">
                    <h3 className="text-lg font-medium mb-2 text-white">
                      Generated Code
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      This code is automatically generated from your flow
                      canvas. You can edit it directly or make changes in the
                      canvas.
                    </p>
                    <pre className="p-4 bg-black text-white rounded-md overflow-auto text-sm font-mono">
                      {`import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

// Initialize the model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

// Create a prompt template
const promptTemplate = PromptTemplate.fromTemplate(
  "You are an AI assistant that helps with data processing. {input}"
);

// Main function to process requests
export async function processRequest(input) {
  const formattedPrompt = await promptTemplate.format({ input });
  const response = await model.invoke(formattedPrompt);
  return response.content;
}`}
                    </pre>
                  </div>
                </div>
              </TabsContent>

              <TabsContent
                value="settings"
                className="flex-1 p-4 m-0 overflow-auto bg-gray-900"
              >
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">
                      Agent Details
                    </h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="agent-name" className="text-white">
                          Name
                        </Label>
                        <Input
                          id="agent-name"
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="agent-description"
                          className="text-white"
                        >
                          Description
                        </Label>
                        <Textarea
                          id="agent-description"
                          value={agentDescription}
                          onChange={(e) => setAgentDescription(e.target.value)}
                          rows={3}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <APIKeySettings />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {selectedNode && activeTab === "canvas" && (
            <div className="w-80 border-l border-gray-800 bg-black">
              <PropertiesPanel
                selectedComponent={{
                  id: selectedNode.id,
                  type: selectedNode.type,
                  name: selectedNode.data.label,
                  propertyGroups: [
                    {
                      title: "General",
                      properties: [
                        {
                          id: "name",
                          name: "Name",
                          type: "text",
                          value: selectedNode.data.label,
                        },
                        {
                          id: "description",
                          name: "Description",
                          type: "textarea",
                          value: selectedNode.data.description || "",
                        },
                        {
                          id: "enabled",
                          name: "Enabled",
                          type: "switch",
                          value: true,
                        },
                      ],
                    },
                    {
                      title: "Configuration",
                      properties: [
                        {
                          id: "timeout",
                          name: "Timeout (ms)",
                          type: "number",
                          value: 5000,
                        },
                        {
                          id: "retries",
                          name: "Retries",
                          type: "number",
                          value: 3,
                        },
                      ],
                    },
                  ],
                }}
                onPropertyChange={handlePropertyChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentBuilderPage;
