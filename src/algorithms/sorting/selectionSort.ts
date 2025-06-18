import { SortingStep } from "@/types/algorithms";
import { swap } from "@/utils/arrayUtils";

export const selectionSort = (initialArray: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...initialArray];
  const sortedIndices: number[] = [];

  // Push initial state
  steps.push({
    array: [...array],
    highlightIndices: [],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: "Starting Selection Sort"
  });

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    // Push step showing current minimum
    steps.push({
      array: [...array],
      highlightIndices: [minIndex],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Current minimum element is at index ${minIndex}`
    });

    // Find minimum element in unsorted portion
    for (let j = i + 1; j < array.length; j++) {
      // Push step showing comparison
      steps.push({
        array: [...array],
        highlightIndices: [minIndex],
        compareIndices: [j],
        sortedIndices: [...sortedIndices],
        description: `Comparing elements at indices ${minIndex} and ${j}`
      });

      if (array[j] < array[minIndex]) {
        minIndex = j;
        // Push step showing new minimum
        steps.push({
          array: [...array],
          highlightIndices: [minIndex],
          compareIndices: [],
          sortedIndices: [...sortedIndices],
          description: `New minimum element found at index ${minIndex}`
        });
      }
    }

    // Swap if minimum is not at current position
    if (minIndex !== i) {
      swap(array, i, minIndex);
      // Push step showing swap
      steps.push({
        array: [...array],
        highlightIndices: [i, minIndex],
        compareIndices: [],
        sortedIndices: [...sortedIndices],
        description: `Swapping elements at indices ${i} and ${minIndex}`
      });
    }

    sortedIndices.push(i);
    // Push step showing sorted portion
    steps.push({
      array: [...array],
      highlightIndices: [],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Element at index ${i} is now in its final position`
    });
  }

  // Add final sorted element
  sortedIndices.push(array.length - 1);
  // Push final state
  steps.push({
    array: [...array],
    highlightIndices: [],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: "Selection Sort completed"
  });

  return steps;
}; 