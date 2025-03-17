export interface Agent {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  isPublic: boolean;
  status: AgentStatus;
  nodes: AgentNode[];
  edges: AgentEdge[];
  code: Record<string, string>;
  modelConfig: ModelConfig;
  integrations: IntegrationConfig[];
  deploymentConfig?: DeploymentConfig;
}

export enum AgentStatus {
  DRAFT = "draft",
  TESTING = "testing",
  DEPLOYED = "deployed",
  ERROR = "error",
}

export interface AgentNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, any>;
}

export interface AgentEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface ModelConfig {
  provider: string;
  modelName: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
}

export interface IntegrationConfig {
  id: string;
  credentials: Record<string, string>;
}

export interface DeploymentConfig {
  environment: string;
  schedule?: string;
  notifications?: NotificationConfig;
  resourceLimits?: ResourceLimits;
}

export interface NotificationConfig {
  email?: string[];
  slack?: string;
  webhook?: string;
}

export interface ResourceLimits {
  maxConcurrentRuns: number;
  timeoutSeconds: number;
  maxTokensPerRun: number;
}

export interface SimulationResult {
  id: string;
  agentId: string;
  status: "success" | "error" | "running";
  startTime: Date;
  endTime?: Date;
  logs: SimulationLog[];
  metrics: SimulationMetrics;
}

export interface SimulationLog {
  timestamp: Date;
  level: "info" | "warning" | "error" | "success";
  message: string;
  nodeId?: string;
}

export interface SimulationMetrics {
  executionTimeMs: number;
  tokenUsage?: {
    prompt: number;
    completion: number;
    total: number;
  };
  successRate?: number;
  errorRate?: number;
}
