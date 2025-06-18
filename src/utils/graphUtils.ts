import { GraphNode } from '@/types/algorithms';
import { ALGORITHM_CONFIG } from '@/config/algorithmConfig';

export const generateGraph = (nodes: number = ALGORITHM_CONFIG.graph.defaultNodeCount): GraphNode[] => {
  const { nodeRadius, graphRadius, centerX, centerY, minConnections, maxConnections } = ALGORITHM_CONFIG.graph;
  
  // Create nodes positioned in a circle
  const graphNodes: GraphNode[] = [];
  
  for (let i = 0; i < nodes; i++) {
    const angle = (i / nodes) * 2 * Math.PI;
    const x = centerX + graphRadius * Math.cos(angle);
    const y = centerY + graphRadius * Math.sin(angle);
    
    graphNodes.push({
      id: String.fromCharCode(65 + i), // A, B, C, ...
      connections: [],
      x,
      y
    });
  }
  
  // Add random connections
  for (let i = 0; i < nodes; i++) {
    const numConnections = Math.floor(Math.random() * (maxConnections - minConnections + 1)) + minConnections;
    
    for (let j = 0; j < numConnections; j++) {
      let target;
      do {
        target = Math.floor(Math.random() * nodes);
      } while (target === i || graphNodes[i].connections.includes(graphNodes[target].id));
      
      graphNodes[i].connections.push(graphNodes[target].id);
      // Make the connection bidirectional for visualization
      if (!graphNodes[target].connections.includes(graphNodes[i].id)) {
        graphNodes[target].connections.push(graphNodes[i].id);
      }
    }
  }
  
  // Ensure the graph is connected
  for (let i = 1; i < nodes; i++) {
    const prevNode = graphNodes[i-1];
    const currNode = graphNodes[i];
    
    if (!prevNode.connections.includes(currNode.id)) {
      prevNode.connections.push(currNode.id);
      currNode.connections.push(prevNode.id);
    }
  }
  
  return graphNodes;
};

export const resetGraph = (nodes: GraphNode[]): GraphNode[] => {
  return nodes.map(node => ({
    ...node,
    visited: false,
    inQueue: false,
    inStack: false,
    distance: undefined,
    parent: undefined
  }));
}; 