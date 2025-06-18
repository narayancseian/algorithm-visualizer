import { useCallback, useEffect } from 'react';
import { useAlgorithmVisualization } from './useAlgorithmVisualization';
import { generateRandomArray } from '@/utils/arrayUtils';
import { SortingStep } from '@/types/algorithms';
import { ALGORITHM_CONFIG } from '@/config/algorithmConfig';

interface UseSortingVisualizationProps {
  algorithm: (array: number[]) => SortingStep[];
  onStepChange?: (step: SortingStep) => void;
}

export const useSortingVisualization = ({
  algorithm,
  onStepChange
}: UseSortingVisualizationProps) => {
  const {
    data: array,
    setData: setArray,
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handleNextStep,
    handlePrevStep,
    generateSteps,
    steps
  } = useAlgorithmVisualization<number[]>({
    initialData: generateRandomArray(),
    algorithm,
    onStepChange
  });

  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(ALGORITHM_CONFIG.sorting.defaultArraySize);
    setArray(newArray);
  }, [setArray]);

  return {
    array,
    currentStep,
    currentStepData: steps[currentStep],
    isPlaying,
    speed,
    setSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handleNextStep,
    handlePrevStep,
    generateNewArray
  };
}; 