import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bot, Sparkles, ArrowRight, Loader2, Check } from "lucide-react";

interface AIAssistantWizardProps {
  onComplete?: (agentConfig: any) => void;
  onCancel?: () => void;
}

const AIAssistantWizard: React.FC<AIAssistantWizardProps> = ({
  onComplete = () => {},
  onCancel = () => {},
}) => {
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [agentName, setAgentName] = useState<string>("");
  const [generatedComponents, setGeneratedComponents] = useState<any[]>([]);
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

  // Mock function to generate agent components based on description
  const generateAgentComponents = async () => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock generated components
    const mockComponents = [
      {
        id: "trigger-1",
        type: "trigger",
        name: "New Invoice Webhook",
        description: "Triggers when a new invoice is received via webhook",
        confidence: 0.95,
      },
      {
        id: "action-1",
        type: "action",
        name: "Extract Invoice Data",
        description:
          "Uses AI to extract key information from invoice documents",
        confidence: 0.92,
      },
      {
        id: "condition-1",
        type: "condition",
        name: "Validate Invoice",
        description: "Checks if the invoice data is valid and complete",
        confidence: 0.88,
      },
      {
        id: "action-2",
        type: "action",
        name: "Update ERP System",
        description: "Sends the processed invoice data to the ERP system",
        confidence: 0.85,
      },
      {
        id: "action-3",
        type: "action",
        name: "Send Notification",
        description:
          "Notifies relevant stakeholders about the processed invoice",
        confidence: 0.82,
      },
    ];

    setGeneratedComponents(mockComponents);
    setSelectedComponents(mockComponents.map((c) => c.id)); // Select all by default
    setLoading(false);
    setStep(2);
  };

  // Handle component selection toggle
  const toggleComponentSelection = (componentId: string) => {
    setSelectedComponents((prev) =>
      prev.includes(componentId)
        ? prev.filter((id) => id !== componentId)
        : [...prev, componentId],
    );
  };

  // Create the agent with selected components
  const createAgent = async () => {
    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Filter selected components
    const finalComponents = generatedComponents.filter((c) =>
      selectedComponents.includes(c.id),
    );

    // Create agent configuration
    const agentConfig = {
      name: agentName,
      description,
      components: finalComponents,
      // Additional configuration would be generated here
      nodes: finalComponents.map((component, index) => ({
        id: component.id,
        type: component.type,
        position: { x: 100, y: 100 + index * 150 },
        data: {
          label: component.name,
          description: component.description,
        },
      })),
      edges: finalComponents.slice(0, -1).map((component, index) => ({
        id: `e${component.id}-${finalComponents[index + 1].id}`,
        source: component.id,
        target: finalComponents[index + 1].id,
      })),
    };

    setLoading(false);
    onComplete(agentConfig);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <CardTitle>AI-Assisted Agent Creation</CardTitle>
        </div>
        <CardDescription>
          Describe what you want your agent to do, and we'll help you create it
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex items-center ${i < 3 ? "flex-1" : ""}`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center ${
                    step === i
                      ? "bg-primary text-primary-foreground"
                      : step > i
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > i ? <Check className="h-4 w-4" /> : i}
                </div>
                {i < 3 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${step > i ? "bg-primary/20" : "bg-muted"}`}
                  />
                )}
                <div
                  className={`text-sm ${
                    step === i
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {i === 1
                    ? "Describe"
                    : i === 2
                      ? "Review Components"
                      : "Create Agent"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="agent-name" className="text-sm font-medium">
                Agent Name
              </label>
              <Input
                id="agent-name"
                placeholder="Enter a name for your agent"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="agent-description"
                className="text-sm font-medium"
              >
                Describe what you want your agent to do
              </label>
              <Textarea
                id="agent-description"
                placeholder="Example: I need an agent that processes incoming invoices, extracts key information, validates the data, and updates our ERP system."
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Be as specific as possible about the tasks, inputs, and outputs
                of your agent.
              </p>
            </div>

            <div className="bg-muted/30 p-4 rounded-md border">
              <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                AI Assistant Tips
              </h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>
                  • Mention specific data sources or systems your agent should
                  interact with
                </li>
                <li>
                  • Describe the format of inputs (e.g., PDF invoices, CSV
                  files)
                </li>
                <li>• Specify any validation rules or business logic</li>
                <li>• Include details about notifications or alerts</li>
              </ul>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Suggested Components</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your description, we've generated the following
              components for your agent. Review and customize as needed.
            </p>

            <div className="space-y-3">
              {generatedComponents.map((component) => (
                <div
                  key={component.id}
                  className={`p-3 rounded-md border ${
                    selectedComponents.includes(component.id)
                      ? "border-primary/50 bg-primary/5"
                      : "border-border bg-background"
                  } cursor-pointer transition-colors`}
                  onClick={() => toggleComponentSelection(component.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-sm border ${
                          selectedComponents.includes(component.id)
                            ? "bg-primary border-primary text-primary-foreground flex items-center justify-center"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedComponents.includes(component.id) && (
                          <Check className="h-3 w-3" />
                        )}
                      </div>
                      <span className="font-medium">{component.name}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          component.type === "trigger"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : component.type === "action"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {component.type}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs font-normal">
                      {Math.round(component.confidence * 100)}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 ml-6">
                    {component.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Agent Summary</h3>

            <div className="bg-muted/30 p-4 rounded-md border space-y-3">
              <div>
                <span className="text-xs text-muted-foreground">Name</span>
                <p className="font-medium">{agentName}</p>
              </div>

              <div>
                <span className="text-xs text-muted-foreground">
                  Description
                </span>
                <p className="text-sm">{description}</p>
              </div>

              <Separator />

              <div>
                <span className="text-xs text-muted-foreground">
                  Components
                </span>
                <div className="mt-2 space-y-2">
                  {generatedComponents
                    .filter((c) => selectedComponents.includes(c.id))
                    .map((component) => (
                      <div
                        key={component.id}
                        className="text-sm flex items-center gap-2"
                      >
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            component.type === "trigger"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : component.type === "action"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          }`}
                        >
                          {component.type}
                        </Badge>
                        <span>{component.name}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-md border">
              <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-yellow-500" />
                Next Steps
              </h3>
              <p className="text-sm text-muted-foreground">
                After creating your agent, you can further customize it in the
                canvas view, add code in the code editor, and test it in the
                simulation panel.
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {step > 1 ? (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={loading}
          >
            Back
          </Button>
        ) : (
          <Button variant="outline" onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
        )}

        {step === 1 && (
          <Button
            onClick={generateAgentComponents}
            disabled={!description.trim() || !agentName.trim() || loading}
            className="gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Components
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}

        {step === 2 && (
          <Button
            onClick={() => setStep(3)}
            disabled={selectedComponents.length === 0 || loading}
            className="gap-2"
          >
            Review Agent
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}

        {step === 3 && (
          <Button onClick={createAgent} disabled={loading} className="gap-2">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Agent
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AIAssistantWizard;
