import { SortingStep } from '@/types/algorithms';

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
    
    if (!swapped) {
      // If no swapping occurred, the array is sorted
      break;
    }
  }
  
  return steps;
}; 