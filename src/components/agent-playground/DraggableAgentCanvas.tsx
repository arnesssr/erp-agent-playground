import React, { useState, useRef, useCallback, useEffect } from "react";
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

interface AgentCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodeSelect?: (nodeId: string) => void;
  onCanvasChange?: (nodes: Node[], edges: Edge[]) => void;
}

const DraggableAgentCanvas = ({
  nodes = [],
  edges = [],
  onNodeSelect = () => {},
  onCanvasChange = () => {},
}: AgentCanvasProps) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [draggedNodeStartPos, setDraggedNodeStartPos] = useState({
    x: 0,
    y: 0,
  });
  const [localNodes, setLocalNodes] = useState<Node[]>(nodes);
  const [localEdges, setLocalEdges] = useState<Edge[]>(edges);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Update local state when props change
  useEffect(() => {
    setLocalNodes(nodes);
    setLocalEdges(edges);
  }, [nodes, edges]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleNodeClick = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
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
    } else if (draggedNode) {
      // Calculate the position change considering zoom level
      const dx = (e.clientX - dragStart.x) / zoom;
      const dy = (e.clientY - dragStart.y) / zoom;

      // Update the node position
      setLocalNodes((prev) =>
        prev.map((node) => {
          if (node.id === draggedNode) {
            return {
              ...node,
              position: {
                x: draggedNodeStartPos.x + dx,
                y: draggedNodeStartPos.y + dy,
              },
            };
          }
          return node;
        }),
      );
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }

    if (draggedNode) {
      setDraggedNode(null);
      // Notify parent of the change
      onCanvasChange(localNodes, localEdges);
    }
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    const node = localNodes.find((n) => n.id === nodeId);
    if (node) {
      setDraggedNode(nodeId);
      setDraggedNodeStartPos({ ...node.position });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "trigger":
        return "bg-blue-100 border-blue-500";
      case "action":
        return "bg-green-100 border-green-500";
      case "condition":
        return "bg-yellow-100 border-yellow-500";
      case "langchain":
        return "bg-purple-100 border-purple-500";
      case "langflow":
        return "bg-indigo-100 border-indigo-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  const handleAddNode = () => {
    const newNode: Node = {
      id: uuidv4(),
      type: "action",
      position: { x: 100, y: 100 },
      data: { label: "New Node", description: "New node description" },
    };

    const updatedNodes = [...localNodes, newNode];
    setLocalNodes(updatedNodes);
    onCanvasChange(updatedNodes, localEdges);
  };

  const handleDeleteSelected = () => {
    if (!selectedNode) return;

    // Remove the selected node
    const updatedNodes = localNodes.filter((node) => node.id !== selectedNode);

    // Remove any edges connected to this node
    const updatedEdges = localEdges.filter(
      (edge) => edge.source !== selectedNode && edge.target !== selectedNode,
    );

    setLocalNodes(updatedNodes);
    setLocalEdges(updatedEdges);
    setSelectedNode(null);
    onCanvasChange(updatedNodes, updatedEdges);
  };

  const handleSaveCanvas = () => {
    onCanvasChange(localNodes, localEdges);
  };

  const renderEdges = useCallback(() => {
    return localEdges.map((edge) => {
      const sourceNode = localNodes.find((n) => n.id === edge.source);
      const targetNode = localNodes.find((n) => n.id === edge.target);

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
  }, [localEdges, localNodes]);

  const handleCreateConnection = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;

    // Check if connection already exists
    const connectionExists = localEdges.some(
      (edge) => edge.source === sourceId && edge.target === targetId,
    );

    if (!connectionExists) {
      const newEdge: Edge = {
        id: `e-${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
      };

      const updatedEdges = [...localEdges, newEdge];
      setLocalEdges(updatedEdges);
      onCanvasChange(localNodes, updatedEdges);
    }
  };

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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDeleteSelected}
                  disabled={!selectedNode}
                >
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
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSaveCanvas}
                >
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

          {localNodes.map((node) => (
            <div
              key={node.id}
              className={cn(
                "absolute p-4 w-[150px] rounded-md border-2 cursor-pointer transition-all",
                getNodeColor(node.type),
                selectedNode === node.id ? "ring-2 ring-blue-500" : "",
                draggedNode === node.id ? "opacity-70" : "",
              )}
              style={{
                left: node.position.x,
                top: node.position.y,
              }}
              onClick={(e) => handleNodeClick(e, node.id)}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
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
                  onClick={handleAddNode}
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

export default DraggableAgentCanvas;
