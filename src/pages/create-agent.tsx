import React, { useState, useEffect } from "react";
import AgentHeader from "@/components/agent-playground/AgentHeader";
import DraggableAgentCanvas from "@/components/agent-playground/DraggableAgentCanvas";
import ComponentPalette from "@/components/agent-playground/ComponentPalette";
import PropertiesPanel from "@/components/agent-playground/PropertiesPanel";
import RealCodeEditor from "@/components/agent-playground/RealCodeEditor";
import RealSimulationPanel from "@/components/agent-playground/RealSimulationPanel";
import AppSelector from "@/components/agent-playground/AppSelector";
import LangChainIntegration from "@/components/agent-playground/LangChainIntegration";
import RealAgentClient from "@/components/agent-playground/RealAgentClient";
import { useAgentStore } from "@/lib/agents/agent-store";
import { v4 as uuidv4 } from "uuid";

const CreateAgentPage = () => {
  const { createAgent, updateNodes, updateEdges, currentAgent } =
    useAgentStore();
  const [currentView, setCurrentView] = useState<
    "canvas" | "code" | "simulation" | "app" | "client"
  >("app");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [agentName, setAgentName] = useState("New Agent");
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  // Initialize agent when app is selected
  useEffect(() => {
    if (selectedAppId && !currentAgent) {
      const initializeAgent = async () => {
        let initialNodes = [];
        let initialEdges = [];

        // Create different initial nodes based on app type
        if (selectedAppId === "langchain" || selectedAppId === "langflow") {
          initialNodes = [
            {
              id: uuidv4(),
              type: selectedAppId,
              position: { x: 100, y: 100 },
              data: {
                label: "AI Processor",
                description: "Processes data with AI",
              },
            },
            {
              id: uuidv4(),
              type: "action",
              position: { x: 100, y: 250 },
              data: {
                label: "Data Output",
                description: "Outputs processed data",
              },
            },
          ];
        } else {
          initialNodes = [
            {
              id: uuidv4(),
              type: "trigger",
              position: { x: 100, y: 100 },
              data: {
                label: "Start",
                description: "Triggers the workflow",
              },
            },
            {
              id: uuidv4(),
              type: "action",
              position: { x: 100, y: 250 },
              data: {
                label: "Process Data",
                description: "Processes input data",
              },
            },
            {
              id: uuidv4(),
              type: "condition",
              position: { x: 100, y: 400 },
              data: {
                label: "Validate",
                description: "Validates the data",
              },
            },
          ];

          // Create edges between nodes
          initialEdges = [
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
        }

        setNodes(initialNodes);
        setEdges(initialEdges);

        // Create the agent
        const appNames = {
          "erp-sap": "SAP ERP Agent",
          "erp-oracle": "Oracle ERP Agent",
          "erp-netsuite": "NetSuite Agent",
          langchain: "LangChain Agent",
          langflow: "LangFlow Agent",
          "custom-api": "Custom API Agent",
        };

        const newAgent = await createAgent({
          name: appNames[selectedAppId as keyof typeof appNames] || "New Agent",
          description: `Agent for ${selectedAppId}`,
          nodes: initialNodes,
          edges: initialEdges,
        });

        setAgentName(newAgent.name);
        setCurrentView("canvas");
      };

      initializeAgent();
    }
  }, [selectedAppId, createAgent, currentAgent]);

  // Update agent store when nodes or edges change
  useEffect(() => {
    if (currentAgent && (nodes.length > 0 || edges.length > 0)) {
      updateNodes(nodes);
      updateEdges(edges);
    }
  }, [nodes, edges, currentAgent, updateNodes, updateEdges]);

  // Handle view change (canvas, code editor, simulation)
  const handleViewChange = (
    view: "canvas" | "code" | "simulation" | "app" | "client",
  ) => {
    setCurrentView(view);
  };

  // Handle node selection in the canvas
  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  // Handle app selection
  const handleAppSelect = (app: any) => {
    setSelectedAppId(app.id);
  };

  // Find the selected node to pass to properties panel
  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Agent Header */}
      <AgentHeader
        agentName={agentName}
        currentView={currentView}
        onViewChange={handleViewChange}
        onSave={() => console.log("Saving agent...")}
        onDeploy={() => console.log("Deploying agent...")}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {currentView === "app" ? (
          <div className="flex-1 p-6 flex items-center justify-center">
            <div className="w-full max-w-2xl">
              <AppSelector
                onSelect={handleAppSelect}
                selectedAppId={selectedAppId || undefined}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Left Sidebar - Component Palette */}
            <div className="w-64 border-r border-border">
              <ComponentPalette
                onDragStart={(component) =>
                  console.log("Dragging component:", component)
                }
              />
            </div>

            {/* Main Content - Canvas/Code Editor/Simulation */}
            <div className="flex-1 overflow-hidden">
              {currentView === "canvas" && (
                <DraggableAgentCanvas
                  nodes={nodes}
                  edges={edges}
                  onNodeSelect={handleNodeSelect}
                  onCanvasChange={(updatedNodes, updatedEdges) => {
                    setNodes(updatedNodes);
                    setEdges(updatedEdges);
                  }}
                />
              )}

              {currentView === "code" && (
                <RealCodeEditor
                  agentId={currentAgent?.id}
                  nodeId={selectedNodeId || undefined}
                  onSave={(code) => console.log("Code saved:", code)}
                  onRun={() => console.log("Running code...")}
                />
              )}

              {currentView === "simulation" && (
                <RealSimulationPanel
                  agentId={currentAgent?.id}
                  onRunSimulation={(mockDataId) =>
                    console.log("Running simulation with:", mockDataId)
                  }
                />
              )}

              {currentView === "client" && (
                <RealAgentClient agentId={currentAgent?.id} />
              )}
            </div>

            {/* Right Sidebar - Properties Panel or LangChain Integration */}
            <div className="w-80 border-l border-border">
              {selectedAppId === "langchain" && currentView === "canvas" ? (
                <LangChainIntegration
                  onSave={(config) =>
                    console.log("LangChain config saved:", config)
                  }
                />
              ) : (
                <PropertiesPanel
                  selectedComponent={
                    selectedNode
                      ? {
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
                        }
                      : undefined
                  }
                  onPropertyChange={(componentId, propertyId, value) => {
                    if (propertyId === "name" || propertyId === "description") {
                      setNodes(
                        nodes.map((node) => {
                          if (node.id === componentId) {
                            return {
                              ...node,
                              data: {
                                ...node.data,
                                label:
                                  propertyId === "name"
                                    ? value
                                    : node.data.label,
                                description:
                                  propertyId === "description"
                                    ? value
                                    : node.data.description,
                              },
                            };
                          }
                          return node;
                        }),
                      );
                    }
                  }}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAgentPage;
