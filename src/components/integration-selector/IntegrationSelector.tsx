import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

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
            className="lucide lucide-plug-2"
          >
            <path d="M9 2v6" />
            <path d="M15 2v6" />
            <path d="M12 17v5" />
            <path d="M5 8h14" />
            <path d="M6 11V8h12v3a6 6 0 1 1-12 0v0Z" />
          </svg>
          Connect Integrations
        </h3>

        {error && (
          <Alert variant="destructive" className="mb-6">
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
          <TabsList className="mb-6 w-full justify-start gap-2">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-4 py-2"
              >
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
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedIntegration === integration.id ? "border-primary bg-primary/5 ring-1 ring-primary/30" : "hover:border-primary/50"}`}
                    onClick={() => handleIntegrationSelect(integration.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center border shadow-sm">
                        <img
                          src={integration.logoUrl}
                          alt={integration.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          {integration.name}
                        </h4>
                        <p className="text-xs text-muted-foreground capitalize">
                          {integration.category.replace("_", " ")}
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
          <div className="border rounded-lg p-6 mt-6 bg-muted/30 shadow-sm">
            <h4 className="font-medium mb-5 flex items-center gap-2 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Configure {selectedIntegrationData.name}
            </h4>

            <div className="space-y-5 bg-background p-4 rounded-md border">
              {selectedIntegrationData.requiredCredentials.map((cred) => (
                <div key={cred} className="space-y-2">
                  <Label htmlFor={cred} className="text-sm font-medium">
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
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">
                    {cred.toLowerCase().includes("key") ||
                    cred.toLowerCase().includes("secret") ||
                    cred.toLowerCase().includes("password")
                      ? "This credential will be securely stored"
                      : `Required for ${selectedIntegrationData.name} integration`}
                  </p>
                </div>
              ))}

              <Button
                onClick={handleActivate}
                disabled={activatingIntegration}
                className="mt-4 w-full gap-2"
                variant="default"
              >
                {activatingIntegration ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connecting...
                  </>
                ) : (
                  <>
                    Connect {selectedIntegrationData.name}
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IntegrationSelector;
