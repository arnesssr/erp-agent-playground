# Agent Canvas

The Agent Canvas is a visual workflow designer that allows users to create agent workflows by dragging and dropping components onto a canvas and connecting them together.

## Overview

The Agent Canvas provides a visual representation of an agent's workflow, showing the components and the connections between them. Users can add, remove, and configure components directly on the canvas.

## Features

- **Drag and Drop**: Add components to the canvas by dragging them from the Component Palette
- **Connect Components**: Create connections between components to define the flow of data
- **Zoom and Pan**: Navigate the canvas by zooming in/out and panning
- **Select and Edit**: Select components to view and edit their properties
- **Delete Components**: Remove components from the canvas
- **Undo/Redo**: Revert or reapply changes to the canvas

## Component Types

The Agent Canvas supports various types of components:

- **Triggers**: Start the workflow when a specific event occurs
- **Actions**: Perform operations such as API calls or data transformations
- **Conditions**: Branch the workflow based on conditions
- **Data**: Store and manipulate data within the workflow

## Usage

1. Open the Agent Canvas by creating a new agent or editing an existing one
2. Drag components from the Component Palette onto the canvas
3. Connect components by clicking and dragging from one component to another
4. Select a component to view and edit its properties in the Properties Panel
5. Test the workflow using the Simulation Panel

## Example

```javascript
// Example of how the canvas data is structured
const nodes = [
  {
    id: "1",
    type: "trigger",
    position: { x: 100, y: 100 },
    data: { label: "Start Trigger", description: "Initiates the workflow" },
  },
  {
    id: "2",
    type: "action",
    position: { x: 100, y: 250 },
    data: { label: "Fetch Data", description: "Retrieves data from ERP" },
  },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
];
```

## API Reference

- `AgentCanvas`: The main component for the canvas
- `Node`: Represents a component on the canvas
- `Edge`: Represents a connection between components
