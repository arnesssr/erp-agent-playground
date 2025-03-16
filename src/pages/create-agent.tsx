import React, { useState } from "react";
import AgentHeader from "@/components/agent-playground/AgentHeader";
import AgentCanvas from "@/components/agent-playground/AgentCanvas";
import ComponentPalette from "@/components/agent-playground/ComponentPalette";
import PropertiesPanel from "@/components/agent-playground/PropertiesPanel";
import CodeEditor from "@/components/agent-playground/CodeEditor";
import SimulationPanel from "@/components/agent-playground/SimulationPanel";

const CreateAgentPage = () => {
  const [currentView, setCurrentView] = useState<
    "canvas" | "code" | "simulation"
  >("canvas");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Mock data for the agent
  const [agentName, setAgentName] = useState("New Invoice Processing Agent");

  // Mock nodes and edges for the canvas
  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "trigger",
      position: { x: 100, y: 100 },
      data: {
        label: "New Invoice",
        description: "Triggers when a new invoice is received",
      },
    },
    {
      id: "2",
      type: "action",
      position: { x: 100, y: 250 },
      data: {
        label: "Extract Data",
        description: "Extracts data from invoice",
      },
    },
    {
      id: "3",
      type: "condition",
      position: { x: 100, y: 400 },
      data: {
        label: "Validate Invoice",
        description: "Checks if invoice is valid",
      },
    },
  ]);

  const [edges, setEdges] = useState([
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ]);

  // Mock simulation data
  const [simulationData, setSimulationData] = useState({
    status: "idle" as "idle" | "running" | "success" | "error",
    logs: [
      {
        type: "info" as "info" | "error" | "success",
        message: "Agent ready for simulation",
        timestamp: new Date().toISOString(),
      },
      {
        type: "info" as "info" | "error" | "success",
        message: "Select mock data and run simulation",
        timestamp: new Date().toISOString(),
      },
    ],
  });

  // Handle view change (canvas, code editor, simulation)
  const handleViewChange = (view: "canvas" | "code" | "simulation") => {
    setCurrentView(view);
  };

  // Handle node selection in the canvas
  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  // Handle running a simulation
  const handleRunSimulation = () => {
    // Update simulation status to running
    setSimulationData({
      ...simulationData,
      status: "running",
      logs: [
        ...simulationData.logs,
        {
          type: "info",
          message: "Starting simulation...",
          timestamp: new Date().toISOString(),
        },
      ],
    });

    // Simulate a delay and then update with success
    setTimeout(() => {
      setSimulationData({
        status: "success",
        logs: [
          ...simulationData.logs,
          {
            type: "info",
            message: "Processing invoices...",
            timestamp: new Date().toISOString(),
          },
          {
            type: "success",
            message: "Successfully processed 42 invoices",
            timestamp: new Date().toISOString(),
          },
          {
            type: "error",
            message: "Failed to process 3 invoices due to missing data",
            timestamp: new Date().toISOString(),
          },
        ],
      });
    }, 2000);
  };

  // Find the selected node to pass to properties panel
  const selectedNode = selectedNodeId
    ? {
        id: selectedNodeId,
        type: nodes.find((n) => n.id === selectedNodeId)?.type || "",
        name: nodes.find((n) => n.id === selectedNodeId)?.data.label || "",
        propertyGroups: [
          {
            title: "General",
            properties: [
              {
                id: "name",
                name: "Name",
                type: "text",
                value:
                  nodes.find((n) => n.id === selectedNodeId)?.data.label || "",
              },
              {
                id: "description",
                name: "Description",
                type: "textarea",
                value:
                  nodes.find((n) => n.id === selectedNodeId)?.data
                    .description || "",
              },
              { id: "enabled", name: "Enabled", type: "switch", value: true },
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
              { id: "retries", name: "Retries", type: "number", value: 3 },
            ],
          },
        ],
      }
    : undefined;

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
            <AgentCanvas
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
            <CodeEditor
              onCodeChange={(code) => console.log("Code changed:", code)}
              onRun={() => console.log("Running code...")}
              onSave={() => console.log("Saving code...")}
            />
          )}

          {currentView === "simulation" && (
            <SimulationPanel
              simulationData={simulationData}
              onRunSimulation={handleRunSimulation}
            />
          )}
        </div>

        {/* Right Sidebar - Properties Panel */}
        <div className="w-80 border-l border-border">
          <PropertiesPanel
            selectedComponent={selectedNode}
            onPropertyChange={(componentId, propertyId, value) => {
              console.log("Property changed:", {
                componentId,
                propertyId,
                value,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAgentPage;
