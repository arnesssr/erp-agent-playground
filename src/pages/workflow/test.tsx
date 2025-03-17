import React from "react";
import { Laptop, Play, Bug, RefreshCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkflowTestPage = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Laptop className="h-6 w-6 text-blue-500" />
            <div>
              <h1 className="text-xl font-bold">Agent Testing Environment</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Test your agent against mock data before deployment
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Results
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Run Test
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Test configuration */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-4 overflow-y-auto">
          <h2 className="font-medium mb-3">Test Configuration</h2>

          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Mock Data Source</CardTitle>
              <CardDescription>Select data to test against</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <span>Invoice Dataset (100 records)</span>
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-1 rounded-full">
                    Selected
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <span>Customer Records (250 records)</span>
                  <span className="text-xs">Select</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <span>Inventory Items (500 records)</span>
                  <span className="text-xs">Select</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Test Parameters</CardTitle>
              <CardDescription>Configure test execution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Test Mode
                  </label>
                  <select className="w-full p-2 border rounded-md bg-transparent">
                    <option>Full Workflow</option>
                    <option>Component by Component</option>
                    <option>Specific Path</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Execution Speed
                  </label>
                  <select className="w-full p-2 border rounded-md bg-transparent">
                    <option>Normal</option>
                    <option>Fast</option>
                    <option>Step by Step</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="debug" className="mr-2" />
                  <label htmlFor="debug" className="text-sm">
                    Enable Debug Mode
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right panel - Test results */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs defaultValue="results" className="flex-1 flex flex-col">
            <div className="px-4 pt-4 border-b border-gray-200 dark:border-gray-800">
              <TabsList>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="debug">Debug</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="results" className="flex-1 p-4 overflow-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-medium mb-2">Running Test...</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Processing invoice dataset with 100 records
                  </p>
                  <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                  </div>
                  <p className="text-sm mt-2">33% Complete</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="flex-1 p-4 overflow-auto">
              <div className="bg-gray-900 text-gray-100 font-mono text-sm p-4 rounded-lg h-full overflow-auto">
                <div className="space-y-1">
                  <p>
                    <span className="text-blue-400">[INFO]</span> Test started
                    at 2023-06-15 14:32:10
                  </p>
                  <p>
                    <span className="text-blue-400">[INFO]</span> Loading
                    invoice dataset with 100 records
                  </p>
                  <p>
                    <span className="text-green-400">[SUCCESS]</span> Dataset
                    loaded successfully
                  </p>
                  <p>
                    <span className="text-blue-400">[INFO]</span> Initializing
                    agent workflow
                  </p>
                  <p>
                    <span className="text-blue-400">[INFO]</span> Starting data
                    processing component
                  </p>
                  <p>
                    <span className="text-yellow-400">[WARNING]</span> Found 3
                    records with missing fields
                  </p>
                  <p>
                    <span className="text-blue-400">[INFO]</span> Applying data
                    transformation rules
                  </p>
                  <p>
                    <span className="text-blue-400">[INFO]</span> Invoking AI
                    model for classification
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="debug" className="flex-1 p-4 overflow-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 h-full">
                <div className="flex items-center mb-4">
                  <Bug className="h-5 w-5 mr-2 text-red-500" />
                  <h3 className="font-medium">Debug Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">
                      Component States
                    </h4>
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              Component
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              Status
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                              Data
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          <tr>
                            <td className="px-4 py-2 text-sm">Data Source</td>
                            <td className="px-4 py-2 text-sm">
                              <span className="text-green-500">Completed</span>
                            </td>
                            <td className="px-4 py-2 text-sm">100 records</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm">Processor</td>
                            <td className="px-4 py-2 text-sm">
                              <span className="text-blue-500">Running</span>
                            </td>
                            <td className="px-4 py-2 text-sm">
                              33/100 processed
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm">AI Model</td>
                            <td className="px-4 py-2 text-sm">
                              <span className="text-gray-500">Waiting</span>
                            </td>
                            <td className="px-4 py-2 text-sm">-</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default WorkflowTestPage;
