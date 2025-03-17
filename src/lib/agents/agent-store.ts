import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  Agent,
  AgentNode,
  AgentEdge,
  AgentStatus,
  ModelConfig,
} from "@/backend/models/Agent";

interface AgentStore {
  agents: Agent[];
  currentAgent: Agent | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  createAgent: (agentData: Partial<Agent>) => Promise<Agent>;
  updateAgent: (id: string, agentData: Partial<Agent>) => Promise<Agent | null>;
  deleteAgent: (id: string) => Promise<boolean>;
  getAgentById: (id: string) => Promise<Agent | null>;
  getAllAgents: () => Promise<Agent[]>;
  setCurrentAgent: (agent: Agent | null) => void;
  updateNodes: (nodes: AgentNode[]) => void;
  updateEdges: (edges: AgentEdge[]) => void;
  updateModelConfig: (config: ModelConfig) => void;
  updateCode: (nodeId: string, code: string) => void;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: [],
  currentAgent: null,
  isLoading: false,
  error: null,

  createAgent: async (agentData) => {
    set({ isLoading: true, error: null });
    try {
      const newAgent: Agent = {
        id: uuidv4(),
        name: agentData.name || "New Agent",
        description: agentData.description || "",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: agentData.userId || "current-user",
        isPublic: agentData.isPublic || false,
        status: AgentStatus.DRAFT,
        nodes: agentData.nodes || [],
        edges: agentData.edges || [],
        code: agentData.code || {},
        modelConfig: agentData.modelConfig || {
          provider: "openai",
          modelName: "gpt-3.5-turbo",
          temperature: 0.7,
          maxTokens: 2000,
        },
        integrations: agentData.integrations || [],
      };

      set((state) => ({
        agents: [...state.agents, newAgent],
        currentAgent: newAgent,
        isLoading: false,
      }));

      return newAgent;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      throw error;
    }
  },

  updateAgent: async (id, agentData) => {
    set({ isLoading: true, error: null });
    try {
      const { agents } = get();
      const agentIndex = agents.findIndex((a) => a.id === id);

      if (agentIndex === -1) {
        set({ isLoading: false, error: "Agent not found" });
        return null;
      }

      const updatedAgent = {
        ...agents[agentIndex],
        ...agentData,
        updatedAt: new Date(),
      };

      const updatedAgents = [...agents];
      updatedAgents[agentIndex] = updatedAgent;

      set({
        agents: updatedAgents,
        currentAgent:
          get().currentAgent?.id === id ? updatedAgent : get().currentAgent,
        isLoading: false,
      });

      return updatedAgent;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      throw error;
    }
  },

  deleteAgent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { agents, currentAgent } = get();
      const updatedAgents = agents.filter((a) => a.id !== id);

      set({
        agents: updatedAgents,
        currentAgent: currentAgent?.id === id ? null : currentAgent,
        isLoading: false,
      });

      return true;
    } catch (error) {
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      throw error;
    }
  },

  getAgentById: async (id) => {
    const { agents } = get();
    return agents.find((a) => a.id === id) || null;
  },

  getAllAgents: async () => {
    return get().agents;
  },

  setCurrentAgent: (agent) => {
    set({ currentAgent: agent });
  },

  updateNodes: (nodes) => {
    const { currentAgent } = get();
    if (!currentAgent) return;

    set({
      currentAgent: {
        ...currentAgent,
        nodes,
        updatedAt: new Date(),
      },
    });
  },

  updateEdges: (edges) => {
    const { currentAgent } = get();
    if (!currentAgent) return;

    set({
      currentAgent: {
        ...currentAgent,
        edges,
        updatedAt: new Date(),
      },
    });
  },

  updateModelConfig: (config) => {
    const { currentAgent } = get();
    if (!currentAgent) return;

    set({
      currentAgent: {
        ...currentAgent,
        modelConfig: {
          ...currentAgent.modelConfig,
          ...config,
        },
        updatedAt: new Date(),
      },
    });
  },

  updateCode: (nodeId, code) => {
    const { currentAgent } = get();
    if (!currentAgent) return;

    set({
      currentAgent: {
        ...currentAgent,
        code: {
          ...currentAgent.code,
          [nodeId]: code,
        },
        updatedAt: new Date(),
      },
    });
  },
}));
