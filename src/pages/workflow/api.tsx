import React from "react";
import { Server, Copy, Code, RefreshCw, Key, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WorkflowAPIPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Server className="h-6 w-6" />
            API Access
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Integrate your agent with external applications
          </p>
        </div>
        <Button>
          <Key className="h-4 w-4 mr-2" />
          Generate New API Key
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Reference for integrating with your agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="rest">
                <TabsList className="mb-4">
                  <TabsTrigger value="rest">REST API</TabsTrigger>
                  <TabsTrigger value="sdk">SDK</TabsTrigger>
                  <TabsTrigger value="webhook">Webhooks</TabsTrigger>
                </TabsList>

                <TabsContent value="rest" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Endpoint</h3>
                    <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <code className="text-sm flex-1 font-mono">
                        https://api.agentforge.ai/v1/agents/invoice-processor
                      </code>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Authentication</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Include your API key in the request headers:
                    </p>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <code className="text-sm font-mono">
                        Authorization: Bearer YOUR_API_KEY
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Example Request
                    </h3>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono">{`POST /v1/agents/invoice-processor/process
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "document": "https://example.com/invoice.pdf",
  "options": {
    "extractItems": true,
    "calculateTotals": true
  }
}`}</pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Example Response
                    </h3>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono">{`{
  "success": true,
  "requestId": "req_123456789",
  "results": {
    "invoiceNumber": "INV-2023-0042",
    "date": "2023-06-15",
    "total": 1250.00,
    "items": [
      {
        "description": "Consulting Services",
        "quantity": 5,
        "unitPrice": 250.00,
        "amount": 1250.00
      }
    ]
  }
}`}</pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sdk" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Installation</h3>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <code className="text-sm font-mono">
                        npm install @agentforge/sdk
                      </code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Usage Example</h3>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono">{`import { AgentForge } from '@agentforge/sdk';

const agentforge = new AgentForge({
  apiKey: 'YOUR_API_KEY'
});

async function processInvoice() {
  const result = await agentforge.agents.invoiceProcessor.process({
    document: 'https://example.com/invoice.pdf',
    options: {
      extractItems: true,
      calculateTotals: true
    }
  });
  
  console.log(result);
}

processInvoice();`}</pre>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="webhook" className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Webhook Configuration
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Configure a webhook URL to receive notifications when your
                      agent completes processing:
                    </p>
                    <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <input
                        type="text"
                        placeholder="https://your-app.com/webhooks/agentforge"
                        className="flex-1 bg-transparent border-0 focus:ring-0"
                      />
                      <Button variant="outline" size="sm">
                        Save
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Webhook Payload Example
                    </h3>
                    <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                      <pre className="text-sm font-mono">{`{
  "event": "agent.process.completed",
  "timestamp": "2023-06-15T14:32:10Z",
  "requestId": "req_123456789",
  "agentId": "invoice-processor",
  "status": "success",
  "results": {
    "invoiceNumber": "INV-2023-0042",
    "date": "2023-06-15",
    "total": 1250.00,
    "items": [...]
  }
}`}</pre>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage your API access credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Production Key</div>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center">
                    <code className="text-sm font-mono flex-1">
                      af_prod_••••••••••••••••
                    </code>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Created 30 days ago · Last used 2 hours ago
                  </div>
                </div>

                <div className="p-3 border rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Development Key</div>
                    <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center">
                    <code className="text-sm font-mono flex-1">
                      af_dev_••••••••••••••••
                    </code>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Created 45 days ago · Last used 1 day ago
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Rotate Keys
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure API security options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">IP Restrictions</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Limit API access to specific IP addresses
                    </p>
                  </div>
                  <div className="flex items-center h-4">
                    <input
                      type="checkbox"
                      id="ip-restrictions"
                      className="mr-2"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Rate Limiting</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      100 requests per minute
                    </p>
                  </div>
                  <div className="flex items-center h-4">
                    <input
                      type="checkbox"
                      id="rate-limiting"
                      className="mr-2"
                      checked
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Request Logging</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Log all API requests for 30 days
                    </p>
                  </div>
                  <div className="flex items-center h-4">
                    <input
                      type="checkbox"
                      id="request-logging"
                      className="mr-2"
                      checked
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Update Security Settings
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAPIPage;
