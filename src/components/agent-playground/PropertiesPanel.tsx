import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus, Settings, Code, Database } from "lucide-react";

interface PropertyGroup {
  title: string;
  properties: Property[];
}

interface Property {
  id: string;
  name: string;
  type: "text" | "textarea" | "select" | "switch" | "number";
  value: string | boolean | number;
  options?: string[];
  description?: string;
}

interface PropertiesPanelProps {
  selectedComponent?: {
    id: string;
    type: string;
    name: string;
    propertyGroups: PropertyGroup[];
  };
  onPropertyChange?: (
    componentId: string,
    propertyId: string,
    value: any,
  ) => void;
}

const PropertiesPanel = ({
  selectedComponent = {
    id: "comp-1",
    type: "action",
    name: "API Request",
    propertyGroups: [
      {
        title: "General",
        properties: [
          { id: "name", name: "Name", type: "text", value: "API Request" },
          {
            id: "description",
            name: "Description",
            type: "textarea",
            value: "Makes an HTTP request to an external API",
          },
          { id: "enabled", name: "Enabled", type: "switch", value: true },
        ],
      },
      {
        title: "Request Settings",
        properties: [
          {
            id: "method",
            name: "Method",
            type: "select",
            value: "GET",
            options: ["GET", "POST", "PUT", "DELETE"],
          },
          {
            id: "url",
            name: "URL",
            type: "text",
            value: "https://api.example.com/data",
          },
          { id: "timeout", name: "Timeout (ms)", type: "number", value: 5000 },
          { id: "retries", name: "Retries", type: "number", value: 3 },
        ],
      },
      {
        title: "Authentication",
        properties: [
          {
            id: "auth_type",
            name: "Auth Type",
            type: "select",
            value: "Bearer",
            options: ["None", "Basic", "Bearer", "API Key"],
          },
          {
            id: "auth_token",
            name: "Auth Token",
            type: "text",
            value: "${env.API_TOKEN}",
          },
        ],
      },
    ],
  },
  onPropertyChange = () => {},
}: PropertiesPanelProps) => {
  const [activeTab, setActiveTab] = useState("properties");

  const handlePropertyChange = (propertyId: string, value: any) => {
    onPropertyChange(selectedComponent.id, propertyId, value);
  };

  return (
    <Card className="h-full w-full border-l rounded-none shadow-none bg-background">
      {selectedComponent ? (
        <>
          <CardHeader className="px-4 py-3 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">
                {selectedComponent.name}
              </CardTitle>
              <div className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                {selectedComponent.type}
              </div>
            </div>
          </CardHeader>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="px-4 border-b">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="properties" className="text-xs">
                  Properties
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-xs">
                  <Settings className="h-3.5 w-3.5 mr-1" />
                  Advanced
                </TabsTrigger>
                <TabsTrigger value="data" className="text-xs">
                  <Database className="h-3.5 w-3.5 mr-1" />
                  Data
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)]">
              <TabsContent value="properties" className="m-0">
                <CardContent className="p-4 pt-2">
                  {selectedComponent.propertyGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-6">
                      <h3 className="text-sm font-medium mb-3">
                        {group.title}
                      </h3>
                      <div className="space-y-4">
                        {group.properties.map((property) => (
                          <div key={property.id} className="space-y-2">
                            <Label
                              htmlFor={property.id}
                              className="text-xs font-medium"
                            >
                              {property.name}
                            </Label>

                            {property.type === "text" && (
                              <Input
                                id={property.id}
                                value={property.value as string}
                                onChange={(e) =>
                                  handlePropertyChange(
                                    property.id,
                                    e.target.value,
                                  )
                                }
                                className="h-8 text-sm"
                              />
                            )}

                            {property.type === "textarea" && (
                              <Textarea
                                id={property.id}
                                value={property.value as string}
                                onChange={(e) =>
                                  handlePropertyChange(
                                    property.id,
                                    e.target.value,
                                  )
                                }
                                className="text-sm min-h-[80px]"
                              />
                            )}

                            {property.type === "select" && (
                              <Select
                                value={property.value as string}
                                onValueChange={(value) =>
                                  handlePropertyChange(property.id, value)
                                }
                              >
                                <SelectTrigger
                                  id={property.id}
                                  className="h-8 text-sm"
                                >
                                  <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                  {property.options?.map((option) => (
                                    <SelectItem
                                      key={option}
                                      value={option}
                                      className="text-sm"
                                    >
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}

                            {property.type === "switch" && (
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id={property.id}
                                  checked={property.value as boolean}
                                  onCheckedChange={(checked) =>
                                    handlePropertyChange(property.id, checked)
                                  }
                                />
                                <Label
                                  htmlFor={property.id}
                                  className="text-xs text-muted-foreground"
                                >
                                  {(property.value as boolean)
                                    ? "Enabled"
                                    : "Disabled"}
                                </Label>
                              </div>
                            )}

                            {property.type === "number" && (
                              <Input
                                id={property.id}
                                type="number"
                                value={property.value as number}
                                onChange={(e) =>
                                  handlePropertyChange(
                                    property.id,
                                    Number(e.target.value),
                                  )
                                }
                                className="h-8 text-sm"
                              />
                            )}

                            {property.description && (
                              <p className="text-xs text-muted-foreground">
                                {property.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                      {groupIndex <
                        selectedComponent.propertyGroups.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </TabsContent>

              <TabsContent value="advanced" className="m-0">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="custom-code"
                        className="text-sm font-medium mb-2 block"
                      >
                        Custom Code
                      </Label>
                      <div className="relative">
                        <div className="absolute right-2 top-2 z-10">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          id="custom-code"
                          placeholder="// Add custom JavaScript code here"
                          className="font-mono text-sm min-h-[200px] bg-muted/50"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Custom code will be executed when this component runs.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Label className="text-sm font-medium mb-2 block">
                        Custom Headers
                      </Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Header name"
                            className="h-8 text-sm flex-1"
                          />
                          <Input
                            placeholder="Value"
                            className="h-8 text-sm flex-1"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Header name"
                            className="h-8 text-sm flex-1"
                          />
                          <Input
                            placeholder="Value"
                            className="h-8 text-sm flex-1"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs w-full mt-2"
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" /> Add Header
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              <TabsContent value="data" className="m-0">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label
                        htmlFor="input-mapping"
                        className="text-sm font-medium mb-2 block"
                      >
                        Input Data Mapping
                      </Label>
                      <Textarea
                        id="input-mapping"
                        placeholder="${workflow.input}"
                        className="text-sm min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Map input data from previous components using
                        expressions like ${"{"}componentName.output{"}"}
                      </p>
                    </div>

                    <div className="pt-4">
                      <Label
                        htmlFor="output-mapping"
                        className="text-sm font-medium mb-2 block"
                      >
                        Output Data Mapping
                      </Label>
                      <Textarea
                        id="output-mapping"
                        placeholder="${response.body}"
                        className="text-sm min-h-[100px]"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Define how this component's output should be structured
                        for the next components
                      </p>
                    </div>

                    <div className="pt-4">
                      <Label className="text-sm font-medium mb-2 block">
                        Sample Data
                      </Label>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <pre className="text-xs overflow-auto whitespace-pre-wrap">
                          {JSON.stringify(
                            {
                              id: "123",
                              name: "Sample Product",
                              price: 99.99,
                              metadata: {
                                category: "electronics",
                                tags: ["new", "featured"],
                              },
                            },
                            null,
                            2,
                          )}
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </>
      ) : (
        <div className="flex items-center justify-center h-full p-6 text-center">
          <div className="max-w-sm">
            <h3 className="text-lg font-medium mb-2">No Component Selected</h3>
            <p className="text-sm text-muted-foreground">
              Select a component on the canvas to view and edit its properties.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PropertiesPanel;
