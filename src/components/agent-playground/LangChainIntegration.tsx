import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Settings, Play, Save } from "lucide-react";

interface LangChainIntegrationProps {
  onSave: (config: any) => void;
}

const LangChainIntegration: React.FC<LangChainIntegrationProps> = ({
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState("config");
  const [modelProvider, setModelProvider] = useState("openai");
  const [modelName, setModelName] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState("0.7");
  const [maxTokens, setMaxTokens] = useState("2000");
  const [prompt, setPrompt] = useState(
    "You are an AI assistant that helps with ERP data processing. Your task is to:",
  );
  const [code, setCode] = useState(
    `import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

// Initialize the model
const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
  maxTokens: 2000,
});

// Create a prompt template
const promptTemplate = PromptTemplate.fromTemplate(
  "You are an AI assistant that helps with ERP data processing. Your task is to: {task}"
);

// Function to process data
export async function processData(data, task) {
  const formattedPrompt = await promptTemplate.format({ task });
  const response = await model.invoke(formattedPrompt + "\n\nData: " + JSON.stringify(data));
  return response.content;
}`,
  );

  const handleSaveConfig = () => {
    const config = {
      modelProvider,
      modelName,
      temperature: parseFloat(temperature),
      maxTokens: parseInt(maxTokens),
      prompt,
      code,
    };
    onSave(config);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center text-purple-600 font-bold text-xs">
            LC
          </div>
          LangChain Integration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">
              <Settings className="h-4 w-4 mr-2" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="code">
              <Code className="h-4 w-4 mr-2" />
              Code
            </TabsTrigger>
            <TabsTrigger value="test">
              <Play className="h-4 w-4 mr-2" />
              Test
            </TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="mt-4">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model-provider">Model Provider</Label>
                  <Select
                    value={modelProvider}
                    onValueChange={setModelProvider}
                  >
                    <SelectTrigger id="model-provider">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">OpenAI</SelectItem>
                      <SelectItem value="anthropic">Anthropic</SelectItem>
                      <SelectItem value="google">Google AI</SelectItem>
                      <SelectItem value="mistral">Mistral AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-name">Model Name</Label>
                  <Select value={modelName} onValueChange={setModelName}>
                    <SelectTrigger id="model-name">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelProvider === "openai" && (
                        <>
                          <SelectItem value="gpt-3.5-turbo">
                            GPT-3.5 Turbo
                          </SelectItem>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-4-turbo">
                            GPT-4 Turbo
                          </SelectItem>
                        </>
                      )}
                      {modelProvider === "anthropic" && (
                        <>
                          <SelectItem value="claude-2">Claude 2</SelectItem>
                          <SelectItem value="claude-instant">
                            Claude Instant
                          </SelectItem>
                        </>
                      )}
                      {modelProvider === "google" && (
                        <>
                          <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                        </>
                      )}
                      {modelProvider === "mistral" && (
                        <>
                          <SelectItem value="mistral-7b">Mistral 7B</SelectItem>
                          <SelectItem value="mistral-large">
                            Mistral Large
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Controls randomness: 0 is deterministic, 1 is very creative
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    min="100"
                    max="8000"
                    step="100"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Maximum number of tokens to generate
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prompt">Base Prompt</Label>
                  <Textarea
                    id="prompt"
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    The system prompt that defines the AI's behavior
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="code" className="mt-4">
            <div className="space-y-4">
              <div className="relative">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="font-mono text-sm h-[calc(100vh-22rem)] bg-muted/50 p-4"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Customize the LangChain code for your agent. This code will be
                executed when your agent runs.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="test" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-input">Test Input</Label>
                <Textarea
                  id="test-input"
                  rows={6}
                  placeholder="Enter sample data to test your LangChain integration"
                  className="font-mono text-sm"
                />
              </div>

              <Button className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Run Test
              </Button>

              <div className="space-y-2">
                <Label>Test Results</Label>
                <div className="bg-muted/50 p-4 rounded-md h-[calc(100vh-40rem)] overflow-auto">
                  <p className="text-sm text-muted-foreground italic">
                    Test results will appear here...
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveConfig}>
            <Save className="h-4 w-4 mr-2" />
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LangChainIntegration;
