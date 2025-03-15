import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IntegrationOption {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  category: string;
  requiredCredentials: string[];
}

interface IntegrationSelectorProps {
  onIntegrationSelect: (
    integrationId: string,
    credentials: Record<string, string>,
  ) => void;
}

const IntegrationSelector: React.FC<IntegrationSelectorProps> = ({
  onIntegrationSelect,
}) => {
  const [availableIntegrations, setAvailableIntegrations] = useState<
    IntegrationOption[]
  >([]);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(
    null,
  );
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activatingIntegration, setActivatingIntegration] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Fetch available integrations on component mount
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch from an API
        // const response = await fetch('/api/integrations/available');

        // For demo purposes, we'll use hardcoded integrations
        setAvailableIntegrations([
          {
            id: "notion",
            name: "Notion",
            description: "Connect to Notion databases and pages",
            logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=notion",
            category: "productivity",
            requiredCredentials: ["notionApiKey"],
          },
          {
            id: "google_sheets",
            name: "Google Sheets",
            description: "Read and write data to Google Sheets",
            logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=gsheets",
            category: "productivity",
            requiredCredentials: ["googleServiceAccountJson"],
          },
          {
            id: "salesforce",
            name: "Salesforce",
            description: "Access Salesforce CRM data",
            logoUrl:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=salesforce",
            category: "sales",
            requiredCredentials: [
              "clientId",
              "clientSecret",
              "username",
              "password",
            ],
          },
          {
            id: "slack",
            name: "Slack",
            description: "Send messages and interact with Slack",
            logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=slack",
            category: "communication",
            requiredCredentials: ["slackToken"],
          },
          {
            id: "jira",
            name: "Jira",
            description: "Manage Jira issues and projects",
            logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jira",
            category: "project_management",
            requiredCredentials: ["jiraEmail", "jiraApiToken", "jiraDomain"],
          },
        ]);
      } catch (err: any) {
        setError(err.message || "Error fetching integrations");
      } finally {
        setLoading(false);
      }
    };

    fetchIntegrations();
  }, []);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(availableIntegrations.map((i) => i.category)),
  ];

  // Filter integrations by category
  const filteredIntegrations =
    activeCategory === "all"
      ? availableIntegrations
      : availableIntegrations.filter((i) => i.category === activeCategory);

  // Handle integration selection
  const handleIntegrationSelect = (integrationId: string) => {
    setSelectedIntegration(integrationId);

    // Clear previous credentials
    const integration = availableIntegrations.find(
      (i) => i.id === integrationId,
    );
    if (integration) {
      const emptyCredentials: Record<string, string> = {};
      integration.requiredCredentials.forEach((cred) => {
        emptyCredentials[cred] = "";
      });
      setCredentials(emptyCredentials);
    }
  };

  // Handle credential change
  const handleCredentialChange = (key: string, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Handle activation
  const handleActivate = async () => {
    if (!selectedIntegration) return;

    setActivatingIntegration(true);

    try {
      // Validate that all required credentials are provided
      const integration = availableIntegrations.find(
        (i) => i.id === selectedIntegration,
      );

      if (!integration) {
        throw new Error("Selected integration not found");
      }

      const missingCredentials = integration.requiredCredentials.filter(
        (cred) => !credentials[cred],
      );

      if (missingCredentials.length > 0) {
        throw new Error(
          `Missing required credentials: ${missingCredentials.join(", ")}`,
        );
      }

      // In a real app, you would validate credentials with the backend here
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Notify parent component
      onIntegrationSelect(selectedIntegration, credentials);

      // Reset selection
      setSelectedIntegration(null);
      setCredentials({});
    } catch (err: any) {
      setError(err.message || "Error activating integration");
    } finally {
      setActivatingIntegration(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-4">Loading available integrations...</div>
    );
  }

  const selectedIntegrationData = availableIntegrations.find(
    (i) => i.id === selectedIntegration,
  );

  return (
    <Card className="w-full bg-background">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Connect Integrations</h3>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-6"
        >
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() +
                  category.slice(1).replace("_", " ")}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredIntegrations.map((integration) => (
                  <div
                    key={integration.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedIntegration === integration.id ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                    onClick={() => handleIntegrationSelect(integration.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                        <img
                          src={integration.logoUrl}
                          alt={integration.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {integration.category}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {integration.description}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedIntegrationData && (
          <div className="border rounded-lg p-4 mt-4">
            <h4 className="font-medium mb-4">
              Configure {selectedIntegrationData.name}
            </h4>

            <div className="space-y-4">
              {selectedIntegrationData.requiredCredentials.map((cred) => (
                <div key={cred} className="space-y-2">
                  <Label htmlFor={cred}>
                    {cred
                      .split(/(?=[A-Z])/)
                      .join(" ")
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .split("_")
                      .join(" ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </Label>
                  <Input
                    id={cred}
                    type={
                      cred.toLowerCase().includes("key") ||
                      cred.toLowerCase().includes("secret") ||
                      cred.toLowerCase().includes("password")
                        ? "password"
                        : "text"
                    }
                    value={credentials[cred] || ""}
                    onChange={(e) =>
                      handleCredentialChange(cred, e.target.value)
                    }
                    placeholder={`Enter ${cred
                      .split(/(?=[A-Z])/)
                      .join(" ")
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .split("_")
                      .join(" ")
                      .toLowerCase()}`}
                  />
                </div>
              ))}

              <Button
                onClick={handleActivate}
                disabled={activatingIntegration}
                className="mt-2"
              >
                {activatingIntegration
                  ? "Connecting..."
                  : "Connect Integration"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationSelector;
