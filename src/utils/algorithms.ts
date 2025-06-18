// Data types
export interface SortingStep {
    array: number[];
    highlightIndices: number[];
    compareIndices: number[];
    sortedIndices: number[];
    description: string;
  }
  
  export interface SearchStep {
    array: number[];
    currentIndex?: number;
    searchIndices: number[];
    foundIndex?: number;
    description: string;
  }
  
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
  
  export interface GraphStep {
    nodes: GraphNode[];
    visitedOrder: string[];
    currentNode?: string;
    queue?: string[];
    stack?: string[];
    description: string;
  }
  
  // Helper functions
  export const generateRandomArray = (length: number, max: number = 100): number[] => {
    return Array.from({ length }, () => Math.floor(Math.random() * max) + 1);
  };
  
  export const generateSortedArray = (length: number, max: number = 100): number[] => {
    const array = generateRandomArray(length, max);
    return array.sort((a, b) => a - b);
  };
  
  export const generateGraph = (nodes: number = 8): GraphNode[] => {
    // Create nodes positioned in a circle
    const graphNodes: GraphNode[] = [];
    const radius = 150;
    const centerX = 200;
    const centerY = 200;
    
    for (let i = 0; i < nodes; i++) {
      const angle = (i / nodes) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      graphNodes.push({
        id: String.fromCharCode(65 + i), // A, B, C, ...
        connections: [],
        x,
        y
      });
    }
    
    // Add random connections
    for (let i = 0; i < nodes; i++) {
      const numConnections = Math.floor(Math.random() * 3) + 1; // 1-3 connections
      
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
  
  // Bubble Sort algorithm
  export const bubbleSort = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    const n = array.length;
    const sortedIndices: number[] = [];
    
    // Initial state
    steps.push({
      array: [...array],
      highlightIndices: [],
      compareIndices: [],
      sortedIndices: [],
      description: "Initial array before sorting"
    });
    
    for (let i = 0; i < n; i++) {
      let swapped = false;
      
      for (let j = 0; j < n - i - 1; j++) {
        // Comparing elements
        steps.push({
          array: [...array],
          highlightIndices: [],
          compareIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          description: `Comparing elements at indices ${j} and ${j + 1}`
        });
        
        if (array[j] > array[j + 1]) {
          // Swapping elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
          
          steps.push({
            array: [...array],
            highlightIndices: [j, j + 1],
            compareIndices: [],
            sortedIndices: [...sortedIndices],
            description: `Swapped elements at indices ${j} and ${j + 1}`
          });
        }
      }
      
      // Mark the last element as sorted
      sortedIndices.unshift(n - i - 1);
      
      steps.push({
        array: [...array],
        highlightIndices: [],
        compareIndices: [],
        sortedIndices: [...sortedIndices],
        description: `Element at index ${n - i - 1} is now in its sorted position`
      });
      
      // If no swaps occurred, the array is already sorted
      if (!swapped) {
        // Mark all remaining elements as sorted
        for (let k = 0; k < n - i - 1; k++) {
          if (!sortedIndices.includes(k)) {
            sortedIndices.push(k);
          }
        }
        
        steps.push({
          array: [...array],
          highlightIndices: [],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: "No swaps needed in this pass, array is sorted"
        });
        
        break;
      }
    }
    
    return steps;
  };
  
  // Quick Sort algorithm
  export const quickSort = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    const sortedIndices: number[] = [];
    
    // Initial state
    steps.push({
      array: [...array],
      highlightIndices: [],
      compareIndices: [],
      sortedIndices: [],
      description: "Initial array before sorting"
    });
    
    const quickSortHelper = (arr: number[], low: number, high: number) => {
      if (low < high) {
        // Partitioning step
        const pivotIndex = partition(arr, low, high);
        
        // Mark pivot as sorted
        sortedIndices.push(pivotIndex);
        
        steps.push({
          array: [...arr],
          highlightIndices: [],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Pivot element at index ${pivotIndex} is now in its sorted position`
        });
        
        // Recursively sort the left and right subarrays
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
      } else if (low === high) {
        // Single element is always sorted
        sortedIndices.push(low);
        
        steps.push({
          array: [...arr],
          highlightIndices: [],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Element at index ${low} is now in its sorted position`
        });
      }
    };
    
    const partition = (arr: number[], low: number, high: number): number => {
      const pivot = arr[high];
      
      steps.push({
        array: [...arr],
        highlightIndices: [high],
        compareIndices: [],
        sortedIndices: [...sortedIndices],
        description: `Selected pivot element ${pivot} at index ${high}`
      });
      
      let i = low - 1;
      
      for (let j = low; j < high; j++) {
        // Comparing with pivot
        steps.push({
          array: [...arr],
          highlightIndices: [high],
          compareIndices: [j],
          sortedIndices: [...sortedIndices],
          description: `Comparing element at index ${j} with pivot`
        });
        
        if (arr[j] <= pivot) {
          i++;
          
          // Swap elements
          if (i !== j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            
            steps.push({
              array: [...arr],
              highlightIndices: [i, j],
              compareIndices: [],
              sortedIndices: [...sortedIndices],
              description: `Swapped elements at indices ${i} and ${j}`
            });
          }
        }
      }
      
      // Swap pivot to its final position
      if (i + 1 !== high) {
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        
        steps.push({
          array: [...arr],
          highlightIndices: [i + 1, high],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Swapped pivot from index ${high} to its sorted position at index ${i + 1}`
        });
      }
      
      return i + 1;
    };
    
    quickSortHelper(array, 0, array.length - 1);
    
    return steps;
  };
  
  // Merge Sort algorithm
  export const mergeSort = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    let sortedIndices: number[] = [];
    
    // Initial state
    steps.push({
      array: [...array],
      highlightIndices: [],
      compareIndices: [],
      sortedIndices: [],
      description: "Initial array before sorting"
    });
    
    const mergeSortHelper = (arr: number[], start: number, end: number) => {
      if (start < end) {
        const mid = Math.floor((start + end) / 2);
        
        steps.push({
          array: [...arr],
          highlightIndices: [start, end],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Dividing array from index ${start} to ${end} at midpoint ${mid}`
        });
        
        // Recursively sort the left and right halves
        mergeSortHelper(arr, start, mid);
        mergeSortHelper(arr, mid + 1, end);
        
        // Merge the sorted halves
        merge(arr, start, mid, end);
      } else if (start === end) {
        // Single element is always sorted
        sortedIndices.push(start);
        
        steps.push({
          array: [...arr],
          highlightIndices: [],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Element at index ${start} is considered sorted (single element)`
        });
      }
    };
    
    const merge = (arr: number[], start: number, mid: number, end: number) => {
      const leftArray = arr.slice(start, mid + 1);
      const rightArray = arr.slice(mid + 1, end + 1);
      
      steps.push({
        array: [...arr],
        highlightIndices: [],
        compareIndices: Array.from({ length: end - start + 1 }, (_, i) => start + i),
        sortedIndices: [...sortedIndices],
        description: `Merging subarrays from indices ${start} to ${mid} and ${mid + 1} to ${end}`
      });
      
      let i = 0, j = 0, k = start;
      
      while (i < leftArray.length && j < rightArray.length) {
        steps.push({
          array: [...arr],
          highlightIndices: [],
          compareIndices: [start + i, mid + 1 + j],
          sortedIndices: [...sortedIndices],
          description: `Comparing elements: ${leftArray[i]} and ${rightArray[j]}`
        });
        
        if (leftArray[i] <= rightArray[j]) {
          arr[k] = leftArray[i];
          i++;
        } else {
          arr[k] = rightArray[j];
          j++;
        }
        
        // Mark as sorted
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
        
        steps.push({
          array: [...arr],
          highlightIndices: [k],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Placed element ${arr[k]} at index ${k}`
        });
        
        k++;
      }
      
      // Copy remaining elements
      while (i < leftArray.length) {
        arr[k] = leftArray[i];
        
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
        
        steps.push({
          array: [...arr],
          highlightIndices: [k],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Copied remaining element ${arr[k]} from left subarray to index ${k}`
        });
        
        i++;
        k++;
      }
      
      while (j < rightArray.length) {
        arr[k] = rightArray[j];
        
        if (!sortedIndices.includes(k)) {
          sortedIndices.push(k);
        }
        
        steps.push({
          array: [...arr],
          highlightIndices: [k],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `Copied remaining element ${arr[k]} from right subarray to index ${k}`
        });
        
        j++;
        k++;
      }
      
      // After merging, the entire range is sorted
      for (let idx = start; idx <= end; idx++) {
        if (!sortedIndices.includes(idx)) {
          sortedIndices.push(idx);
        }
      }
      
      steps.push({
        array: [...arr],
        highlightIndices: [],
        compareIndices: [],
        sortedIndices: [...sortedIndices],
        description: `Merged subarrays from ${start} to ${end} are now sorted`
      });
    };
    
    mergeSortHelper(array, 0, array.length - 1);
    
    return steps;
  };
  
  // Binary Search algorithm
  export const binarySearch = (initialArray: number[], target: number): SearchStep[] => {
    const steps: SearchStep[] = [];
    const array = [...initialArray].sort((a, b) => a - b); // Make sure array is sorted
    let left = 0;
    let right = array.length - 1;
    
    // Initial state
    steps.push({
      array: [...array],
      searchIndices: [left, right],
      description: `Starting binary search for target value ${target} in sorted array`
    });
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      // Show the current midpoint
      steps.push({
        array: [...array],
        currentIndex: mid,
        searchIndices: [left, right],
        description: `Checking midpoint at index ${mid} with value ${array[mid]}`
      });
      
      if (array[mid] === target) {
        // Found the target
        steps.push({
          array: [...array],
          currentIndex: mid,
          searchIndices: [left, right],
          foundIndex: mid,
          description: `Target value ${target} found at index ${mid}!`
        });
        return steps;
      } else if (array[mid] < target) {
        // Search the right half
        left = mid + 1;
        steps.push({
          array: [...array],
          searchIndices: [left, right],
          description: `Target value ${target} is greater than ${array[mid]}. Searching right half (indices ${left} to ${right})`
        });
      } else {
        // Search the left half
        right = mid - 1;
        steps.push({
          array: [...array],
          searchIndices: [left, right],
          description: `Target value ${target} is less than ${array[mid]}. Searching left half (indices ${left} to ${right})`
        });
      }
    }
    
    // Target not found
    steps.push({
      array: [...array],
      searchIndices: [],
      description: `Target value ${target} not found in the array`
    });
    
    return steps;
  };
  
  // Breadth-First Search (BFS) algorithm
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
  
  // Depth-First Search (DFS) algorithm
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