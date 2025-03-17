# AI Agent Playground for ERP Systems

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.0-purple.svg)](https://vitejs.dev/)
[![LangChain](https://img.shields.io/badge/LangChain-0.1.17-green.svg)](https://js.langchain.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-blue.svg)](https://tailwindcss.com/)

## Overview

AI Agent Playground is a development environment where users can create, test, and deploy AI agents that automate tasks within ERP systems. The platform provides a visual interface for designing agent workflows, a code editor for customizing agent behavior, and a simulation panel for testing agents against mock data.

![AI Agent Playground](https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80)

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
- [Usage](#usage)
  - [Creating an Agent](#creating-an-agent)
  - [Testing an Agent](#testing-an-agent)
  - [Deploying an Agent](#deploying-an-agent)
- [Architecture](#architecture)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Features

- **Interactive Canvas**: Visually design agent workflows with drag-and-drop components
- **Code Editor**: Customize agent behavior and logic with syntax highlighting
- **Simulation Panel**: Test agents against mock ERP data before deployment
- **Component Library**: Pre-built components for common ERP tasks
- **Integration Framework**: Connect to various external services and APIs
- **Model Management**: Configure and use different language models

### Additional Features

- **Templates Library**: Pre-built agent templates for common ERP tasks
- **Performance Metrics**: Monitor agent efficiency and success rates
- **Real ERP Agents**: Connect to real ERP systems for production use
- **Documentation**: Comprehensive documentation for all features and frameworks

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm, yarn, or pnpm package manager
- Basic understanding of React and TypeScript
- (Optional) OpenAI API key for using GPT models

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-agent-playground.git
cd ai-agent-playground

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

### Creating an Agent

1. Navigate to the dashboard and click on "Create Agent"
2. Select a template or start from scratch
3. Use the canvas to add components to your agent workflow
4. Configure each component using the properties panel
5. Customize agent logic in the code editor if needed
6. Save your agent

### Testing an Agent

1. Open the simulation panel
2. Select a mock dataset for testing
3. Run the simulation
4. Review logs, results, and performance metrics
5. Debug and refine your agent as needed

### Deploying an Agent

1. Ensure your agent passes all simulations
2. Configure deployment settings
3. Deploy to your ERP system
4. Monitor performance in the metrics dashboard

## Architecture

The AI Agent Playground is built using a modern web application architecture with React for the frontend and a modular approach to backend services.

### Frontend Architecture

- **React + TypeScript**: Core frontend framework
- **Vite**: Build tool for fast development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Framer Motion**: Animation library

### Agent Architecture

- **LangChain**: Framework for developing applications powered by language models
- **Integration Framework**: Custom framework for connecting to external services
- **Model Management**: Framework for managing language models

## Documentation

Comprehensive documentation is available in the `docs` directory:

- [Introduction](./docs/introduction.md)
- [Getting Started](./docs/getting-started.md)
- [Features](./docs/features/README.md)
- [Architecture](./docs/architecture/README.md)
- [Frameworks and Libraries](./docs/frameworks-libraries/README.md)
- [API Reference](./docs/api-reference/README.md)
- [Tutorials](./docs/tutorials/README.md)

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./docs/contributing.md) for details on how to submit pull requests, report issues, and suggest improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
