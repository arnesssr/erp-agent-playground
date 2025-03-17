import React from "react";
import {
  Rocket,
  Check,
  AlertTriangle,
  Server,
  Globe,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkflowDeployPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            Deploy Agent
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Configure and deploy your agent to production
          </p>
        </div>
        <Button>Deploy to Production</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Checklist</CardTitle>
              <CardDescription>
                Ensure your agent is ready for production
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                      All components configured
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      All required components have been properly configured
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">Tests passed</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      All test scenarios have been executed successfully
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                      Performance optimization
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Consider optimizing for large data volumes
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                      API endpoints configured
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      API access has been properly set up
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deployment Configuration</CardTitle>
              <CardDescription>
                Configure how your agent will be deployed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Deployment Environment
                  </label>
                  <select className="w-full p-2 border rounded-md bg-transparent">
                    <option>Production</option>
                    <option>Staging</option>
                    <option>Development</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Scaling Configuration
                  </label>
                  <select className="w-full p-2 border rounded-md bg-transparent">
                    <option>Auto-scaling</option>
                    <option>Fixed instances (1)</option>
                    <option>Fixed instances (3)</option>
                    <option>Fixed instances (5)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Access Control
                  </label>
                  <select className="w-full p-2 border rounded-md bg-transparent">
                    <option>Private (API Key required)</option>
                    <option>Public (No authentication)</option>
                    <option>Organization only</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="monitoring"
                    className="mr-2"
                    checked
                  />
                  <label htmlFor="monitoring" className="text-sm">
                    Enable advanced monitoring
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Options</CardTitle>
              <CardDescription>Choose how to deploy your agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center mb-2">
                  <Server className="h-5 w-5 mr-2 text-blue-500" />
                  <h3 className="font-medium">Cloud Service</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Deploy to our managed cloud infrastructure
                </p>
              </div>

              <div className="p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center mb-2">
                  <Globe className="h-5 w-5 mr-2 text-purple-500" />
                  <h3 className="font-medium">API Endpoint</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Expose as an API for integration with other systems
                </p>
              </div>

              <div className="p-4 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 mr-2 text-green-500" />
                  <h3 className="font-medium">On-Premises</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Deploy within your own infrastructure
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Deployment History</CardTitle>
              <CardDescription>
                Previous deployments of this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                  <div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">v1.2.0</span>
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        Current
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Deployed 2 days ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">v1.1.0</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Deployed 1 week ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-4 w-4 mt-0.5 mr-2 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium">v1.0.0</div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Deployed 2 weeks ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Deployments
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDeployPage;
