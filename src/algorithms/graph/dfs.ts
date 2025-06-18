import { GraphNode, GraphStep } from '@/types/algorithms';

export const dfs = (initialNodes: GraphNode[], startNodeId: string): GraphStep[] => {
  const steps: GraphStep[] = [];
  const nodes = JSON.parse(JSON.stringify(initialNodes)) as GraphNode[]; // Deep copy

  // Reset node states
  nodes.forEach(node => {
    node.visited = false;
    node.inStack = false;
  });

  const stack: string[] = [startNodeId];
  const visitedOrder: string[] = [];
  const startNode = nodes.find(node => node.id === startNodeId);

  if (startNode) {
    startNode.inStack = true;
  }

  // Initial state
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    visitedOrder: [...visitedOrder],
    currentNode: undefined,
    stack: [...stack],
    description: `Starting DFS from node ${startNodeId}. Added to stack.`
  });

  while (stack.length > 0) {
    const currentId = stack.pop()!;
    const currentNode = nodes.find(node => node.id === currentId);

    if (!currentNode || currentNode.visited) continue;

    currentNode.inStack = false;
    currentNode.visited = true;
    visitedOrder.push(currentId);

    steps.push({
      nodes: JSON.parse(JSON.stringify(nodes)),
      visitedOrder: [...visitedOrder],
      currentNode: currentId,
      stack: [...stack],
      description: `Visiting node ${currentId}`
    });

    // Add all unvisited neighbors to stack
    for (const neighborId of [...currentNode.connections].reverse()) { // Reverse to maintain visual order
      const neighbor = nodes.find(node => node.id === neighborId);

      if (neighbor && !neighbor.visited && !neighbor.inStack) {
        neighbor.inStack = true;
        stack.push(neighborId);

        steps.push({
          nodes: JSON.parse(JSON.stringify(nodes)),
          visitedOrder: [...visitedOrder],
          currentNode: currentId,
          stack: [...stack],
          description: `Added neighbor ${neighborId} to stack`
        });
      }
    }
  }

  // Final state
  steps.push({
    nodes: JSON.parse(JSON.stringify(nodes)),
    visitedOrder: [...visitedOrder],
    currentNode: undefined,
    stack: [],
    description: `DFS complete. Visited nodes: ${visitedOrder.join(', ')}`
  });

  return steps;
}; 