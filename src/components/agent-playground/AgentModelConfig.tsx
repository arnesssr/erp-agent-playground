import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ModelSelector from "@/components/model-selector/ModelSelector";
import IntegrationSelector from "@/components/integration-selector/IntegrationSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Puzzle, Zap } from "lucide-react";

interface AgentModelConfigProps {
  onSave?: (config: {
    provider: string;
    modelName: string;
    integrations: Array<{ id: string; credentials: Record<string, string> }>;
  }) => void;
}

const AgentModelConfig: React.FC<AgentModelConfigProps> = ({
  onSave = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("model");
  const [selectedModel, setSelectedModel] = useState({
    provider: "openai",
    modelName: "gpt-4",
  });
  const [selectedIntegrations, setSelectedIntegrations] = useState<
    Array<{ id: string; name: string; credentials: Record<string, string> }>
  >([]);

  const handleModelSelect = (provider: string, modelName: string) => {
    setSelectedModel({ provider, modelName });
  };

  const handleIntegrationSelect = (
    integrationId: string,
    credentials: Record<string, string>,
  ) => {
    // Find the name of the integration (in a real app, you'd have this data)
    const integrationName =
      {
        notion: "Notion",
        google_sheets: "Google Sheets",
        salesforce: "Salesforce",
        slack: "Slack",
        jira: "Jira",
      }[integrationId] || integrationId;

    // Add to selected integrations
    setSelectedIntegrations((prev) => [
      ...prev.filter((i) => i.id !== integrationId), // Remove if already exists
      { id: integrationId, name: integrationName, credentials },
    ]);
  };

  const handleRemoveIntegration = (integrationId: string) => {
    setSelectedIntegrations((prev) =>
      prev.filter((integration) => integration.id !== integrationId),
    );
  };

  const handleSaveConfig = () => {
    onSave({
      provider: selectedModel.provider,
      modelName: selectedModel.modelName,
      integrations: selectedIntegrations.map(({ id, credentials }) => ({
        id,
        credentials,
      })),
    });
  };

  return (
    <Card className="w-full h-full flex flex-col bg-background border rounded-md shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Agent Configuration
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="model" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              Model
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="flex items-center gap-1"
            >
              <Puzzle className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="model" className="mt-0">
            <ModelSelector
              onModelSelect={handleModelSelect}
              defaultProvider={selectedModel.provider}
              defaultModelName={selectedModel.modelName}
            />
          </TabsContent>

          <TabsContent value="integrations" className="mt-0">
            <IntegrationSelector
              onIntegrationSelect={handleIntegrationSelect}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 border-t pt-4">
          <h4 className="font-medium mb-3">Configuration Summary</h4>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Selected Model:</p>
              <Badge variant="outline" className="text-xs">
                {selectedModel.provider.charAt(0).toUpperCase() +
                  selectedModel.provider.slice(1)}{" "}
                / {selectedModel.modelName}
              </Badge>
            </div>

            {selectedIntegrations.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">
                  Connected Integrations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedIntegrations.map((integration) => (
                    <Badge
                      key={integration.id}
                      variant="secondary"
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleRemoveIntegration(integration.id)}
                    >
                      {integration.name}
                      <span className="text-xs ml-1">×</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button onClick={handleSaveConfig} className="mt-6">
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentModelConfig;
