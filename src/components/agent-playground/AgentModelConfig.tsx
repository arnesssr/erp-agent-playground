import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ModelSelector from "@/components/model-selector/ModelSelector";
import IntegrationSelector from "@/components/integration-selector/IntegrationSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Puzzle, Zap, Save, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

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
    <Card className="w-full h-full flex flex-col bg-background border rounded-lg shadow-md overflow-hidden">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Agent Configuration
        </CardTitle>
        <CardDescription>
          Configure your agent's language model and integrations
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 w-full justify-start gap-2">
            <TabsTrigger
              value="model"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Zap className="h-4 w-4" />
              Model
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="flex items-center gap-2 px-4 py-2"
            >
              <Puzzle className="h-4 w-4" />
              Integrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="model" className="mt-0 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ModelSelector
                onModelSelect={handleModelSelect}
                defaultProvider={selectedModel.provider}
                defaultModelName={selectedModel.modelName}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="integrations" className="mt-0 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <IntegrationSelector
                onIntegrationSelect={handleIntegrationSelect}
              />
            </motion.div>
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="bg-muted/30 rounded-lg p-5 border">
          <h4 className="font-medium mb-4 flex items-center gap-2 text-primary">
            <Save className="h-4 w-4" />
            Configuration Summary
          </h4>

          <div className="space-y-5">
            <div className="bg-background p-3 rounded-md border">
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                Selected Model:
              </p>
              <Badge
                variant="outline"
                className="text-xs font-medium py-1 px-2"
              >
                {selectedModel.provider.charAt(0).toUpperCase() +
                  selectedModel.provider.slice(1)}{" "}
                / {selectedModel.modelName}
              </Badge>
            </div>

            <div className="bg-background p-3 rounded-md border">
              <p className="text-sm font-medium mb-2 text-muted-foreground">
                Connected Integrations:
              </p>
              {selectedIntegrations.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedIntegrations.map((integration) => (
                    <Badge
                      key={integration.id}
                      variant="secondary"
                      className="flex items-center gap-1 cursor-pointer hover:bg-secondary/80 transition-colors"
                      onClick={() => handleRemoveIntegration(integration.id)}
                    >
                      {integration.name}
                      <span className="text-xs ml-1">×</span>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No integrations connected
                </p>
              )}
            </div>
          </div>

          <Button
            onClick={handleSaveConfig}
            className="mt-6 w-full gap-2 group"
          >
            Save Configuration
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentModelConfig;
