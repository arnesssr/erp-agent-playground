import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  ZoomIn,
  ZoomOut,
  Move,
  Trash,
  Save,
  Undo,
  Redo,
} from "lucide-react";

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

interface AgentCanvasProps {
  nodes?: Node[];
  edges?: Edge[];
  onNodeSelect?: (nodeId: string) => void;
  onCanvasChange?: (nodes: Node[], edges: Edge[]) => void;
}

const AgentCanvas = ({
  nodes = [
    {
      id: "1",
      type: "trigger",
      position: { x: 100, y: 100 },
      data: { label: "Start Trigger", description: "Initiates the workflow" },
    },
    {
      id: "2",
      type: "action",
      position: { x: 100, y: 250 },
      data: { label: "Fetch Data", description: "Retrieves data from ERP" },
    },
    {
      id: "3",
      type: "condition",
      position: { x: 100, y: 400 },
      data: { label: "Validate Data", description: "Checks if data is valid" },
    },
  ],
  edges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
  ],
  onNodeSelect = () => {},
  onCanvasChange = () => {},
}: AgentCanvasProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    onNodeSelect(nodeId);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "trigger":
        return "bg-blue-100 border-blue-500";
      case "action":
        return "bg-green-100 border-green-500";
      case "condition":
        return "bg-yellow-100 border-yellow-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const renderEdges = useCallback(() => {
    return edges.map((edge) => {
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);

      if (!sourceNode || !targetNode) return null;

      const sourceX = sourceNode.position.x + 75; // middle of node width
      const sourceY = sourceNode.position.y + 50; // bottom of node
      const targetX = targetNode.position.x + 75; // middle of node width
      const targetY = targetNode.position.y; // top of node

      // Calculate control points for curved line
      const midY = (sourceY + targetY) / 2;

      const path = `M${sourceX},${sourceY} C${sourceX},${midY} ${targetX},${midY} ${targetX},${targetY}`;

      return (
        <g key={edge.id}>
          <path
            d={path}
            stroke="#888"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
          {edge.label && (
            <text
              x={(sourceX + targetX) / 2}
              y={midY - 10}
              textAnchor="middle"
              fill="#666"
              fontSize="12"
            >
              {edge.label}
            </text>
          )}
        </g>
      );
    });
  }, [edges, nodes]);

  return (
    <div className="flex flex-col h-full w-full bg-white border rounded-md overflow-hidden">
      <div className="flex items-center justify-between p-2 border-b bg-gray-50">
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Move className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pan Canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Undo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Redo className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Selected</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save Canvas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="relative flex-1 overflow-hidden bg-gray-50 bg-grid-pattern"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath fill='%23e5e7eb' d='M1,1 L1,19 L19,19 L19,1 L1,1 Z M0,0 L20,0 L20,20 L0,20 L0,0 Z'/%3E%3C/svg%3E")`,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
        }}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
      >
        <div
          className="absolute"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            width: "100%",
            height: "100%",
          }}
        >
          <svg width="100%" height="100%" className="absolute top-0 left-0">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#888" />
              </marker>
            </defs>
            {renderEdges()}
          </svg>

          {nodes.map((node) => (
            <div
              key={node.id}
              className={cn(
                "absolute p-4 w-[150px] rounded-md border-2 cursor-pointer transition-all",
                getNodeColor(node.type),
                selectedNode === node.id ? "ring-2 ring-blue-500" : "",
              )}
              style={{
                left: node.position.x,
                top: node.position.y,
              }}
              onClick={() => handleNodeClick(node.id)}
            >
              <div className="font-medium text-sm">{node.data.label}</div>
              {node.data.description && (
                <div className="text-xs text-gray-500 mt-1">
                  {node.data.description}
                </div>
              )}
            </div>
          ))}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-4 right-4 bg-white shadow-md"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default AgentCanvas;
