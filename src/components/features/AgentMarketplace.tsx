import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Star,
  Download,
  Filter,
  ShoppingBag,
  Tag,
  Clock,
  User,
  Info,
} from "lucide-react";

interface AgentMarketplaceProps {
  onImport?: (agentId: string) => void;
  onViewDetails?: (agentId: string) => void;
}

interface MarketplaceAgent {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  tags: string[];
  rating: number;
  downloads: number;
  price: number | null; // null means free
  author: {
    name: string;
    verified: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AgentMarketplace: React.FC<AgentMarketplaceProps> = ({
  onImport = () => {},
  onViewDetails = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("featured");

  // Mock marketplace agents data
  const agents: MarketplaceAgent[] = [
    {
      id: "agent1",
      name: "Invoice Processing Pro",
      description:
        "Automated invoice processing with AI data extraction and ERP integration",
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
      category: "finance",
      tags: ["invoice", "finance", "automation"],
      rating: 4.8,
      downloads: 1250,
      price: null,
      author: {
        name: "AI Agent Playground",
        verified: true,
      },
      createdAt: new Date(2023, 5, 15),
      updatedAt: new Date(2023, 8, 10),
    },
    {
      id: "agent2",
      name: "Customer Support Assistant",
      description:
        "AI-powered customer support automation with intent recognition",
      thumbnail:
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=500&q=80",
      category: "customer-service",
      tags: ["support", "customer", "chat"],
      rating: 4.6,
      downloads: 980,
      price: null,
      author: {
        name: "AI Agent Playground",
        verified: true,
      },
      createdAt: new Date(2023, 6, 20),
      updatedAt: new Date(2023, 8, 5),
    },
    {
      id: "agent3",
      name: "Inventory Manager",
      description: "Automated inventory tracking and reordering system",
      thumbnail:
        "https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80",
      category: "inventory",
      tags: ["inventory", "stock", "warehouse"],
      rating: 4.5,
      downloads: 750,
      price: 9.99,
      author: {
        name: "ERP Solutions Inc.",
        verified: true,
      },
      createdAt: new Date(2023, 7, 5),
      updatedAt: new Date(2023, 8, 15),
    },
    {
      id: "agent4",
      name: "Sales Forecasting Agent",
      description: "AI-powered sales forecasting and trend analysis",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80",
      category: "sales",
      tags: ["sales", "forecasting", "analytics"],
      rating: 4.3,
      downloads: 620,
      price: 14.99,
      author: {
        name: "Data Insights LLC",
        verified: true,
      },
      createdAt: new Date(2023, 7, 10),
      updatedAt: new Date(2023, 8, 1),
    },
    {
      id: "agent5",
      name: "Purchase Order Processor",
      description: "Streamline purchase order creation and approval workflows",
      thumbnail:
        "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=500&q=80",
      category: "finance",
      tags: ["purchase", "order", "procurement"],
      rating: 4.4,
      downloads: 580,
      price: null,
      author: {
        name: "John Smith",
        verified: false,
      },
      createdAt: new Date(2023, 6, 25),
      updatedAt: new Date(2023, 7, 30),
    },
    {
      id: "agent6",
      name: "Employee Onboarding Assistant",
      description: "Automate employee onboarding processes and documentation",
      thumbnail:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&q=80",
      category: "hr",
      tags: ["hr", "onboarding", "employees"],
      rating: 4.2,
      downloads: 420,
      price: 7.99,
      author: {
        name: "HR Solutions Co.",
        verified: true,
      },
      createdAt: new Date(2023, 5, 30),
      updatedAt: new Date(2023, 7, 15),
    },
  ];

  // Categories derived from agents data
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "finance", name: "Finance & Accounting" },
    { id: "customer-service", name: "Customer Service" },
    { id: "inventory", name: "Inventory Management" },
    { id: "sales", name: "Sales & Marketing" },
    { id: "hr", name: "Human Resources" },
  ];

  // Filter agents based on search term, category, and tab
  const filteredAgents = useMemo(() => {
    return agents.filter((agent) => {
      const matchesSearch =
        searchTerm === "" ||
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        activeCategory === "all" || agent.category === activeCategory;

      const matchesTab =
        (activeTab === "featured" && agent.rating >= 4.5) ||
        (activeTab === "popular" && agent.downloads > 500) ||
        (activeTab === "free" && agent.price === null) ||
        (activeTab === "premium" && agent.price !== null) ||
        activeTab === "all";

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchTerm, activeCategory, activeTab, agents]);

  return (
    <Card className="w-full h-full bg-background border rounded-md shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" />
              Agent Marketplace
            </CardTitle>
            <CardDescription>
              Discover and import pre-built agents for your ERP system
            </CardDescription>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </CardHeader>

      <div className="px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
            <TabsTrigger value="all">All Agents</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-4 overflow-x-auto pb-2 mb-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      <CardContent className="p-6 pt-2">
        <ScrollArea className="h-[calc(100vh-250px)] pr-4">
          {filteredAgents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAgents.map((agent) => (
                <Card
                  key={agent.id}
                  className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onViewDetails(agent.id)}
                >
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={agent.thumbnail}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{agent.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm">
                          {agent.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {agent.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {agent.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span>{agent.author.name}</span>
                        {agent.author.verified && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3 text-blue-500"
                          >
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Download className="h-3 w-3" />
                        <span>{agent.downloads.toLocaleString()}</span>
                      </div>
                    </div>

                    <Separator className="my-3" />

                    <div className="flex items-center justify-between">
                      <div>
                        {agent.price === null ? (
                          <Badge
                            variant="outline"
                            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            Free
                          </Badge>
                        ) : (
                          <div className="font-medium">
                            ${agent.price.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          onImport(agent.id);
                        }}
                      >
                        <Download className="h-4 w-4" />
                        Import
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Info className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No agents found</h3>
              <p className="text-muted-foreground max-w-md">
                We couldn't find any agents matching your search criteria. Try
                adjusting your filters or search term.
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AgentMarketplace;
