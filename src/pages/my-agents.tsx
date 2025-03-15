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
import { PlusCircle, Play, Pause, Edit, BarChart3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyAgents() {
  const agents = [
    {
      name: "Invoice Processor",
      description: "Automates invoice processing workflow",
      status: "Active",
      lastRun: "2 hours ago",
      successRate: "98%",
    },
    {
      name: "Inventory Manager",
      description: "Monitors and updates inventory levels",
      status: "Active",
      lastRun: "30 minutes ago",
      successRate: "95%",
    },
    {
      name: "Customer Support",
      description: "Handles customer inquiries and tickets",
      status: "Inactive",
      lastRun: "3 days ago",
      successRate: "87%",
    },
    {
      name: "Sales Order Processor",
      description: "Processes and validates sales orders",
      status: "Active",
      lastRun: "1 hour ago",
      successRate: "92%",
    },
    {
      name: "Expense Approver",
      description: "Reviews and approves expense reports",
      status: "Inactive",
      lastRun: "1 week ago",
      successRate: "94%",
    },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">My Agents</h1>
        <Button asChild>
          <Link to="/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Agent
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-6">
        <TabsList>
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent, i) => (
              <AgentCard key={i} agent={agent} index={i} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents
              .filter((agent) => agent.status === "Active")
              .map((agent, i) => (
                <AgentCard key={i} agent={agent} index={i} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="inactive" className="mt-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agents
              .filter((agent) => agent.status === "Inactive")
              .map((agent, i) => (
                <AgentCard key={i} agent={agent} index={i} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AgentCard({ agent, index }: { agent: any; index: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{agent.name}</CardTitle>
        <CardDescription>{agent.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Status:</span>
            <span
              className={`px-2 py-1 rounded text-xs ${agent.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"}`}
            >
              {agent.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Last Run:</span>
            <span className="text-sm">{agent.lastRun}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Success Rate:</span>
            <span className="text-sm">{agent.successRate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            {agent.status === "Active" ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link to={`/metrics/${index}`}>
              <BarChart3 className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" asChild>
          <Link to={`/edit/${index}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
