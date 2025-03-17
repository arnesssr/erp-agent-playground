import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Check } from "lucide-react";

interface AppOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

interface AppSelectorProps {
  onSelect: (app: AppOption) => void;
  selectedAppId?: string;
}

const appOptions: AppOption[] = [
  {
    id: "erp-sap",
    name: "SAP ERP",
    description: "Connect to SAP ERP systems",
    icon: (
      <div className="w-10 h-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 font-bold">
        SAP
      </div>
    ),
    category: "erp",
  },
  {
    id: "erp-oracle",
    name: "Oracle ERP Cloud",
    description: "Connect to Oracle ERP Cloud",
    icon: (
      <div className="w-10 h-10 bg-red-100 rounded-md flex items-center justify-center text-red-600 font-bold">
        ORC
      </div>
    ),
    category: "erp",
  },
  {
    id: "erp-netsuite",
    name: "NetSuite",
    description: "Connect to NetSuite ERP",
    icon: (
      <div className="w-10 h-10 bg-green-100 rounded-md flex items-center justify-center text-green-600 font-bold">
        NS
      </div>
    ),
    category: "erp",
  },
  {
    id: "langchain",
    name: "LangChain",
    description: "Build with LangChain framework",
    icon: (
      <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center text-purple-600 font-bold">
        LC
      </div>
    ),
    category: "ai",
  },
  {
    id: "langflow",
    name: "LangFlow",
    description: "Visual LangChain flow builder",
    icon: (
      <div className="w-10 h-10 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-600 font-bold">
        LF
      </div>
    ),
    category: "ai",
  },
  {
    id: "custom-api",
    name: "Custom API",
    description: "Connect to any custom API",
    icon: (
      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-600 font-bold">
        API
      </div>
    ),
    category: "integration",
  },
];

const AppSelector: React.FC<AppSelectorProps> = ({
  onSelect,
  selectedAppId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredApps = appOptions.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory
      ? app.category === activeCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "erp", name: "ERP Systems" },
    { id: "ai", name: "AI Frameworks" },
    { id: "integration", name: "Integrations" },
  ];

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Select Application</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2 mt-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setActiveCategory(
                  activeCategory === category.id ? null : category.id,
                )
              }
              className="text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-15rem)] px-4 pb-4">
          <div className="space-y-2">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className={`p-3 rounded-md border cursor-pointer transition-colors ${selectedAppId === app.id ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}
                onClick={() => onSelect(app)}
              >
                <div className="flex items-start gap-3">
                  {app.icon}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{app.name}</h4>
                      {selectedAppId === app.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {app.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {filteredApps.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                No applications found matching your search.
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AppSelector;
