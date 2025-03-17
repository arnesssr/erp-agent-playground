import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  FileInput,
  FileOutput,
  Bot,
  Brain,
  Database,
  FileText,
  Layers,
  MessageSquare,
  Settings,
  Workflow,
  Search,
  Cpu,
  Boxes,
  Code2,
  Wrench,
  LayoutDashboard,
  Code,
  PlayCircle,
  LineChart,
  PackageOpen,
  ChevronDown,
  ChevronRight,
  Zap,
  Rocket,
  Globe,
  Puzzle,
  Laptop,
  Server,
  Share2,
  Briefcase,
  Building2,
  Plug,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface SideNavProps {
  className?: string;
}

const SideNav: React.FC<SideNavProps> = ({ className }) => {
  const location = useLocation();
  const [componentsOpen, setComponentsOpen] = useState(false);
  const [integrationsOpen, setIntegrationsOpen] = useState(false);

  const mainNavItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      href: "/dashboard",
    },
    {
      title: "My Agents",
      icon: <Bot className="h-4 w-4" />,
      href: "/my-agents",
    },
    {
      title: "Templates",
      icon: <PackageOpen className="h-4 w-4" />,
      href: "/templates",
    },
    {
      title: "Create Agent",
      icon: <Workflow className="h-4 w-4" />,
      href: "/create-agent",
    },
    {
      title: "Metrics",
      icon: <LineChart className="h-4 w-4" />,
      href: "/metrics",
    },
  ];

  const componentCategories = [
    {
      title: "Data Sources",
      icon: <FileInput className="h-4 w-4" />,
      href: "/components/inputs",
    },
    {
      title: "Exporters",
      icon: <FileOutput className="h-4 w-4" />,
      href: "/components/outputs",
    },
    {
      title: "Prompt Templates",
      icon: <MessageSquare className="h-4 w-4" />,
      href: "/components/prompts",
    },
    {
      title: "Connectors",
      icon: <Database className="h-4 w-4" />,
      href: "/components/data",
    },
    {
      title: "Processors",
      icon: <Cpu className="h-4 w-4" />,
      href: "/components/processing",
    },
    {
      title: "AI Models",
      icon: <Brain className="h-4 w-4" />,
      href: "/components/models",
    },
    {
      title: "Knowledge Base",
      icon: <Boxes className="h-4 w-4" />,
      href: "/components/vector-stores",
    },
    {
      title: "Embeddings",
      icon: <Layers className="h-4 w-4" />,
      href: "/components/embeddings",
    },
    {
      title: "Agent Types",
      icon: <Bot className="h-4 w-4" />,
      href: "/components/agents",
    },
    {
      title: "Memory",
      icon: <Database className="h-4 w-4" />,
      href: "/components/memories",
    },
    {
      title: "Functions",
      icon: <Code2 className="h-4 w-4" />,
      href: "/components/logic",
    },
  ];

  const integrationItems = [
    {
      title: "ERP Systems",
      icon: <Building2 className="h-4 w-4" />,
      href: "/integrations/erp",
    },
    {
      title: "CRM",
      icon: <Briefcase className="h-4 w-4" />,
      href: "/integrations/crm",
    },
    {
      title: "Accounting",
      icon: <FileText className="h-4 w-4" />,
      href: "/integrations/accounting",
    },
    {
      title: "E-commerce",
      icon: <Globe className="h-4 w-4" />,
      href: "/integrations/ecommerce",
    },
    {
      title: "Productivity",
      icon: <Zap className="h-4 w-4" />,
      href: "/integrations/productivity",
    },
    {
      title: "Custom APIs",
      icon: <Plug className="h-4 w-4" />,
      href: "/integrations/custom",
    },
  ];

  const workflowItems = [
    {
      title: "Design",
      icon: <Puzzle className="h-4 w-4" />,
      href: "/workflow/design",
    },
    {
      title: "Test",
      icon: <Laptop className="h-4 w-4" />,
      href: "/workflow/test",
    },
    {
      title: "Deploy",
      icon: <Rocket className="h-4 w-4" />,
      href: "/workflow/deploy",
    },
    {
      title: "API Access",
      icon: <Server className="h-4 w-4" />,
      href: "/workflow/api",
    },
    {
      title: "Share",
      icon: <Share2 className="h-4 w-4" />,
      href: "/workflow/share",
    },
  ];

  return (
    <div
      className={cn(
        "h-screen w-64 bg-gray-900 flex flex-col overflow-hidden",
        className,
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        <div className="text-xl font-bold text-white">AgentForge</div>
        <div className="flex space-x-2">
          <div className="w-8 h-8 border border-gray-700 rounded-md flex items-center justify-center hover:bg-gray-800 cursor-pointer">
            <Code className="h-4 w-4 text-white" />
          </div>
          <div className="w-8 h-8 border border-gray-700 rounded-md flex items-center justify-center hover:bg-gray-800 cursor-pointer">
            <PlayCircle className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-gray-800">
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-8 bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                location.pathname === item.href
                  ? "bg-gray-800 text-white font-medium"
                  : "text-gray-300 hover:bg-gray-700",
              )}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Components Dropdown */}
          <div>
            <button
              onClick={() => setComponentsOpen(!componentsOpen)}
              className="w-full flex items-center justify-between text-white font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Wrench className="h-4 w-4" />
                <span>Components</span>
              </div>
              {componentsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {componentsOpen && (
              <div className="mt-1 ml-2 pl-2 border-l border-gray-700 space-y-1">
                {componentCategories.map((category) => (
                  <Link
                    key={category.href}
                    to={category.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      location.pathname === category.href
                        ? "bg-gray-800 text-white font-medium"
                        : "text-gray-300 hover:bg-gray-700",
                    )}
                  >
                    {category.icon}
                    {category.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Integrations Dropdown */}
          <div>
            <button
              onClick={() => setIntegrationsOpen(!integrationsOpen)}
              className="w-full flex items-center justify-between text-white font-medium px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Plug className="h-4 w-4" />
                <span>Integrations</span>
              </div>
              {integrationsOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {integrationsOpen && (
              <div className="mt-1 ml-2 pl-2 border-l border-gray-700 space-y-1">
                {integrationItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      location.pathname === item.href
                        ? "bg-gray-800 text-white font-medium"
                        : "text-gray-300 hover:bg-gray-700",
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Workflow Section */}
          <div className="mt-4">
            <div className="text-white font-medium mb-2 px-3">
              Agent Workflow
            </div>
            <div className="space-y-1">
              {workflowItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-gray-800 text-white font-medium"
                      : "text-gray-300 hover:bg-gray-700",
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
