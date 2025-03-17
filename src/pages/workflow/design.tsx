import React from "react";
import { Puzzle, Plus, Save, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const WorkflowDesignPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Puzzle className="h-6 w-6 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">Agent Design Canvas</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Design your agent workflow by connecting components
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Test Run
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar - Component palette */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
          <h2 className="font-medium mb-3">Components</h2>
          <div className="space-y-2">
            {[
              { name: "Data Source", category: "Input" },
              { name: "Processor", category: "Processing" },
              { name: "AI Model", category: "Models" },
              { name: "Output", category: "Output" },
              { name: "Decision", category: "Logic" },
              { name: "Loop", category: "Logic" },
              { name: "API Call", category: "Integration" },
              { name: "Database", category: "Storage" },
            ].map((component) => (
              <div
                key={component.name}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-850 cursor-move hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
              >
                <div className="text-sm font-medium">{component.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {component.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main canvas area */}
        <div className="flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto p-4">
          <div className="h-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center p-6">
              <Puzzle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Design Your Agent Workflow
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                Drag components from the left panel and connect them to create
                your agent workflow.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add First Component
              </Button>
            </div>
          </div>
        </div>

        {/* Right sidebar - Properties panel */}
        <div className="w-80 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
          <h2 className="font-medium mb-3">Properties</h2>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Select a component to view and edit its properties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDesignPage;
