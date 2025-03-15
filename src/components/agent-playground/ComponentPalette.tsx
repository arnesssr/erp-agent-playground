import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ComponentItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface ComponentPaletteProps {
  onDragStart?: (component: ComponentItem) => void;
  components?: ComponentItem[];
}

const defaultComponents: ComponentItem[] = [
  // Triggers
  {
    id: "trigger-schedule",
    name: "Schedule",
    description: "Trigger based on a schedule",
    icon: (
      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
        S
      </div>
    ),
    category: "triggers",
  },
  {
    id: "trigger-webhook",
    name: "Webhook",
    description: "Trigger from external webhook",
    icon: (
      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
        W
      </div>
    ),
    category: "triggers",
  },
  {
    id: "trigger-event",
    name: "Event",
    description: "Trigger on system event",
    icon: (
      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">
        E
      </div>
    ),
    category: "triggers",
  },

  // Actions
  {
    id: "action-api-call",
    name: "API Call",
    description: "Make an API request",
    icon: (
      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center text-green-600">
        A
      </div>
    ),
    category: "actions",
  },
  {
    id: "action-data-transform",
    name: "Transform Data",
    description: "Transform data format",
    icon: (
      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center text-green-600">
        T
      </div>
    ),
    category: "actions",
  },
  {
    id: "action-notification",
    name: "Send Notification",
    description: "Send a notification",
    icon: (
      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center text-green-600">
        N
      </div>
    ),
    category: "actions",
  },

  // Conditions
  {
    id: "condition-if",
    name: "If Condition",
    description: "Branch based on condition",
    icon: (
      <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center text-yellow-600">
        If
      </div>
    ),
    category: "conditions",
  },
  {
    id: "condition-switch",
    name: "Switch",
    description: "Multiple condition branches",
    icon: (
      <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center text-yellow-600">
        Sw
      </div>
    ),
    category: "conditions",
  },

  // Data
  {
    id: "data-variable",
    name: "Variable",
    description: "Store and manage variables",
    icon: (
      <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center text-purple-600">
        V
      </div>
    ),
    category: "data",
  },
  {
    id: "data-array",
    name: "Array",
    description: "Work with arrays of data",
    icon: (
      <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center text-purple-600">
        A
      </div>
    ),
    category: "data",
  },
];

const ComponentPalette = ({
  onDragStart,
  components = defaultComponents,
}: ComponentPaletteProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredComponents = searchTerm
    ? components.filter(
        (comp) =>
          comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          comp.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : components;

  const handleDragStart = (e: React.DragEvent, component: ComponentItem) => {
    e.dataTransfer.setData("component", JSON.stringify(component));
    if (onDragStart) onDragStart(component);
  };

  return (
    <div className="w-full h-full bg-white dark:bg-gray-950 border rounded-md flex flex-col overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Components</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag components to the canvas
        </p>

        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search components..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="triggers" className="flex-1 overflow-hidden">
        <TabsList className="w-full justify-start px-4 pt-2 bg-gray-50 dark:bg-gray-900 border-b">
          <TabsTrigger value="triggers">Triggers</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="triggers" className="p-0 m-0">
            <ComponentList
              components={filteredComponents.filter(
                (c) => c.category === "triggers",
              )}
              onDragStart={handleDragStart}
            />
          </TabsContent>

          <TabsContent value="actions" className="p-0 m-0">
            <ComponentList
              components={filteredComponents.filter(
                (c) => c.category === "actions",
              )}
              onDragStart={handleDragStart}
            />
          </TabsContent>

          <TabsContent value="conditions" className="p-0 m-0">
            <ComponentList
              components={filteredComponents.filter(
                (c) => c.category === "conditions",
              )}
              onDragStart={handleDragStart}
            />
          </TabsContent>

          <TabsContent value="data" className="p-0 m-0">
            <ComponentList
              components={filteredComponents.filter(
                (c) => c.category === "data",
              )}
              onDragStart={handleDragStart}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
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
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No components found
      </div>
    );
  }

  return (
    <div className="p-2">
      {components.map((component) => (
        <Card
          key={component.id}
          className={cn(
            "p-3 mb-2 cursor-grab hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",
            "border border-gray-200 dark:border-gray-800",
          )}
          draggable
          onDragStart={(e) => onDragStart(e, component)}
        >
          <div className="flex items-center gap-3">
            {component.icon}
            <div>
              <h4 className="font-medium">{component.name}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {component.description}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ComponentPalette;
