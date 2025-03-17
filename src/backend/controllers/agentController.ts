import { Request, Response } from "express";
import { AgentService } from "../services/agentService";

export class AgentController {
  private agentService: AgentService;

  constructor() {
    this.agentService = new AgentService();
  }

  // Get all agents
  public getAllAgents = async (req: Request, res: Response): Promise<void> => {
    try {
      const agents = await this.agentService.getAllAgents();
      res.status(200).json(agents);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get agent by ID
  public getAgentById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const agent = await this.agentService.getAgentById(id);

      if (!agent) {
        res.status(404).json({ error: "Agent not found" });
        return;
      }

      res.status(200).json(agent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Create a new agent
  public createAgent = async (req: Request, res: Response): Promise<void> => {
    try {
      const agentData = req.body;
      const newAgent = await this.agentService.createAgent(agentData);
      res.status(201).json(newAgent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Update an agent
  public updateAgent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const agentData = req.body;
      const updatedAgent = await this.agentService.updateAgent(id, agentData);

      if (!updatedAgent) {
        res.status(404).json({ error: "Agent not found" });
        return;
      }

      res.status(200).json(updatedAgent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Delete an agent
  public deleteAgent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const success = await this.agentService.deleteAgent(id);

      if (!success) {
        res.status(404).json({ error: "Agent not found" });
        return;
      }

      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Run agent simulation
  public runAgentSimulation = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const { mockDataId } = req.body;

      const simulationResults = await this.agentService.runSimulation(
        id,
        mockDataId,
      );
      res.status(200).json(simulationResults);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  // Deploy agent
  public deployAgent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { deploymentConfig } = req.body;

      const deploymentResult = await this.agentService.deployAgent(
        id,
        deploymentConfig,
      );
      res.status(200).json(deploymentResult);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}
