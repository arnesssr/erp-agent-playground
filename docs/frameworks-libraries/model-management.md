# Model Management

The Model Management framework provides a way to manage language models within the AI Agent Playground. It allows users to add, configure, and use different language models for their agents.

## Overview

The Model Management framework provides a centralized way to manage language models from different providers. It includes a model registry, configuration options, and utilities for working with language models.

## Key Components

### ModelConfig

The `ModelConfig` type defines the configuration options for a language model:

```typescript
export type ModelConfig = {
  provider: string;
  modelName: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
  additionalParams?: Record<string, any>;
};
```

### ModelManager

The `ModelManager` class manages the registration and usage of language models:

```typescript
export class ModelManager {
  private models: Map<string, BaseLLM> = new Map();

  // Add a new model to the available models
  public addModel(config: ModelConfig): boolean;

  // Get a model by provider/name
  public getModel(provider: string, modelName: string): BaseLLM | undefined;

  // Get all available models
  public getAvailableModels(): string[];

  // Check if a model is available
  public isModelAvailable(provider: string, modelName: string): boolean;

  // Remove a model
  public removeModel(provider: string, modelName: string): boolean;
}
```

## Supported Model Providers

The Model Management framework supports several model providers:

- **OpenAI**: GPT-3.5, GPT-4
- **Anthropic**: Claude 3 Opus, Claude 3 Sonnet
- **Google**: Gemini Pro

## Usage

1. Add a model to the manager:

```typescript
import { modelManager } from "../lib/models/model-manager";

modelManager.addModel({
  provider: "openai",
  modelName: "gpt-4",
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
});
```

2. Get a model from the manager:

```typescript
const model = modelManager.getModel("openai", "gpt-4");
```

3. Use the model in an agent:

```typescript
import { initializeAgentExecutorWithOptions } from "langchain/agents";

const model = modelManager.getModel("openai", "gpt-4");
const tools = [/* tools */];

if (model) {
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "structured-chat-zero-shot-react-description",
  });
}
```

## Adding Custom Model Providers

The Model Management framework can be extended to support additional model providers by modifying the `addModel` method in the `ModelManager` class:

```typescript
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

      case "anthropic":
        // Add support for Anthropic models
        break;

      case "google":
        // Add support for Google models
        break;

      default:
        throw new Error(`Unsupported model provider: ${config.provider}`);
    }

    this.models.set(modelKey, model);
    return true;
  } catch (error) {
    console.error(
      `Failed to add model ${config.provider}/${config.modelName}:`,
      error,
    );
    return false;
  }
}
```

## API Reference

- `ModelConfig`: Type for model configuration
- `ModelManager`: Class for managing models
- `modelManager`: Singleton instance of the manager
- `BaseLLM`: Base class for language models from LangChain
