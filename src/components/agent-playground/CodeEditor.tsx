import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Play,
  Code,
  Settings,
  FileCode,
  Download,
  Terminal,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface CodeEditorProps {
  code?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRun?: () => void;
  onSave?: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code = `// Import required packages from langchain
import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { StructuredTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";

// Initialize the LLM
const llm = new OpenAI({
  temperature: 0,
  modelName: "gpt-4", // or another model of your choice
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Define custom tool for inventory queries
class InventoryTool extends StructuredTool {
  name = "inventory_query";
  description = "Query inventory levels for a specific product";
  
  async _call({ productId }) {
    console.log(\`Querying inventory for product: \${productId}\`);
    // Mock implementation
    return JSON.stringify({
      productId,
      quantity: Math.floor(Math.random() * 100),
      location: "Warehouse A",
      lastUpdated: new Date().toISOString(),
    });
  }
}

// Create an agent executor that combines tools
async function createERPAgent() {
  const tools = [
    new Calculator(),
    new InventoryTool(),
    // Add more tools as needed
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  return executor;
}`,
  language = "typescript",
  onCodeChange = () => {},
  onRun = () => {},
  onSave = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("main");
  const [editorTheme, setEditorTheme] = useState("dark");
  const [currentCode, setCurrentCode] = useState(code);
  const [setupCode, setSetupCode] = useState(`// setup.ts - Agent configuration
import { OpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { ChainTool } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the LLM
export const llm = new OpenAI({
  temperature: 0,
  modelName: "gpt-4", // or another model of your choice
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Define custom tools for ERP functions
export class InventoryTool extends StructuredTool {
  name = "inventory_query";
  description = "Query inventory levels for a specific product";
  schema = z.object({
    productId: z.string().describe("The ID of the product to check inventory for"),
  });

  async _call({ productId }: z.infer<typeof this.schema>) {
    // In a real implementation, this would query your inventory database/API
    console.log(\`Querying inventory for product: \${productId}\`);
    // Mock implementation
    return JSON.stringify({
      productId,
      quantity: Math.floor(Math.random() * 100),
      location: "Warehouse A",
      lastUpdated: new Date().toISOString(),
    });
  }
}

export class CustomerTool extends StructuredTool {
  name = "customer_info";
  description = "Get information about a customer";
  schema = z.object({
    customerId: z.string().describe("The ID of the customer to retrieve information for"),
  });

  async _call({ customerId }: z.infer<typeof this.schema>) {
    // In a real implementation, this would query your CRM system
    console.log(\`Retrieving customer info for: \${customerId}\`);
    // Mock implementation
    return JSON.stringify({
      customerId,
      name: \`Customer \${customerId}\`,
      email: \`customer\${customerId}@example.com\`,
      accountStatus: "Active",
      lastPurchase: new Date().toISOString(),
    });
  }
}

// Create an agent executor that combines tools
export async function createERPAgent() {
  const tools = [
    new Calculator(),
    new InventoryTool(),
    new CustomerTool(),
    // Add more tools as needed
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, llm, {
    agentType: "structured-chat-zero-shot-react-description",
    verbose: true,
  });

  return executor;
}`);
  const [serverCode, setServerCode] =
    useState(`// agent-playground.ts - Express server for agent API
import express from "express";
import cors from "cors";
import { createERPAgent } from "./setup";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize the agent
let agentExecutor: any;
createERPAgent().then((executor) => {
  agentExecutor = executor;
  console.log("ERP Agent initialized and ready!");
});

// API endpoint to interact with the agent
app.post("/api/agent", async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ error: "Input is required" });
    }

    console.log(\`Received query: \${input}\`);
    const result = await agentExecutor.invoke({ input });
    
    return res.json({ result: result.output });
  } catch (error) {
    console.error("Error processing agent request:", error);
    return res.status(500).json({ error: "Failed to process request" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`ERP Agent playground server running on port \${PORT}\`);
});

// Run with: ts-node agent-playground.ts`);
  const [clientCode, setClientCode] =
    useState(`// client.tsx - React frontend for agent interaction
import React, { useState } from 'react';

function AgentClient() {
  const [input, setInput] = useState('');
  const [responses, setResponses] = useState<{query: string, response: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const query = input;
    setInput('');

    try {
      const response = await fetch('http://localhost:3000/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: query }),
      });

      const data = await response.json();
      setResponses([...responses, { query, response: data.result }]);
    } catch (error) {
      console.error('Error querying agent:', error);
      setResponses([...responses, { query, response: 'Error: Failed to communicate with the ERP agent.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-muted/20">
        {responses.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <p className="font-medium">You:</p>
              <p>{item.query}</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-lg">
              <p className="font-medium">ERP Agent:</p>
              <p>{item.response}</p>
            </div>
          </div>
        ))}
        {loading && <div className="bg-muted p-3 rounded-lg">Processing...</div>}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your ERP agent a question..."
          className="flex-1 px-3 py-2 bg-background border rounded-md"
        />
        <button 
          type="submit" 
          disabled={loading} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default AgentClient;`);
  const [configCode, setConfigCode] = useState(`{
  "name": "erp-agent",
  "version": "1.0.0",
  "description": "AI Agent for ERP system automation",
  "dependencies": {
    "@langchain/openai": "^0.0.14",
    "langchain": "^0.1.17",
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2",
    "dotenv": "^16.3.1",
    "zod": "^3.22.4",
    "typescript": "^5.3.3",
    "ts-node": "^10.9.2"
  },
  "scripts": {
    "start": "ts-node agent-playground.ts",
    "dev": "nodemon --exec ts-node agent-playground.ts"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "environment": {
    "OPENAI_API_KEY": "your-api-key-here"
  },
  "tools": [
    "inventory_query",
    "customer_info",
    "calculator"
  ],
  "models": [
    "gpt-4",
    "gpt-3.5-turbo"
  ]
}`);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Update the parent component when code changes
    onCodeChange(currentCode);
  }, [currentCode, onCodeChange]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentCode(e.target.value);
  };

  const handleSetupCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSetupCode(e.target.value);
  };

  const handleServerCodeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setServerCode(e.target.value);
  };

  const handleClientCodeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setClientCode(e.target.value);
  };

  const handleConfigCodeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setConfigCode(e.target.value);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput("Initializing agent...\n");

    // Simulate agent execution
    setTimeout(() => {
      setOutput((prev) => prev + "Loading LLM model...\n");

      setTimeout(() => {
        setOutput(
          (prev) =>
            prev +
            "Registering tools: inventory_query, customer_info, calculator...\n",
        );

        setTimeout(() => {
          setOutput((prev) => prev + "Agent initialized successfully!\n");
          setOutput(
            (prev) => prev + "Server running on http://localhost:3000\n",
          );
          setOutput(
            (prev) =>
              prev +
              "\nReady to process queries. Use the client interface to interact with the agent.\n",
          );
          setIsRunning(false);
          onRun();
        }, 800);
      }, 600);
    }, 500);
  };

  return (
    <Card className="w-full h-full flex flex-col bg-background border rounded-md shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
        <div className="flex items-center space-x-2">
          <Code className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-sm font-medium">Agent Code Editor</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
          >
            <Play className="h-4 w-4 mr-1" />
            {isRunning ? "Running..." : "Run Agent"}
          </Button>
          <Button variant="outline" size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center justify-between p-2 bg-muted/20 border-b">
          <TabsList>
            <TabsTrigger value="main" className="text-xs">
              <FileCode className="h-4 w-4 mr-1" />
              main.ts
            </TabsTrigger>
            <TabsTrigger value="setup" className="text-xs">
              <FileCode className="h-4 w-4 mr-1" />
              setup.ts
            </TabsTrigger>
            <TabsTrigger value="server" className="text-xs">
              <FileCode className="h-4 w-4 mr-1" />
              agent-playground.ts
            </TabsTrigger>
            <TabsTrigger value="client" className="text-xs">
              <FileCode className="h-4 w-4 mr-1" />
              client.tsx
            </TabsTrigger>
            <TabsTrigger value="config" className="text-xs">
              <FileCode className="h-4 w-4 mr-1" />
              package.json
            </TabsTrigger>
            <TabsTrigger value="output" className="text-xs">
              <Terminal className="h-4 w-4 mr-1" />
              Console
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <TabsContent value="main" className="h-full m-0 p-0">
            <div className="relative h-full w-full bg-zinc-900 text-white font-mono text-sm p-0 overflow-auto">
              <Textarea
                value={currentCode}
                onChange={handleCodeChange}
                className="w-full h-full min-h-[400px] bg-zinc-900 text-white font-mono text-sm p-4 border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                spellCheck="false"
              />
            </div>
          </TabsContent>
          <TabsContent value="setup" className="h-full m-0 p-0">
            <div className="relative h-full w-full bg-zinc-900 text-white font-mono text-sm p-0 overflow-auto">
              <Textarea
                value={setupCode}
                onChange={handleSetupCodeChange}
                className="w-full h-full min-h-[400px] bg-zinc-900 text-white font-mono text-sm p-4 border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                spellCheck="false"
              />
            </div>
          </TabsContent>
          <TabsContent value="server" className="h-full m-0 p-0">
            <div className="relative h-full w-full bg-zinc-900 text-white font-mono text-sm p-0 overflow-auto">
              <Textarea
                value={serverCode}
                onChange={handleServerCodeChange}
                className="w-full h-full min-h-[400px] bg-zinc-900 text-white font-mono text-sm p-4 border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                spellCheck="false"
              />
            </div>
          </TabsContent>
          <TabsContent value="client" className="h-full m-0 p-0">
            <div className="relative h-full w-full bg-zinc-900 text-white font-mono text-sm p-0 overflow-auto">
              <Textarea
                value={clientCode}
                onChange={handleClientCodeChange}
                className="w-full h-full min-h-[400px] bg-zinc-900 text-white font-mono text-sm p-4 border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                spellCheck="false"
              />
            </div>
          </TabsContent>
          <TabsContent value="config" className="h-full m-0 p-0">
            <div className="relative h-full w-full bg-zinc-900 text-white font-mono text-sm p-0 overflow-auto">
              <Textarea
                value={configCode}
                onChange={handleConfigCodeChange}
                className="w-full h-full min-h-[400px] bg-zinc-900 text-white font-mono text-sm p-4 border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                spellCheck="false"
              />
            </div>
          </TabsContent>
          <TabsContent value="output" className="h-full m-0 p-0">
            <div className="relative h-full w-full bg-zinc-900 text-white font-mono text-sm p-4 overflow-auto">
              <pre className="whitespace-pre-wrap">
                {output || "Run the agent to see output here..."}
              </pre>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="p-2 bg-muted/30 border-t flex items-center justify-between text-xs text-muted-foreground">
        <div>Agent Environment: Development</div>
        <div className="flex items-center space-x-4">
          <div>Language: {language}</div>
          <div>Theme: {editorTheme}</div>
          <div>Auto-save: On</div>
        </div>
      </div>
    </Card>
  );
};

export default CodeEditor;
