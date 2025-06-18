# Algorithm Visualizer

An interactive web application for visualizing common algorithms with step-by-step animations, detailed explanations, and complexity analysis.

## Features

- **Interactive Visualizations**: Watch algorithms in action with step-by-step visualizations
- **Multiple Algorithms**: 
  - Sorting: Bubble Sort, Quick Sort, Merge Sort
  - Searching: Binary Search
  - Graph: Breadth-First Search (BFS), Depth-First Search (DFS)
- **User Controls**: 
  - Play/Pause functionality
  - Step-by-step navigation
  - Speed control
  - Reset capability
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Routing**: React Router
- **UI Components**: Custom components with Radix UI primitives
- **Development Tools**: Vite, ESLint, Prettier

## Project Structure

```
src/
├── algorithms/          # Algorithm implementations
│   ├── sorting/        # Sorting algorithms
│   └── graph/          # Graph algorithms
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── ArrayVisualizer.tsx
│   └── GraphVisualizer.tsx
├── config/            # Configuration files
│   ├── algorithmConfig.ts
│   └── visualizationConfig.ts
├── hooks/             # Custom React hooks
│   ├── useAlgorithmVisualization.ts
│   ├── useSortingVisualization.ts
│   └── useGraphVisualization.ts
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── pages/             # Page components
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   cd algorithm-visualizer
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.