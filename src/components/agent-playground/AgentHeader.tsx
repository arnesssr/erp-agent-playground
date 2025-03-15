import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Save, Play, Upload, Settings, HelpCircle } from "lucide-react";

interface AgentHeaderProps {
  agentName?: string;
  onSave?: () => void;
  onDeploy?: () => void;
  onViewChange?: (view: "canvas" | "code" | "simulation") => void;
  currentView?: "canvas" | "code" | "simulation";
}

const AgentHeader = ({
  agentName = "Untitled Agent",
  onSave = () => {},
  onDeploy = () => {},
  onViewChange = () => {},
  currentView = "canvas",
}: AgentHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(agentName);

  const handleNameClick = () => {
    setIsEditing(true);
    setEditedName(agentName);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    // Here you would typically update the agent name in your state/backend
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      // Here you would typically update the agent name in your state/backend
    }
  };

  return (
    <header className="w-full h-20 bg-background border-b border-border flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleKeyDown}
            className="text-xl font-semibold bg-background border border-input rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
        ) : (
          <h1
            className="text-xl font-semibold cursor-pointer hover:text-primary transition-colors"
            onClick={handleNameClick}
          >
            {agentName}
          </h1>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Agent Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Help & Documentation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex items-center space-x-4">
        <Tabs
          defaultValue={currentView}
          onValueChange={(value) =>
            onViewChange(value as "canvas" | "code" | "simulation")
          }
          className="mr-4"
        >
          <TabsList>
            <TabsTrigger value="canvas">Canvas</TabsTrigger>
            <TabsTrigger value="code">Code Editor</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
          </TabsList>
        </Tabs>

        <Button
          variant="outline"
          onClick={onSave}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>

        <Button variant="outline" className="flex items-center space-x-2">
          <Play className="h-4 w-4" />
          <span>Test</span>
        </Button>

        <Button onClick={onDeploy} className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Deploy</span>
        </Button>
      </div>
    </header>
  );
};

export default AgentHeader;
