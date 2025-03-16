import { OpenAI } from "@langchain/openai";
import { BaseLLM } from "langchain/llms/base";
import { PromptTemplate } from "langchain/prompts";

export type ModelConfig = {
  provider: string;
  modelName: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
  additionalParams?: Record<string, any>;
};

export class ModelManager {
  private models: Map<string, BaseLLM> = new Map();

  // Initialize with default models
  constructor() {
    // Add default models if API keys are available
    if (process.env.OPENAI_API_KEY) {
      this.addModel({
        provider: "openai",
        modelName: "gpt-4",
        temperature: 0,
      });

      this.addModel({
        provider: "openai",
        modelName: "gpt-3.5-turbo",
        temperature: 0,
      });
    }
  }

  // Add a new model to the available models
  public addModel(config: ModelConfig): boolean {
    try {
      const modelKey = `${config.provider}/${config.modelName}`;
      let model: BaseLLM;

      switch (config.provider.toLowerCase()) {
        case "openai":
          model = new OpenAI({
            modelName: config.modelName,
            temperature: config.temperature || 0,
            maxTokens: config.maxTokens,
            openAIApiKey: config.apiKey || process.env.OPENAI_API_KEY,
            ...config.additionalParams,
          });
          break;

        default:
          throw new Error(`Unsupported model provider: ${config.provider}`);
      }

      this.models.set(modelKey, model);
      console.log(`Added model: ${modelKey}`);
      return true;
    } catch (error) {
      console.error(
        `Failed to add model ${config.provider}/${config.modelName}:`,
        error,
      );
      return false;
    }
  }

  // Get a model by provider/name
  public getModel(provider: string, modelName: string): BaseLLM | undefined {
    const modelKey = `${provider}/${modelName}`;
    return this.models.get(modelKey);
  }

  // Get all available models
  public getAvailableModels(): string[] {
    return Array.from(this.models.keys());
  }

  // Check if a model is available
  public isModelAvailable(provider: string, modelName: string): boolean {
    const modelKey = `${provider}/${modelName}`;
    return this.models.has(modelKey);
  }

  // Remove a model
  public removeModel(provider: string, modelName: string): boolean {
    const modelKey = `${provider}/${modelName}`;
    return this.models.delete(modelKey);
  }
}

// Singleton instance of model manager
export const modelManager = new ModelManager();
