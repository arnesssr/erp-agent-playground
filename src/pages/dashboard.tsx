import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, BarChart3, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    { title: "Total Agents", value: "12", icon: Users },
    { title: "Active Agents", value: "8", icon: FileText },
    { title: "Success Rate", value: "94%", icon: BarChart3 },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild>
          <Link to="/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Agent
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mt-8">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">
        Recent Agents
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            name: "Invoice Processor",
            description: "Automates invoice processing workflow",
            status: "Active",
          },
          {
            name: "Inventory Manager",
            description: "Monitors and updates inventory levels",
            status: "Active",
          },
          {
            name: "Customer Support",
            description: "Handles customer inquiries and tickets",
            status: "Inactive",
          },
        ].map((agent, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <span
                className={`px-2 py-1 rounded text-xs ${agent.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"}`}
              >
                {agent.status}
              </span>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/edit/${i}`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
