import { GraphNode, GraphStep } from '@/types/algorithms';

export const bfs = (initialNodes: GraphNode[], startNodeId: string): GraphStep[] => {
  const steps: GraphStep[] = [];
  const nodes = JSON.parse(JSON.stringify(initialNodes)) as GraphNode[]; // Deep copy
  
  // Reset node states
  nodes.forEach(node => {
    node.visited = false;
    node.inQueue = false;
    node.distance = Infinity;
    node.parent = undefined;
  });
  
  const queue: string[] = [startNodeId];
  const visitedOrder: string[] = [];
  const startNode = nodes.find(node => node.id === startNodeId);
  
  if (startNode) {
    startNode.inQueue = true;
    startNode.distance = 0;
  }
  
  // Initial state
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    visitedOrder: [...visitedOrder],
    currentNode: undefined,
    queue: [...queue],
    description: `Starting BFS from node ${startNodeId}. Added to queue.`
  });
  
  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const currentNode = nodes.find(node => node.id === currentId);
    
    if (!currentNode) continue;
    
    currentNode.inQueue = false;
    currentNode.visited = true;
    visitedOrder.push(currentId);
    
    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      visitedOrder: [...visitedOrder],
      currentNode: currentId,
      queue: [...queue],
      description: `Visiting node ${currentId}`
    });
    
    // Add all unvisited neighbors to queue
    for (const neighborId of currentNode.connections) {
      const neighbor = nodes.find(node => node.id === neighborId);
      
      if (neighbor && !neighbor.visited && !neighbor.inQueue) {
        neighbor.inQueue = true;
        neighbor.parent = currentId;
        neighbor.distance = (currentNode.distance || 0) + 1;
        queue.push(neighborId);
        
        steps.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          visitedOrder: [...visitedOrder],
          currentNode: currentId,
          queue: [...queue],
          description: `Added neighbor ${neighborId} to queue`
        });
      }
    }
  }
  
  // Final state
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    visitedOrder: [...visitedOrder],
    currentNode: undefined,
    queue: [],
    description: `BFS complete. Visited nodes: ${visitedOrder.join(', ')}`
  });
  
  return steps;
}; 