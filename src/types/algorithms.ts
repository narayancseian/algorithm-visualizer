// Common types for all algorithms
export interface Step {
  description: string;
}

// Sorting algorithm types
export interface SortingStep extends Step {
  array: number[];
  highlightIndices: number[];
  compareIndices: number[];
  sortedIndices: number[];
}

// Graph algorithm types
export interface GraphNode {
  id: string;
  connections: string[];
  x: number;
  y: number;
  visited?: boolean;
  inQueue?: boolean;
  inStack?: boolean;
  distance?: number;
  parent?: string;
}

export interface GraphStep extends Step {
  nodes: GraphNode[];
  visitedOrder: string[];
  currentNode?: string;
  queue?: string[];
  stack?: string[];
}

// Search algorithm types
export interface SearchStep extends Step {
  array: number[];
  currentIndex?: number;
  searchIndices: number[];
  foundIndex?: number;
} 