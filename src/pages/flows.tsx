import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Workflow, Star, Clock, Users } from "lucide-react";
import SideNav from "@/components/layout/SideNav";

const FlowsPage = () => {
  const recentFlows = [
    {
      id: "flow-1",
      title: "Customer Support Agent",
      description:
        "Handles customer inquiries and routes to appropriate departments",
      updatedAt: "2 hours ago",
      starred: true,
    },
    {
      id: "flow-2",
      title: "Invoice Processing",
      description: "Extracts data from invoices and updates accounting system",
      updatedAt: "Yesterday",
      starred: false,
    },
    {
      id: "flow-3",
      title: "Inventory Management",
      description: "Monitors inventory levels and generates purchase orders",
      updatedAt: "3 days ago",
      starred: true,
    },
  ];

  const templateFlows = [
    {
      id: "template-1",
      title: "Document Q&A",
      description: "Answer questions based on document content",
      category: "RAG",
    },
    {
      id: "template-2",
      title: "ERP Data Processor",
      description: "Process and transform ERP data",
      category: "Integration",
    },
    {
      id: "template-3",
      title: "Multi-Agent Workflow",
      description: "Coordinate multiple specialized agents",
      category: "Advanced",
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      <SideNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b p-4 bg-background">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Flows</h1>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search flows..." className="pl-8" />
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Flow
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="recent">
            <TabsList>
              <TabsTrigger value="recent">
                <Clock className="h-4 w-4 mr-2" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="starred">
                <Star className="h-4 w-4 mr-2" />
                Starred
              </TabsTrigger>
              <TabsTrigger value="templates">
                <Workflow className="h-4 w-4 mr-2" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="shared">
                <Users className="h-4 w-4 mr-2" />
                Shared with me
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentFlows.map((flow) => (
                  <Card key={flow.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{flow.title}</CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Star
                            className={`h-4 w-4 ${flow.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
                          />
                        </Button>
                      </div>
                      <CardDescription>{flow.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                        <Workflow className="h-10 w-10 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <span className="text-xs text-muted-foreground">
                        Updated {flow.updatedAt}
                      </span>
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                    </CardFooter>
                  </Card>
                ))}

                <Card className="border-dashed flex flex-col items-center justify-center p-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Create New Flow</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Start building your custom agent workflow
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Flow
                  </Button>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="starred" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentFlows
                  .filter((flow) => flow.starred)
                  .map((flow) => (
                    <Card key={flow.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {flow.title}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </Button>
                        </div>
                        <CardDescription>{flow.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                          <Workflow className="h-10 w-10 text-muted-foreground" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          Updated {flow.updatedAt}
                        </span>
                        <Button variant="outline" size="sm">
                          Open
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templateFlows.map((template) => (
                  <Card key={template.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          {template.title}
                        </CardTitle>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {template.category}
                        </span>
                      </div>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                        <Workflow className="h-10 w-10 text-muted-foreground" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shared" className="mt-6">
              <div className="text-center p-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No shared flows yet
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Flows shared with you by your team members will appear here.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default FlowsPage;
