export const ALGORITHM_CONFIG = {
  sorting: {
    defaultArraySize: 15,
    minValue: 5,
    maxValue: 100,
    animationSpeed: {
      min: 0,
      max: 100,
      default: 50
    }
  },
  graph: {
    defaultNodeCount: 8,
    minConnections: 1,
    maxConnections: 3,
    nodeRadius: 20,
    graphRadius: 150,
    centerX: 200,
    centerY: 200
  },
  search: {
    defaultArraySize: 15,
    minValue: 0,
    maxValue: 100
  }
} as const;

export const COMPLEXITY = {
  bubbleSort: {
    time: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    space: 'O(1)'
  },
  quickSort: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    space: 'O(log n)'
  },
  mergeSort: {
    time: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    space: 'O(n)'
  },
  bfs: {
    time: 'O(V + E)',
    space: 'O(V)'
  },
  dfs: {
    time: 'O(V + E)',
    space: 'O(V)'
  }
} as const; 