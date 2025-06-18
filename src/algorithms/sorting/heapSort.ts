import { SortingStep } from "@/types/algorithms";
import { swap } from "@/utils/arrayUtils";

export const heapSort = (initialArray: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...initialArray];
  const sortedIndices: number[] = [];

  // Push initial state
  steps.push({
    array: [...array],
    highlightIndices: [],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: "Starting Heap Sort"
  });

  // Build max heap
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, array.length, i, steps, sortedIndices);
  }

  // Extract elements from heap one by one
  for (let i = array.length - 1; i > 0; i--) {
    // Push step showing swap
    steps.push({
      array: [...array],
      highlightIndices: [0, i],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Moving current root (${array[0]}) to end`
    });

    // Swap root with last element
    swap(array, 0, i);
    sortedIndices.push(i);

    // Push step after swap
    steps.push({
      array: [...array],
      highlightIndices: [],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Element at index ${i} is now in its final position`
    });

    // Heapify the reduced heap
    heapify(array, i, 0, steps, sortedIndices);
  }

  // Add the last element to sorted indices
  sortedIndices.push(0);

  // Push final state
  steps.push({
    array: [...array],
    highlightIndices: [],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: "Heap Sort completed"
  });

  return steps;
};

// Helper function to heapify a subtree rooted at index i
const heapify = (
  array: number[],
  n: number,
  i: number,
  steps: SortingStep[],
  sortedIndices: number[]
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Push step showing current node and its children
  steps.push({
    array: [...array],
    highlightIndices: [i],
    compareIndices: [left, right].filter(index => index < n),
    sortedIndices: [...sortedIndices],
    description: `Checking node at index ${i} and its children`
  });

  // Check if left child exists and is greater than root
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }

  // Check if right child exists and is greater than largest so far
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    // Push step showing swap
    steps.push({
      array: [...array],
      highlightIndices: [i, largest],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Swapping elements at indices ${i} and ${largest}`
    });

    swap(array, i, largest);

    // Push step after swap
    steps.push({
      array: [...array],
      highlightIndices: [],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Heapifying subtree rooted at index ${largest}`
    });

    // Recursively heapify the affected sub-tree
    heapify(array, n, largest, steps, sortedIndices);
  }
}; 