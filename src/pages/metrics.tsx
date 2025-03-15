import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function Metrics() {
  const agents = [
    {
      name: "Invoice Processor",
      successRate: 98,
      executionTime: 1.2,
      runsPerDay: 45,
      errorRate: 2,
    },
    {
      name: "Inventory Manager",
      successRate: 95,
      executionTime: 0.8,
      runsPerDay: 120,
      errorRate: 5,
    },
    {
      name: "Customer Support",
      successRate: 87,
      executionTime: 2.5,
      runsPerDay: 30,
      errorRate: 13,
    },
    {
      name: "Sales Order Processor",
      successRate: 92,
      executionTime: 1.5,
      runsPerDay: 60,
      errorRate: 8,
    },
    {
      name: "Expense Approver",
      successRate: 94,
      executionTime: 1.8,
      runsPerDay: 25,
      errorRate: 6,
    },
  ];

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight">
          Performance Metrics
        </h1>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24hours">Last 24 Hours</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
        <MetricCard
          title="Total Executions"
          value="1,248"
          description="+12% from last period"
          icon={BarChart3}
          trend="up"
        />
        <MetricCard
          title="Avg. Success Rate"
          value="93.2%"
          description="+2.4% from last period"
          icon={CheckCircle}
          trend="up"
        />
        <MetricCard
          title="Avg. Execution Time"
          value="1.56s"
          description="-0.3s from last period"
          icon={Clock}
          trend="up"
        />
        <MetricCard
          title="Error Rate"
          value="6.8%"
          description="-2.4% from last period"
          icon={XCircle}
          trend="up"
        />
      </div>

      <Tabs defaultValue="overview" className="mt-10">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="success">Success Rate</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Agent Performance</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Success rate by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  [Success Rate Chart Visualization]
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Execution Volume</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Daily execution count</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  [Execution Volume Chart Visualization]
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Metrics Comparison</CardTitle>
                <CardDescription>
                  Performance metrics across all agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-muted/50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Agent Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Success Rate
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Avg. Execution Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Runs Per Day
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Error Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.map((agent, i) => (
                        <tr key={i} className="bg-card border-b">
                          <td className="px-6 py-4 font-medium">
                            {agent.name}
                          </td>
                          <td className="px-6 py-4">{agent.successRate}%</td>
                          <td className="px-6 py-4">{agent.executionTime}s</td>
                          <td className="px-6 py-4">{agent.runsPerDay}</td>
                          <td className="px-6 py-4">{agent.errorRate}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="success" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Success Rate Analysis</CardTitle>
              <CardDescription>
                Detailed breakdown of agent success rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                [Detailed Success Rate Visualization]
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Analysis</CardTitle>
              <CardDescription>
                Execution time and resource usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                [Performance Metrics Visualization]
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="errors" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Error Analysis</CardTitle>
              <CardDescription>
                Common error types and frequency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                [Error Analysis Visualization]
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: any;
  trend: "up" | "down";
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"}`}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
