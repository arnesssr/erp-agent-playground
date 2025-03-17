import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAgentStore } from "@/lib/agents/agent-store";
import { Play, Save, Code, FileCode } from "lucide-react";

interface RealCodeEditorProps {
  agentId?: string;
  nodeId?: string;
  onSave?: (code: string) => void;
  onRun?: () => void;
}

const RealCodeEditor: React.FC<RealCodeEditorProps> = ({
  agentId,
  nodeId,
  onSave,
  onRun,
}) => {
  const { getAgentById, updateCode } = useAgentStore();
  const [code, setCode] = useState("");
  const [selectedFile, setSelectedFile] = useState("main");
  const [files, setFiles] = useState([
    { id: "main", name: "main.js", language: "javascript" },
    { id: "utils", name: "utils.js", language: "javascript" },
    { id: "types", name: "types.d.ts", language: "typescript" },
  ]);

  useEffect(() => {
    const loadCode = async () => {
      if (agentId && nodeId) {
        const agent = await getAgentById(agentId);
        if (agent && agent.code && agent.code[nodeId]) {
          setCode(agent.code[nodeId]);
        } else {
          // Set default code if none exists
          setCode(
            `// Code for ${nodeId}\n\n/**
 * This function will be executed when the node is triggered
 * @param {object} input - The input data from previous nodes
 * @param {object} context - The execution context
 * @returns {object} - The output data to pass to the next nodes
 */
async function execute(input, context) {\n  // Your code here\n  console.log("Input:", input);\n  \n  // Process the input\n  const result = {\n    processed: true,\n    data: input,\n    timestamp: new Date().toISOString()\n  };\n  \n  return result;\n}\n\n// Export the execute function\nexport default execute;`,
          );
        }
      }
    };

    loadCode();
  }, [agentId, nodeId, getAgentById]);

  const handleSave = () => {
    if (agentId && nodeId) {
      updateCode(nodeId, code);
      if (onSave) onSave(code);
    }
  };

  const handleRun = () => {
    if (onRun) onRun();
  };

  return (
    <Card className="w-full h-full border">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Code Editor</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={selectedFile} onValueChange={setSelectedFile}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select file" />
            </SelectTrigger>
            <SelectContent>
              {files.map((file) => (
                <SelectItem key={file.id} value={file.id}>
                  <div className="flex items-center">
                    <FileCode className="mr-2 h-4 w-4" />
                    {file.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="default" size="sm" onClick={handleRun}>
            <Play className="mr-2 h-4 w-4" />
            Run
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="editor">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="editor" className="rounded-none">
              <Code className="mr-2 h-4 w-4" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="preview" className="rounded-none">
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="p-0 m-0">
            <div className="relative w-full h-[calc(100vh-15rem)]">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full font-mono text-sm p-4 resize-none focus:outline-none bg-muted/30"
                spellCheck="false"
              />
            </div>
          </TabsContent>
          <TabsContent value="preview" className="p-4 m-0">
            <div className="rounded-md border p-4 bg-muted/30 min-h-[calc(100vh-15rem)]">
              <pre className="text-sm font-mono whitespace-pre-wrap">
                {code}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RealCodeEditor;
