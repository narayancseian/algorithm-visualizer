import { SortingStep } from '@/types/algorithms';

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
  };

  mergeSortHelper(array, 0, array.length - 1);
  return steps;
}; 