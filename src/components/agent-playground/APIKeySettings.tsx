import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, Key, Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface APIKey {
  id: string;
  name: string;
  key: string;
  provider: string;
  isValid: boolean;
}

interface APIKeySettingsProps {
  onSave?: (keys: APIKey[]) => void;
  initialKeys?: APIKey[];
}

const APIKeySettings: React.FC<APIKeySettingsProps> = ({
  onSave,
  initialKeys = [],
}) => {
  const [activeTab, setActiveTab] = useState("llm");
  const [apiKeys, setApiKeys] = useState<APIKey[]>(initialKeys);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [newKeyProvider, setNewKeyProvider] = useState("openai");

  const handleAddKey = () => {
    if (!newKeyName || !newKeyValue) return;

    const newKey: APIKey = {
      id: `key-${Date.now()}`,
      name: newKeyName,
      key: newKeyValue,
      provider: newKeyProvider,
      isValid: true,
    };

    const updatedKeys = [...apiKeys, newKey];
    setApiKeys(updatedKeys);
    setNewKeyName("");
    setNewKeyValue("");
    setNewKeyProvider("openai");

    if (onSave) {
      onSave(updatedKeys);
    }
  };

  const handleDeleteKey = (id: string) => {
    const updatedKeys = apiKeys.filter((key) => key.id !== id);
    setApiKeys(updatedKeys);

    if (onSave) {
      onSave(updatedKeys);
    }
  };

  const getProviderOptions = (category: string) => {
    switch (category) {
      case "llm":
        return [
          { value: "openai", label: "OpenAI" },
          { value: "anthropic", label: "Anthropic" },
          { value: "google", label: "Google AI" },
          { value: "mistral", label: "Mistral AI" },
        ];
      case "vector":
        return [
          { value: "pinecone", label: "Pinecone" },
          { value: "qdrant", label: "Qdrant" },
          { value: "weaviate", label: "Weaviate" },
        ];
      case "erp":
        return [
          { value: "sap", label: "SAP" },
          { value: "oracle", label: "Oracle" },
          { value: "netsuite", label: "NetSuite" },
        ];
      default:
        return [];
    }
  };

  const filteredKeys = apiKeys.filter((key) => {
    switch (activeTab) {
      case "llm":
        return ["openai", "anthropic", "google", "mistral", "cohere"].includes(
          key.provider,
        );
      case "vector":
        return ["pinecone", "qdrant", "weaviate", "chroma"].includes(
          key.provider,
        );
      case "erp":
        return ["sap", "oracle", "netsuite", "dynamics"].includes(key.provider);
      default:
        return true;
    }
  });

  return (
    <Card className="w-full bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Key className="h-5 w-5" />
          API Keys & Connections
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger
              value="llm"
              className="data-[state=active]:bg-gray-700 text-white"
            >
              LLM Providers
            </TabsTrigger>
            <TabsTrigger
              value="vector"
              className="data-[state=active]:bg-gray-700 text-white"
            >
              Vector Stores
            </TabsTrigger>
            <TabsTrigger
              value="erp"
              className="data-[state=active]:bg-gray-700 text-white"
            >
              ERP Systems
            </TabsTrigger>
          </TabsList>

          <TabsContent value="llm" className="space-y-4 mt-4">
            <Alert className="bg-gray-800 border-gray-700">
              <AlertCircle className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-white">API Keys Required</AlertTitle>
              <AlertDescription className="text-gray-300">
                Add your LLM provider API keys to use models like GPT-4, Claude,
                or Gemini in your agents.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {filteredKeys.length > 0 ? (
                filteredKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-3 border border-gray-800 rounded-md bg-gray-800"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{key.name}</h4>
                        {key.isValid && (
                          <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="h-3 w-3" /> Valid
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {key.provider.charAt(0).toUpperCase() +
                          key.provider.slice(1)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-white hover:bg-gray-700"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 border border-gray-800 rounded-md bg-gray-800">
                  <p className="text-gray-400">
                    No API keys added for LLM providers yet.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800">
                <h4 className="font-medium mb-3 text-white">Add New API Key</h4>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="key-name" className="text-white">
                        Name
                      </Label>
                      <Input
                        id="key-name"
                        placeholder="My OpenAI Key"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="key-provider" className="text-white">
                        Provider
                      </Label>
                      <Select
                        value={newKeyProvider}
                        onValueChange={setNewKeyProvider}
                      >
                        <SelectTrigger
                          id="key-provider"
                          className="bg-gray-800 border-gray-700 text-white"
                        >
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {getProviderOptions("llm").map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="key-value" className="text-white">
                      API Key
                    </Label>
                    <Input
                      id="key-value"
                      placeholder="sk-..."
                      type="password"
                      value={newKeyValue}
                      onChange={(e) => setNewKeyValue(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleAddKey}
                    disabled={!newKeyName || !newKeyValue}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add API Key
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="vector" className="space-y-4 mt-4">
            <Alert className="bg-gray-800 border-gray-700">
              <AlertCircle className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-white">
                Vector Database Connections
              </AlertTitle>
              <AlertDescription className="text-gray-300">
                Connect to vector databases to store and retrieve embeddings for
                RAG applications.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {filteredKeys.length > 0 ? (
                filteredKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-3 border border-gray-800 rounded-md bg-gray-800"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{key.name}</h4>
                        {key.isValid && (
                          <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="h-3 w-3" /> Connected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {key.provider.charAt(0).toUpperCase() +
                          key.provider.slice(1)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-white hover:bg-gray-700"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 border border-gray-800 rounded-md bg-gray-800">
                  <p className="text-gray-400">
                    No vector database connections added yet.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800">
                <h4 className="font-medium mb-3 text-white">
                  Add New Connection
                </h4>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vector-name" className="text-white">
                        Connection Name
                      </Label>
                      <Input
                        id="vector-name"
                        placeholder="My Pinecone DB"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vector-provider" className="text-white">
                        Provider
                      </Label>
                      <Select
                        value={newKeyProvider}
                        onValueChange={setNewKeyProvider}
                      >
                        <SelectTrigger
                          id="vector-provider"
                          className="bg-gray-800 border-gray-700 text-white"
                        >
                          <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {getProviderOptions("vector").map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vector-key" className="text-white">
                      API Key
                    </Label>
                    <Input
                      id="vector-key"
                      placeholder="Enter your API key"
                      type="password"
                      value={newKeyValue}
                      onChange={(e) => setNewKeyValue(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleAddKey}
                    disabled={!newKeyName || !newKeyValue}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Connection
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="erp" className="space-y-4 mt-4">
            <Alert className="bg-gray-800 border-gray-700">
              <AlertCircle className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-white">
                ERP System Connections
              </AlertTitle>
              <AlertDescription className="text-gray-300">
                Connect to your ERP systems to allow agents to access and
                manipulate business data.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {filteredKeys.length > 0 ? (
                filteredKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-3 border border-gray-800 rounded-md bg-gray-800"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{key.name}</h4>
                        {key.isValid && (
                          <span className="text-xs bg-green-900 text-green-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="h-3 w-3" /> Connected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {key.provider.charAt(0).toUpperCase() +
                          key.provider.slice(1)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-white hover:bg-gray-700"
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 border border-gray-800 rounded-md bg-gray-800">
                  <p className="text-gray-400">
                    No ERP system connections added yet.
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800">
                <h4 className="font-medium mb-3 text-white">
                  Add New ERP Connection
                </h4>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="erp-name" className="text-white">
                        Connection Name
                      </Label>
                      <Input
                        id="erp-name"
                        placeholder="Production SAP"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="erp-provider" className="text-white">
                        ERP System
                      </Label>
                      <Select
                        value={newKeyProvider}
                        onValueChange={setNewKeyProvider}
                      >
                        <SelectTrigger
                          id="erp-provider"
                          className="bg-gray-800 border-gray-700 text-white"
                        >
                          <SelectValue placeholder="Select ERP system" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700 text-white">
                          {getProviderOptions("erp").map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="erp-key" className="text-white">
                      API Key or Connection String
                    </Label>
                    <Input
                      id="erp-key"
                      placeholder="Enter connection details"
                      type="password"
                      value={newKeyValue}
                      onChange={(e) => setNewKeyValue(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleAddKey}
                    disabled={!newKeyName || !newKeyValue}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add ERP Connection
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default APIKeySettings;
