import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ModelOption {
  provider: string;
  modelName: string;
  displayName: string;
}

interface ModelSelectorProps {
  onModelSelect: (provider: string, modelName: string) => void;
  defaultProvider?: string;
  defaultModelName?: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  onModelSelect,
  defaultProvider = "openai",
  defaultModelName = "gpt-4",
}) => {
  const [availableModels, setAvailableModels] = useState<ModelOption[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(defaultProvider);
  const [selectedModel, setSelectedModel] = useState(defaultModelName);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch available models on component mount
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from an API
        // const response = await fetch('/api/models/available');

        // For demo purposes, we'll use hardcoded models
        setAvailableModels([
          { provider: "openai", modelName: "gpt-4", displayName: "GPT-4" },
          {
            provider: "openai",
            modelName: "gpt-3.5-turbo",
            displayName: "GPT-3.5 Turbo",
          },
          {
            provider: "anthropic",
            modelName: "claude-3-opus",
            displayName: "Claude 3 Opus",
          },
          {
            provider: "anthropic",
            modelName: "claude-3-sonnet",
            displayName: "Claude 3 Sonnet",
          },
          {
            provider: "google",
            modelName: "gemini-pro",
            displayName: "Gemini Pro",
          },
        ]);
      } catch (err: any) {
        setError(err.message || "Error fetching models");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  // Group models by provider
  const modelsByProvider: Record<string, ModelOption[]> =
    availableModels.reduce(
      (acc, model) => {
        if (!acc[model.provider]) {
          acc[model.provider] = [];
        }
        acc[model.provider].push(model);
        return acc;
      },
      {} as Record<string, ModelOption[]>,
    );

  // Available providers
  const providers = Object.keys(modelsByProvider);

  // Handle provider change
  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);

    // Select first model from the new provider
    if (modelsByProvider[provider] && modelsByProvider[provider].length > 0) {
      const firstModel = modelsByProvider[provider][0].modelName;
      setSelectedModel(firstModel);
      onModelSelect(provider, firstModel);
    }
  };

  // Handle model change
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    onModelSelect(selectedProvider, model);
  };

  if (loading) {
    return <div className="text-center p-4">Loading available models...</div>;
  }

  return (
    <Card className="w-full bg-background border shadow-sm">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-brain-circuit"
          >
            <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z" />
            <path d="M16 8V5c0-1.1.9-2 2-2" />
            <path d="M12 13h4" />
            <path d="M12 18h6a2 2 0 0 1 2 2v1" />
            <path d="M12 8h8" />
            <path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
            <path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
            <path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
            <path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
          </svg>
          Select Language Model
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label htmlFor="provider" className="text-sm font-medium">
              Provider
            </Label>
            <Select
              value={selectedProvider}
              onValueChange={handleProviderChange}
            >
              <SelectTrigger id="provider" className="h-10">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider.charAt(0).toUpperCase() + provider.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Choose the AI provider for your agent
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="model" className="text-sm font-medium">
              Model
            </Label>
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger id="model" className="h-10">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {selectedProvider &&
                  modelsByProvider[selectedProvider]?.map((model) => (
                    <SelectItem key={model.modelName} value={model.modelName}>
                      {model.displayName || model.modelName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Select the specific model to power your agent
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelSelector;
