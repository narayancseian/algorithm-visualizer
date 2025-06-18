import { SortingStep } from '@/types/algorithms';
import { swap } from '@/utils/arrayUtils';

const partition = (arr: number[], low: number, high: number, steps: SortingStep[], sortedIndices: number[]): number => {
  const pivot = arr[high];
  let i = low - 1;

  steps.push({
    array: [...arr],
    highlightIndices: [high],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: `Selecting pivot element: ${pivot}`
  });

  for (let j = low; j < high; j++) {
    steps.push({
      array: [...arr],
      highlightIndices: [high],
      compareIndices: [j],
      sortedIndices: [...sortedIndices],
      description: `Comparing element ${arr[j]} with pivot ${pivot}`
    });

    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        swap(arr, i, j);
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

  swap(arr, i + 1, high);
  steps.push({
    array: [...arr],
    highlightIndices: [i + 1, high],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: `Placed pivot element at its final position: ${i + 1}`
  });

  return i + 1;
};

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
      const pivotIndex = partition(arr, low, high, steps, sortedIndices);

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

  quickSortHelper(array, 0, array.length - 1);
  return steps;
}; 