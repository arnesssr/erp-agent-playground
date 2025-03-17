import { v4 as uuidv4 } from "uuid";
import { Agent, AgentStatus, SimulationResult } from "../models/Agent";

// Mock database for demo purposes
let agents: Agent[] = [];
let simulations: SimulationResult[] = [];

export class AgentService {
  // Get all agents
  public async getAllAgents(): Promise<Agent[]> {
    return agents;
  }

  // Get agent by ID
  public async getAgentById(id: string): Promise<Agent | null> {
    const agent = agents.find((a) => a.id === id);
    return agent || null;
  }

  // Create a new agent
  public async createAgent(agentData: Partial<Agent>): Promise<Agent> {
    const newAgent: Agent = {
      id: uuidv4(),
      name: agentData.name || "New Agent",
      description: agentData.description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: agentData.userId || "system",
      isPublic: agentData.isPublic || false,
      status: AgentStatus.DRAFT,
      nodes: agentData.nodes || [],
      edges: agentData.edges || [],
      code: agentData.code || {},
      modelConfig: agentData.modelConfig || {
        provider: "openai",
        modelName: "gpt-3.5-turbo",
      },
      integrations: agentData.integrations || [],
    };

    agents.push(newAgent);
    return newAgent;
  }

  // Update an agent
  public async updateAgent(
    id: string,
    agentData: Partial<Agent>,
  ): Promise<Agent | null> {
    const index = agents.findIndex((a) => a.id === id);

    if (index === -1) {
      return null;
    }

    const updatedAgent = {
      ...agents[index],
      ...agentData,
      updatedAt: new Date(),
    };

    agents[index] = updatedAgent;
    return updatedAgent;
  }

  // Delete an agent
  public async deleteAgent(id: string): Promise<boolean> {
    const initialLength = agents.length;
    agents = agents.filter((a) => a.id !== id);
    return agents.length < initialLength;
  }

  // Run agent simulation
  public async runSimulation(
    agentId: string,
    mockDataId: string,
  ): Promise<SimulationResult> {
    // Check if agent exists
    const agent = await this.getAgentById(agentId);
    if (!agent) {
      throw new Error("Agent not found");
    }

    // Create a new simulation
    const simulationId = uuidv4();
    const startTime = new Date();

    // Mock simulation process
    const simulationResult: SimulationResult = {
      id: simulationId,
      agentId,
      status: "running",
      startTime,
      logs: [
        {
          timestamp: new Date(),
          level: "info",
          message: "Starting simulation...",
        },
      ],
      metrics: {
        executionTimeMs: 0,
      },
    };

    simulations.push(simulationResult);

    // Simulate async processing
    setTimeout(() => {
      const index = simulations.findIndex((s) => s.id === simulationId);
      if (index !== -1) {
        const endTime = new Date();
        const executionTimeMs = endTime.getTime() - startTime.getTime();

        simulations[index] = {
          ...simulations[index],
          status: "success",
          endTime,
          logs: [
            ...simulations[index].logs,
            {
              timestamp: new Date(),
              level: "info",
              message: "Processing data...",
            },
            {
              timestamp: new Date(),
              level: "success",
              message: "Simulation completed successfully",
            },
          ],
          metrics: {
            executionTimeMs,
            tokenUsage: {
              prompt: 1250,
              completion: 750,
              total: 2000,
            },
            successRate: 95,
            errorRate: 5,
          },
        };
      }
    }, 3000);

    return simulationResult;
  }

  // Deploy agent
  public async deployAgent(id: string, deploymentConfig: any): Promise<any> {
    const agent = await this.getAgentById(id);

    if (!agent) {
      throw new Error("Agent not found");
    }

    // Update agent status and deployment config
    const updatedAgent = await this.updateAgent(id, {
      status: AgentStatus.DEPLOYED,
      deploymentConfig,
    });

    return {
      success: true,
      deploymentId: uuidv4(),
      agent: updatedAgent,
      deployedAt: new Date(),
      environment: deploymentConfig.environment,
    };
  }
}
