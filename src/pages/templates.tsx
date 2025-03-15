import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Copy } from "lucide-react";
import { Link } from "react-router-dom";

export default function Templates() {
  const templates = [
    {
      name: "Invoice Processor",
      description:
        "Automates the processing of invoices, including data extraction, validation, and approval routing.",
      complexity: "Medium",
    },
    {
      name: "Inventory Manager",
      description:
        "Monitors inventory levels, generates purchase orders, and optimizes stock levels based on demand forecasts.",
      complexity: "High",
    },
    {
      name: "Customer Support Agent",
      description:
        "Handles customer inquiries, routes tickets to appropriate departments, and provides automated responses.",
      complexity: "Medium",
    },
    {
      name: "Sales Order Processor",
      description:
        "Validates and processes sales orders, checks inventory availability, and schedules fulfillment.",
      complexity: "Medium",
    },
    {
      name: "Expense Approver",
      description:
        "Reviews expense reports, validates against company policies, and routes for appropriate approvals.",
      complexity: "Low",
    },
    {
      name: "Vendor Management",
      description:
        "Manages vendor relationships, tracks performance metrics, and handles contract renewals.",
      complexity: "High",
    },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Template Library</h1>
      </div>
      <p className="text-muted-foreground mt-2 mb-8">
        Start with a pre-built agent template to accelerate your development.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle>{template.name}</CardTitle>
              </div>
              <CardDescription className="pt-2">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground">
                  Complexity:
                </span>
                <span
                  className={`ml-2 px-2 py-1 rounded text-xs ${template.complexity === "Low" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : template.complexity === "Medium" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"}`}
                >
                  {template.complexity}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link to={`/create?template=${i}`}>
                  <Copy className="mr-2 h-4 w-4" />
                  Use Template
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
