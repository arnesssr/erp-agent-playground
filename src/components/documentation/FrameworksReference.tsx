import React, { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, ExternalLink } from "lucide-react";

interface Framework {
  name: string;
  version: string;
  description: string;
  category: FrameworkCategory;
  url: string;
  logo?: string;
}

type FrameworkCategory =
  | "ui"
  | "state"
  | "ai"
  | "routing"
  | "utility"
  | "testing"
  | "build";

const frameworks: Framework[] = [
  // UI Frameworks
  {
    name: "React",
    version: "18.2.0",
    description: "A JavaScript library for building user interfaces",
    category: "ui",
    url: "https://reactjs.org",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    name: "Tailwind CSS",
    version: "3.4.1",
    description: "A utility-first CSS framework",
    category: "ui",
    url: "https://tailwindcss.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
  },
  {
    name: "shadcn/ui",
    version: "latest",
    description:
      "Beautifully designed components built with Radix UI and Tailwind CSS",
    category: "ui",
    url: "https://ui.shadcn.com",
    logo: "https://avatars.githubusercontent.com/u/124599?v=4",
  },
  {
    name: "Radix UI",
    version: "^1.0.0 - ^2.0.0",
    description:
      "Unstyled, accessible components for building high-quality design systems",
    category: "ui",
    url: "https://www.radix-ui.com",
    logo: "https://www.radix-ui.com/favicon.svg",
  },
  {
    name: "Framer Motion",
    version: "11.18.0",
    description: "Production-ready animation library for React",
    category: "ui",
    url: "https://www.framer.com/motion",
    logo: "https://www.framer.com/images/favicons/favicon.png",
  },
  {
    name: "Lucide React",
    version: "0.394.0",
    description: "Beautiful & consistent icon toolkit made by the community",
    category: "ui",
    url: "https://lucide.dev",
    logo: "https://lucide.dev/logo.svg",
  },

  // AI/ML Frameworks
  {
    name: "LangChain",
    version: "0.1.17",
    description:
      "Framework for developing applications powered by language models",
    category: "ai",
    url: "https://js.langchain.com",
    logo: "https://js.langchain.com/img/favicon.ico",
  },
  {
    name: "@langchain/openai",
    version: "0.0.14",
    description: "OpenAI integration for LangChain",
    category: "ai",
    url: "https://js.langchain.com/docs/integrations/llms/openai",
    logo: "https://js.langchain.com/img/favicon.ico",
  },

  // Routing
  {
    name: "React Router",
    version: "6.23.1",
    description: "Declarative routing for React",
    category: "routing",
    url: "https://reactrouter.com",
    logo: "https://reactrouter.com/favicon.ico",
  },

  // State Management
  {
    name: "React Hook Form",
    version: "7.51.5",
    description:
      "Performant, flexible and extensible forms with easy-to-use validation",
    category: "state",
    url: "https://react-hook-form.com",
    logo: "https://react-hook-form.com/images/logo/react-hook-form-logo.png",
  },
  {
    name: "Zod",
    version: "3.23.8",
    description:
      "TypeScript-first schema validation with static type inference",
    category: "utility",
    url: "https://zod.dev",
    logo: "https://zod.dev/logo.svg",
  },

  // Build Tools
  {
    name: "Vite",
    version: "5.2.0",
    description: "Next generation frontend tooling",
    category: "build",
    url: "https://vitejs.dev",
    logo: "https://vitejs.dev/logo.svg",
  },
  {
    name: "TypeScript",
    version: "5.2.2",
    description: "Typed JavaScript at Any Scale",
    category: "build",
    url: "https://www.typescriptlang.org",
    logo: "https://www.typescriptlang.org/favicon.ico",
  },
  {
    name: "SWC",
    version: "1.3.96",
    description: "Rust-based platform for the Web",
    category: "build",
    url: "https://swc.rs",
    logo: "https://swc.rs/favicon.ico",
  },

  // Utilities
  {
    name: "date-fns",
    version: "3.6.0",
    description: "Modern JavaScript date utility library",
    category: "utility",
    url: "https://date-fns.org",
    logo: "https://date-fns.org/static/favicon.png",
  },
  {
    name: "clsx",
    version: "2.1.1",
    description:
      "A tiny utility for constructing className strings conditionally",
    category: "utility",
    url: "https://github.com/lukeed/clsx",
    logo: "https://github.githubassets.com/favicons/favicon.svg",
  },
  {
    name: "tailwind-merge",
    version: "2.3.0",
    description: "Merge Tailwind CSS classes without style conflicts",
    category: "utility",
    url: "https://github.com/dcastil/tailwind-merge",
    logo: "https://github.githubassets.com/favicons/favicon.svg",
  },
];

const categoryLabels: Record<FrameworkCategory, string> = {
  ui: "UI Components",
  state: "State Management",
  ai: "AI & ML",
  routing: "Routing",
  utility: "Utilities",
  testing: "Testing",
  build: "Build Tools",
};

const categoryColors: Record<FrameworkCategory, string> = {
  ui: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  state:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  ai: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  routing:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  utility: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  testing: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  build:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
};

const FrameworksReference: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | FrameworkCategory
  >("all");

  const categories = ["all", ...Object.keys(categoryLabels)] as (
    | "all"
    | FrameworkCategory
  )[];

  const filteredFrameworks = useMemo(() => {
    return frameworks.filter((framework) => {
      const matchesSearch =
        searchTerm === "" ||
        framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        framework.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeCategory === "all" || framework.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <Card className="w-full h-full bg-background border rounded-md shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">
          Frameworks & Libraries Reference
        </CardTitle>
        <CardDescription>
          A comprehensive list of frameworks and libraries used in the AI Agent
          Playground
        </CardDescription>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search frameworks..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>

      <Tabs
        value={activeCategory}
        onValueChange={(value) =>
          setActiveCategory(value as "all" | FrameworkCategory)
        }
      >
        <div className="px-6">
          <TabsList className="w-full justify-start overflow-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="px-3 py-1.5"
              >
                {category === "all"
                  ? "All Categories"
                  : categoryLabels[category as FrameworkCategory]}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <CardContent className="p-6 pt-2">
          <ScrollArea className="h-[calc(100vh-220px)] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredFrameworks.map((framework) => (
                <Card
                  key={framework.name}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {framework.logo && (
                        <div className="w-10 h-10 rounded-md overflow-hidden bg-white flex items-center justify-center p-1 border">
                          <img
                            src={framework.logo}
                            alt={`${framework.name} logo`}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{framework.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs font-normal"
                          >
                            v{framework.version}
                          </Badge>
                          <Badge
                            className={`text-xs ${categoryColors[framework.category]}`}
                          >
                            {categoryLabels[framework.category]}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {framework.description}
                    </p>
                    <a
                      href={framework.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Official
                      Documentation
                    </a>
                  </CardContent>
                </Card>
              ))}

              {filteredFrameworks.length === 0 && (
                <div className="col-span-full flex items-center justify-center h-40 text-muted-foreground">
                  No frameworks found matching your search criteria.
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default FrameworksReference;
