import React from "react";
import {
  Share2,
  Users,
  Globe,
  Lock,
  Copy,
  Download,
  ExternalLink,
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

const WorkflowSharePage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Share2 className="h-6 w-6" />
            Share Agent
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Share your agent with team members or export for external use
          </p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Invite Team Members
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sharing Options</CardTitle>
              <CardDescription>
                Control who can access your agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex-shrink-0 mt-1">
                    <Lock className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Private</h3>
                      <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        Current
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Only you can access this agent
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex-shrink-0 mt-1">
                    <Users className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">Team</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Share with specific team members or groups
                    </p>
                  </div>
                </div>

                <div className="p-4 border rounded-md flex items-start hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex-shrink-0 mt-1">
                    <Globe className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">Public</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Anyone with the link can view and use this agent
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                People with access to this agent
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-medium mr-3">
                      YS
                    </div>
                    <div>
                      <div className="font-medium">You</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        you@example.com
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Owner
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-medium mr-3">
                      JD
                    </div>
                    <div>
                      <div className="font-medium">Jane Doe</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        jane@example.com
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Editor
                  </div>
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium mr-3">
                      MS
                    </div>
                    <div>
                      <div className="font-medium">Mark Smith</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        mark@example.com
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Viewer
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Manage Team Access
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sharing Link</CardTitle>
              <CardDescription>
                Share this link with authorized users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-md">
                <code className="text-sm flex-1 font-mono overflow-hidden text-ellipsis">
                  https://agentforge.ai/agents/invoice-processor/share/abc123
                </code>
                <Button variant="ghost" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">
                <Lock className="h-4 w-4 mr-2" />
                Reset Link
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>
                Export your agent for external use
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center mb-1">
                    <Download className="h-4 w-4 mr-2 text-blue-500" />
                    <h3 className="font-medium">Export as Package</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Download as a complete package for deployment
                  </p>
                </div>

                <div className="p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center mb-1">
                    <Download className="h-4 w-4 mr-2 text-purple-500" />
                    <h3 className="font-medium">Export Configuration</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Export agent configuration as JSON
                  </p>
                </div>

                <div className="p-3 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                  <div className="flex items-center mb-1">
                    <Download className="h-4 w-4 mr-2 text-green-500" />
                    <h3 className="font-medium">Export as Template</h3>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Save as a reusable template for future agents
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketplace</CardTitle>
              <CardDescription>
                Share your agent on the marketplace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Make your agent available to the community by publishing it to
                the AgentForge marketplace.
              </p>
              <Button className="w-full">
                <Globe className="h-4 w-4 mr-2" />
                Publish to Marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSharePage;
