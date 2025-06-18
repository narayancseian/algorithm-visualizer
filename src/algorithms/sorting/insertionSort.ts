import { SortingStep } from "@/types/algorithms";

export const insertionSort = (initialArray: number[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const array = [...initialArray];
  const sortedIndices: number[] = [];

  // Push initial state
  steps.push({
    array: [...array],
    highlightIndices: [],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: "Starting Insertion Sort"
  });

  // First element is considered sorted
  sortedIndices.push(0);
  steps.push({
    array: [...array],
    highlightIndices: [0],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: "First element is considered sorted"
  });

  for (let i = 1; i < array.length; i++) {
    const current = array[i];
    let j = i - 1;

    // Push step showing current element
    steps.push({
      array: [...array],
      highlightIndices: [i],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Processing element at index ${i}`
    });

    // Compare and shift elements
    while (j >= 0 && array[j] > current) {
      // Push step showing comparison
      steps.push({
        array: [...array],
        highlightIndices: [i],
        compareIndices: [j],
        sortedIndices: [...sortedIndices],
        description: `Comparing elements at indices ${j} and ${i}`
      });

      array[j + 1] = array[j];
      j--;

      // Push step showing shift
      steps.push({
        array: [...array],
        highlightIndices: [j + 1],
        compareIndices: [],
        sortedIndices: [...sortedIndices],
        description: `Shifting element to the right`
      });
    }

    array[j + 1] = current;
    sortedIndices.push(i);

    // Push step showing insertion
    steps.push({
      array: [...array],
      highlightIndices: [j + 1],
      compareIndices: [],
      sortedIndices: [...sortedIndices],
      description: `Inserted element at index ${j + 1}`
    });
  }

  // Push final state
  steps.push({
    array: [...array],
    highlightIndices: [],
    compareIndices: [],
    sortedIndices: [...sortedIndices],
    description: "Insertion Sort completed"
  });

  return steps;
}; 