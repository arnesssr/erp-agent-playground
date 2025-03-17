import React from "react";
import { Building2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ERPIntegrationsPage = () => {
  const erpSystems = [
    {
      name: "SAP",
      description:
        "Connect to SAP ERP systems for finance, HR, and operations automation",
      icon: "/sap-logo.png",
      connected: false,
    },
    {
      name: "Oracle ERP",
      description:
        "Integrate with Oracle ERP Cloud for comprehensive business processes",
      icon: "/oracle-logo.png",
      connected: false,
    },
    {
      name: "Microsoft Dynamics",
      description:
        "Connect to Microsoft Dynamics 365 for business applications",
      icon: "/dynamics-logo.png",
      connected: true,
    },
    {
      name: "NetSuite",
      description: "Integrate with NetSuite for cloud-based ERP solutions",
      icon: "/netsuite-logo.png",
      connected: false,
    },
    {
      name: "Odoo",
      description:
        "Connect to Odoo for open-source ERP and business applications",
      icon: "/odoo-logo.png",
      connected: false,
    },
    {
      name: "Sage",
      description: "Integrate with Sage for accounting and business management",
      icon: "/sage-logo.png",
      connected: false,
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            ERP System Integrations
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Connect your agents to ERP systems to automate business processes
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Custom ERP
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {erpSystems.map((erp) => (
          <Card key={erp.name} className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl">{erp.name}</CardTitle>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${erp.connected ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"}`}
              >
                {erp.connected ? "Connected" : "Not Connected"}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm mt-2">
                {erp.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                variant={erp.connected ? "outline" : "default"}
                className="w-full"
              >
                {erp.connected ? "Configure" : "Connect"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ERPIntegrationsPage;
