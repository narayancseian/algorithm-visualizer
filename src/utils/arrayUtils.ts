import { ALGORITHM_CONFIG } from '@/config/algorithmConfig';

export const generateRandomArray = (size: number = ALGORITHM_CONFIG.sorting.defaultArraySize): number[] => {
  const { minValue, maxValue } = ALGORITHM_CONFIG.sorting;
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
  );
};

export const swap = (array: number[], i: number, j: number): void => {
  [array[i], array[j]] = [array[j], array[i]];
};

export const isSorted = (array: number[]): boolean => {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
};

export const getMaxValue = (array: number[]): number => {
  return Math.max(...array);
};

export const getMinValue = (array: number[]): number => {
  return Math.min(...array);
}; 