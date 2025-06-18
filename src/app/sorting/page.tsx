import React from "react";
import { useSortingVisualization } from "@/hooks/useSortingVisualization";
import { bubbleSort, quickSort, mergeSort } from "@/algorithms/sorting";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import { ALGORITHM_CONFIG } from "@/config/algorithmConfig";
import { SortingStep } from "@/types/algorithms";

const SortingPage = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = React.useState<(array: number[]) => SortingStep[]>(bubbleSort);
  const [arraySize, setArraySize] = React.useState<number>(ALGORITHM_CONFIG.sorting.defaultArraySize);

  const {
    array,
    currentStep,
    currentStepData,
    isPlaying,
    speed,
    setSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handleNextStep,
    handlePrevStep,
    generateNewArray,
  } = useSortingVisualization({
    algorithm: selectedAlgorithm,
  });

  const handleAlgorithmChange = (algorithm: (array: number[]) => SortingStep[]) => {
    setSelectedAlgorithm(algorithm);
    handleReset();
  };

  const handleSizeChange = (size: number) => {
    setArraySize(size);
    handleReset();
  };

  const handleSpeedChange = (value: number) => {
    setSpeed(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sorting Algorithms</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Algorithm</h2>
        <div className="flex gap-4">
          <button
            onClick={() => handleAlgorithmChange(bubbleSort)}
            className={`px-4 py-2 rounded ${
              selectedAlgorithm === bubbleSort
                ? "bg-primary text-white"
                : "bg-accent hover:bg-accent/80"
            }`}
          >
            Bubble Sort
          </button>
          <button
            onClick={() => handleAlgorithmChange(quickSort)}
            className={`px-4 py-2 rounded ${
              selectedAlgorithm === quickSort
                ? "bg-primary text-white"
                : "bg-accent hover:bg-accent/80"
            }`}
          >
            Quick Sort
          </button>
          <button
            onClick={() => handleAlgorithmChange(mergeSort)}
            className={`px-4 py-2 rounded ${
              selectedAlgorithm === mergeSort
                ? "bg-primary text-white"
                : "bg-accent hover:bg-accent/80"
            }`}
          >
            Merge Sort
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Array Size</h2>
        <input
          type="range"
          min={ALGORITHM_CONFIG.sorting.minValue}
          max={ALGORITHM_CONFIG.sorting.maxValue}
          value={arraySize}
          onChange={(e) => handleSizeChange(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2">{arraySize} elements</div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Speed</h2>
        <input
          type="range"
          min={ALGORITHM_CONFIG.sorting.animationSpeed.min}
          max={ALGORITHM_CONFIG.sorting.animationSpeed.max}
          value={speed}
          onChange={(e) => handleSpeedChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mb-8">
        <ArrayVisualizer
          array={array}
          highlightIndices={currentStepData?.highlightIndices}
          compareIndices={currentStepData?.compareIndices}
          sortedIndices={currentStepData?.sortedIndices}
        />
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handlePrevStep}
          className="px-4 py-2 bg-accent hover:bg-accent/80 rounded"
          disabled={!currentStepData || currentStep === 0}
        >
          Previous
        </button>
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className="px-4 py-2 bg-primary text-white hover:bg-primary/80 rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          onClick={handleNextStep}
          className="px-4 py-2 bg-accent hover:bg-accent/80 rounded"
          disabled={!currentStepData || currentStep === selectedAlgorithm(array).length - 1}
        >
          Next
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-accent hover:bg-accent/80 rounded"
        >
          Reset
        </button>
        <button
          onClick={generateNewArray}
          className="px-4 py-2 bg-accent hover:bg-accent/80 rounded"
        >
          New Array
        </button>
      </div>

      {currentStepData && (
        <div className="mt-8 text-center">
          <p className="text-lg">{currentStepData.description}</p>
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {selectedAlgorithm(array).length}
          </p>
        </div>
      )}
    </div>
  );
};

export default SortingPage; 