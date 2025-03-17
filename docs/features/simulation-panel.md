# Simulation Panel

The Simulation Panel allows users to test agents against mock ERP data before deployment.

## Overview

The Simulation Panel provides a way to run agents in a controlled environment with mock data to verify their behavior before deploying them to production. Users can select different mock datasets, run simulations, and view the results.

## Features

- **Mock Data Selection**: Choose from various mock datasets
- **Run Simulation**: Execute the agent against the selected mock data
- **Logs**: View detailed logs of the simulation
- **Results**: See the results of the simulation
- **Metrics**: View performance metrics such as execution time and success rate

## Mock Datasets

The Simulation Panel includes several mock datasets for testing agents:

- **Invoices (Small)**: A small dataset of 10 invoices
- **Invoices (Large)**: A large dataset of 100 invoices
- **Inventory Data**: Inventory records with stock levels and product details
- **Customer Records**: Customer information and purchase history

## Usage

1. Open the Simulation Panel by selecting the "Simulation" tab in the agent development interface
2. Select a mock dataset from the dropdown
3. Click the "Run Simulation" button to start the simulation
4. View the logs, results, and metrics in the respective tabs

## Example

```javascript
// Example of simulation data structure
const simulationData = {
  status: "success", // "idle", "running", "success", "error"
  logs: [
    {
      type: "info", // "info", "error", "success"
      message: "Agent ready for simulation",
      timestamp: "2023-06-15T10:30:00Z",
    },
    {
      type: "success",
      message: "Successfully processed 42 invoices",
      timestamp: "2023-06-15T10:35:00Z",
    },
  ],
  metrics: {
    executionTime: 320, // milliseconds
    memoryUsage: 128, // MB
    successRate: 93.3, // percentage
  },
};
```

## API Reference

- `SimulationPanel`: The main component for the simulation panel
- `handleRunSimulation`: Function to start a simulation
- `simulationData`: Object containing simulation status, logs, and metrics
