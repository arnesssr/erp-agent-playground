import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Loader2 } from "lucide-react";

interface AgentClientProps {
  onSendQuery?: (query: string) => void;
}

const AgentClient: React.FC<AgentClientProps> = ({
  onSendQuery = () => {},
}) => {
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState<
    { query: string; response: string }[]
  >([
    {
      query: "What's the inventory level for product ID P1001?",
      response:
        "I've checked the inventory for product P1001. There are currently 42 units available in Warehouse A. The inventory was last updated on 2023-09-15T14:30:22Z.",
    },
    {
      query: "Can you get customer information for customer ID C5002?",
      response:
        "Here's the information for customer C5002:\n\nName: Customer C5002\nEmail: customerC5002@example.com\nAccount Status: Active\nLast Purchase: 2023-09-10T09:15:43Z",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    const query = input;
    setInput("");
    onSendQuery(query);

    // Simulate API call
    setTimeout(() => {
      let response = "";

      if (
        query.toLowerCase().includes("inventory") ||
        query.toLowerCase().includes("stock")
      ) {
        const productId = query.match(/[A-Z]\d{4}/)
          ? query.match(/[A-Z]\d{4}/)?.[0]
          : "P" + Math.floor(1000 + Math.random() * 9000);
        const quantity = Math.floor(Math.random() * 100);
        response = `I've checked the inventory for product ${productId}. There are currently ${quantity} units available in Warehouse A. The inventory was last updated on ${new Date().toISOString()}.`;
      } else if (query.toLowerCase().includes("customer")) {
        const customerId = query.match(/[A-Z]\d{4}/)
          ? query.match(/[A-Z]\d{4}/)?.[0]
          : "C" + Math.floor(1000 + Math.random() * 9000);
        response = `Here's the information for customer ${customerId}:\n\nName: Customer ${customerId}\nEmail: customer${customerId}@example.com\nAccount Status: Active\nLast Purchase: ${new Date().toISOString()}`;
      } else {
        response =
          "I'm not sure how to process that request. I can help with inventory queries and customer information. Please try a question about one of these topics.";
      }

      setResponses([...responses, { query, response }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full h-full flex flex-col bg-background border rounded-md shadow-sm overflow-hidden">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {responses.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="bg-primary/10 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <User className="h-5 w-5 mt-0.5 text-primary" />
                <div>
                  <p className="font-medium text-sm text-primary">You</p>
                  <p className="text-sm">{item.query}</p>
                </div>
              </div>
            </div>
            <div className="bg-secondary/10 p-3 rounded-lg">
              <div className="flex items-start gap-2">
                <Bot className="h-5 w-5 mt-0.5 text-secondary" />
                <div>
                  <p className="font-medium text-sm text-secondary">
                    ERP Agent
                  </p>
                  <p className="text-sm whitespace-pre-line">{item.response}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Agent is processing your request...
            </p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your ERP agent a question..."
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Send"}
        </Button>
      </form>
    </Card>
  );
};

export default AgentClient;
