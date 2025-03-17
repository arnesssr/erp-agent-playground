import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  History,
  GitBranch,
  GitMerge,
  RotateCcw,
  Clock,
  User,
  FileCode,
  Eye,
  ArrowDownUp,
} from "lucide-react";
import { format } from "date-fns";

interface VersionHistoryProps {
  agentId: string;
  onRestore?: (versionId: string) => void;
  onCompare?: (versionId1: string, versionId2: string) => void;
  onView?: (versionId: string) => void;
}

interface Version {
  id: string;
  createdAt: Date;
  createdBy: string;
  message: string;
  changes: {
    nodesAdded: number;
    nodesRemoved: number;
    nodesModified: number;
    edgesAdded: number;
    edgesRemoved: number;
    filesChanged: number;
  };
  isCurrent: boolean;
  branchName?: string;
  tags?: string[];
}

const VersionHistory: React.FC<VersionHistoryProps> = ({
  agentId,
  onRestore = () => {},
  onCompare = () => {},
  onView = () => {},
}) => {
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [showBranches, setShowBranches] = useState<boolean>(false);

  // Mock version history data
  const versions: Version[] = [
    {
      id: "v5",
      createdAt: new Date(2023, 8, 15, 14, 30),
      createdBy: "John Doe",
      message: "Added notification feature",
      changes: {
        nodesAdded: 2,
        nodesRemoved: 0,
        nodesModified: 1,
        edgesAdded: 2,
        edgesRemoved: 0,
        filesChanged: 3,
      },
      isCurrent: true,
      branchName: "main",
      tags: ["latest"],
    },
    {
      id: "v4",
      createdAt: new Date(2023, 8, 14, 11, 45),
      createdBy: "John Doe",
      message: "Fixed validation logic",
      changes: {
        nodesAdded: 0,
        nodesRemoved: 0,
        nodesModified: 1,
        edgesAdded: 0,
        edgesRemoved: 0,
        filesChanged: 1,
      },
      isCurrent: false,
      branchName: "main",
    },
    {
      id: "v3",
      createdAt: new Date(2023, 8, 12, 16, 20),
      createdBy: "Jane Smith",
      message: "Merged feature branch: improved data extraction",
      changes: {
        nodesAdded: 1,
        nodesRemoved: 0,
        nodesModified: 2,
        edgesAdded: 1,
        edgesRemoved: 0,
        filesChanged: 2,
      },
      isCurrent: false,
      branchName: "main",
      tags: ["stable"],
    },
    {
      id: "v2",
      createdAt: new Date(2023, 8, 10, 9, 15),
      createdBy: "John Doe",
      message: "Added data extraction component",
      changes: {
        nodesAdded: 1,
        nodesRemoved: 0,
        nodesModified: 0,
        edgesAdded: 1,
        edgesRemoved: 0,
        filesChanged: 1,
      },
      isCurrent: false,
      branchName: "feature/data-extraction",
    },
    {
      id: "v1",
      createdAt: new Date(2023, 8, 5, 14, 0),
      createdBy: "John Doe",
      message: "Initial version",
      changes: {
        nodesAdded: 3,
        nodesRemoved: 0,
        nodesModified: 0,
        edgesAdded: 2,
        edgesRemoved: 0,
        filesChanged: 2,
      },
      isCurrent: false,
      branchName: "main",
    },
  ];

  // Toggle version selection for comparison
  const toggleVersionSelection = (versionId: string) => {
    setSelectedVersions((prev) => {
      if (prev.includes(versionId)) {
        return prev.filter((id) => id !== versionId);
      }
      if (prev.length < 2) {
        return [...prev, versionId];
      }
      return [prev[1], versionId]; // Keep only the most recent selection
    });
  };

  // Get CSS class for branch visualization
  const getBranchLineClass = (version: Version, index: number) => {
    if (index === versions.length - 1) return "";

    const nextVersion = versions[index + 1];

    if (version.branchName === nextVersion.branchName) {
      return "border-l-2 border-primary/30 h-full absolute left-4 top-8 -bottom-4";
    }

    if (version.message.includes("Merged")) {
      return "border-l-2 border-primary/30 h-full absolute left-4 top-8 -bottom-4";
    }

    return "";
  };

  return (
    <Card className="w-full h-full bg-background border rounded-md shadow-sm overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              Version History
            </CardTitle>
            <CardDescription>
              Track changes to your agent over time
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => setShowBranches(!showBranches)}
            >
              <GitBranch className="h-4 w-4" />
              {showBranches ? "Hide" : "Show"} Branches
            </Button>
            {selectedVersions.length === 2 && (
              <Button
                size="sm"
                className="gap-1"
                onClick={() =>
                  onCompare(selectedVersions[0], selectedVersions[1])
                }
              >
                <ArrowDownUp className="h-4 w-4" />
                Compare
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <ScrollArea className="h-[calc(100vh-180px)] pr-4">
          <div className="space-y-4">
            {versions.map((version, index) => (
              <div key={version.id} className="relative">
                {showBranches && (
                  <div className={getBranchLineClass(version, index)}></div>
                )}
                <div
                  className={`p-4 rounded-md border ${version.isCurrent ? "border-primary bg-primary/5" : "border-border"} relative`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {version.isCurrent ? (
                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          <History className="h-4 w-4" />
                        </div>
                      ) : version.message.includes("Merged") ? (
                        <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          <GitMerge className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                          <Clock className="h-4 w-4" />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{version.message}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" /> {version.createdBy}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {format(version.createdAt, "MMM d, yyyy h:mm a")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {version.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {showBranches && (
                        <Badge
                          variant="outline"
                          className={`text-xs ${version.branchName === "main" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}
                        >
                          <GitBranch className="h-3 w-3 mr-1" />
                          {version.branchName}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="bg-muted/30 p-2 rounded-md text-xs flex flex-wrap gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-green-600">
                        +{version.changes.nodesAdded}
                      </span>
                      <span className="text-red-600">
                        -{version.changes.nodesRemoved}
                      </span>
                      <span className="text-muted-foreground">nodes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-green-600">
                        +{version.changes.edgesAdded}
                      </span>
                      <span className="text-red-600">
                        -{version.changes.edgesRemoved}
                      </span>
                      <span className="text-muted-foreground">edges</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileCode className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {version.changes.filesChanged} files changed
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedVersions.includes(version.id)}
                          onChange={() => toggleVersionSelection(version.id)}
                          disabled={
                            selectedVersions.length >= 2 &&
                            !selectedVersions.includes(version.id)
                          }
                        />
                        <div
                          className={`h-4 w-4 rounded-sm border ${selectedVersions.includes(version.id) ? "bg-primary border-primary text-primary-foreground flex items-center justify-center" : "border-muted-foreground"}`}
                        >
                          {selectedVersions.includes(version.id) && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">
                          Select for comparison
                        </span>
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1"
                        onClick={() => onView(version.id)}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      {!version.isCurrent && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                          onClick={() => onRestore(version.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                          Restore
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
