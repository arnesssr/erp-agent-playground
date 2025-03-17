import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface ComponentSidebarProps {
  onDragStart?: (component: ComponentItem) => void;
  components?: ComponentItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const defaultComponents: ComponentItem[] = [
  // Models
  {
    id: "model-llm",
    name: "LLM",
    description: "Large Language Model",
    icon: (
      <div className="w-8 h-8 bg-pink-100 rounded-md flex items-center justify-center text-pink-600 dark:bg-pink-900 dark:text-pink-300">
        LLM
      </div>
    ),
    category: "models",
  },
  {
    id: "model-embedding",
    name: "Embedding",
    description: "Text embedding model",
    icon: (
      <div className="w-8 h-8 bg-pink-100 rounded-md flex items-center justify-center text-pink-600 dark:bg-pink-900 dark:text-pink-300">
        EMB
      </div>
    ),
    category: "models",
  },

  // Prompts
  {
    id: "prompt-template",
    name: "Prompt Template",
    description: "Template for prompts",
    icon: (
      <div className="w-8 h-8 bg-violet-100 rounded-md flex items-center justify-center text-violet-600 dark:bg-violet-900 dark:text-violet-300">
        PT
      </div>
    ),
    category: "prompts",
  },
  {
    id: "prompt-few-shot",
    name: "Few Shot",
    description: "Few-shot examples",
    icon: (
      <div className="w-8 h-8 bg-violet-100 rounded-md flex items-center justify-center text-violet-600 dark:bg-violet-900 dark:text-violet-300">
        FS
      </div>
    ),
    category: "prompts",
  },

  // Data
  {
    id: "data-loader",
    name: "Data Loader",
    description: "Load data from source",
    icon: (
      <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center text-orange-600 dark:bg-orange-900 dark:text-orange-300">
        DL
      </div>
    ),
    category: "data",
  },
  {
    id: "data-transformer",
    name: "Transformer",
    description: "Transform data format",
    icon: (
      <div className="w-8 h-8 bg-orange-100 rounded-md flex items-center justify-center text-orange-600 dark:bg-orange-900 dark:text-orange-300">
        DT
      </div>
    ),
    category: "data",
  },

  // Inputs
  {
    id: "input-text",
    name: "Text Input",
    description: "Text input component",
    icon: (
      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-300">
        TI
      </div>
    ),
    category: "inputs",
  },
  {
    id: "input-file",
    name: "File Input",
    description: "File upload component",
    icon: (
      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 dark:bg-blue-900 dark:text-blue-300">
        FI
      </div>
    ),
    category: "inputs",
  },

  // Outputs
  {
    id: "output-text",
    name: "Text Output",
    description: "Display text output",
    icon: (
      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-300">
        TO
      </div>
    ),
    category: "outputs",
  },
  {
    id: "output-chart",
    name: "Chart Output",
    description: "Display chart visualization",
    icon: (
      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center text-green-600 dark:bg-green-900 dark:text-green-300">
        CO
      </div>
    ),
    category: "outputs",
  },

  // Logic
  {
    id: "logic-if",
    name: "If Condition",
    description: "Branch based on condition",
    icon: (
      <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
        If
      </div>
    ),
    category: "logic",
  },
  {
    id: "logic-switch",
    name: "Switch",
    description: "Multiple condition branches",
    icon: (
      <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300">
        Sw
      </div>
    ),
    category: "logic",
  },
];

const ComponentSidebar = ({
  onDragStart,
  components = defaultComponents,
  collapsed = false,
  onToggleCollapse = () => {},
}: ComponentSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredComponents = searchTerm
    ? components.filter(
        (comp) =>
          comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : activeCategory === "all"
      ? components
      : components.filter((comp) => comp.category === activeCategory);

  const handleDragStart = (e: React.DragEvent, component: ComponentItem) => {
    e.dataTransfer.setData("component", JSON.stringify(component));
    if (onDragStart) onDragStart(component);
  };

  if (collapsed) {
    return (
      <div className="w-12 h-full bg-black border-r border-gray-800 flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4 text-white"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center space-y-4">
          {["inputs", "outputs", "prompts", "data", "models", "logic"].map(
            (category) => (
              <div
                key={category}
                className="w-8 h-8 rounded-md bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-300 cursor-pointer hover:bg-gray-700"
                title={category.charAt(0).toUpperCase() + category.slice(1)}
              >
                {category.charAt(0).toUpperCase()}
              </div>
            ),
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 h-full bg-black border-r border-gray-800 flex flex-col overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <h3 className="text-lg font-medium text-white">Components</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="text-white"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search components..."
            className="pl-8 bg-gray-900 border-gray-700 text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex border-b border-gray-800 overflow-x-auto">
        {[
          { id: "all", label: "All" },
          { id: "inputs", label: "Inputs" },
          { id: "outputs", label: "Outputs" },
          { id: "prompts", label: "Prompts" },
          { id: "data", label: "Data" },
          { id: "models", label: "Models" },
          { id: "logic", label: "Logic" },
        ].map((cat) => (
          <button
            key={cat.id}
            className={cn(
              "px-4 py-2 text-sm whitespace-nowrap",
              activeCategory === cat.id
                ? "text-white border-b-2 border-blue-500"
                : "text-gray-400 hover:text-white",
            )}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <ComponentList
          components={filteredComponents}
          onDragStart={handleDragStart}
        />
      </ScrollArea>
    </div>
  );
};

interface ComponentListProps {
  components: ComponentItem[];
  onDragStart: (e: React.DragEvent, component: ComponentItem) => void;
}

const ComponentList = ({ components, onDragStart }: ComponentListProps) => {
  if (components.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No components found</div>
    );
  }

  return (
    <div className="p-2">
      {components.map((component) => (
        <Card
          key={component.id}
          className={cn(
            "p-3 mb-2 cursor-grab hover:bg-gray-800 transition-colors",
            "border border-gray-800 bg-gray-900 text-white",
          )}
          draggable
          onDragStart={(e) => onDragStart(e, component)}
        >
          <div className="flex items-center gap-3">
            {component.icon}
            <div>
              <h4 className="font-medium text-white">{component.name}</h4>
              <p className="text-xs text-gray-400">{component.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ComponentSidebar;
