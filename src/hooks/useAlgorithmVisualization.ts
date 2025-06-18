import { useState, useEffect, useCallback } from 'react';
import { ALGORITHM_CONFIG } from '@/config/algorithmConfig';

interface UseAlgorithmVisualizationProps<T> {
  initialData: T;
  algorithm: (data: T) => any[];
  onStepChange?: (step: any) => void;
}

export const useAlgorithmVisualization = <T>({
  initialData,
  algorithm,
  onStepChange
}: UseAlgorithmVisualizationProps<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(ALGORITHM_CONFIG.sorting.animationSpeed.default);

  const generateSteps = useCallback(() => {
    const newSteps = algorithm(data);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, [algorithm, data]);

  useEffect(() => {
    generateSteps();
  }, [generateSteps]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = prevStep + 1;
          
          if (nextStep >= steps.length - 1) {
            setIsPlaying(false);
            return steps.length - 1;
          }
          
          return nextStep;
        });
      }, 1000 - speed * 4);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, currentStep, steps.length, speed]);

  useEffect(() => {
    if (onStepChange && steps[currentStep]) {
      onStepChange(steps[currentStep]);
    }
  }, [currentStep, steps, onStepChange]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    data,
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handleNextStep,
    handlePrevStep,
    setData,
    generateSteps,
    steps
  };
}; 