import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AlgorithmControls from "@/components/AlgorithmControls";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import ComplexityModal from "@/components/ComplexityModal";
import { heapSort } from "@/algorithms/sorting";
import { generateRandomArray } from "@/utils/arrayUtils";
import { SortingStep } from "@/types/algorithms";

const HeapSortPage = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState<number[]>([]);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [showComplexityModal, setShowComplexityModal] = useState(false);
  
  const generateNewArray = useCallback(() => {
    const newArray = generateRandomArray(15);
    setArray(newArray);
    const steps = heapSort(newArray);
    setSortingSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);
  
  // Generate initial array
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);
  
  // Animation playback
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && currentStep < sortingSteps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = prevStep + 1;
          
          if (nextStep >= sortingSteps.length - 1) {
            setIsPlaying(false);
            return sortingSteps.length - 1;
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
  }, [isPlaying, currentStep, sortingSteps, speed]);
  
  const handlePlay = () => {
    if (currentStep < sortingSteps.length - 1) {
      setIsPlaying(true);
    }
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  const handleNextStep = () => {
    if (currentStep < sortingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentSortingStep = sortingSteps[currentStep] || {
    array: [],
    highlightIndices: [],
    compareIndices: [],
    sortedIndices: [],
    description: "",
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button variant="outline" onClick={() => navigate("/algorithms")}>
            Back to Algorithms
          </Button>
        </div>
        <div>
          <Button onClick={generateNewArray}>Generate New Array</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Heap Sort</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">Sorting</Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setShowComplexityModal(true)}
              >
                Time: O(n log n)
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setShowComplexityModal(true)}
              >
                Space: O(1)
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure.
              It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region
              by extracting the largest element and moving it to the sorted region. The improvement consists of the use
              of a heap data structure rather than a linear-time search to find the maximum.
            </p>
          </div>
          
          <ArrayVisualizer
            array={currentSortingStep.array}
            highlightIndices={currentSortingStep.highlightIndices}
            compareIndices={currentSortingStep.compareIndices}
            sortedIndices={currentSortingStep.sortedIndices}
          />
          
          <div className="mt-6">
            <AlgorithmControls
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
              isPlaying={isPlaying}
              onSpeedChange={setSpeed}
              speed={speed}
              disabled={sortingSteps.length === 0}
            />
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Current Step</h3>
              <div className="text-sm mb-2">
                Step {currentStep + 1} of {sortingSteps.length}
              </div>
              <p className="text-muted-foreground">{currentSortingStep.description}</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">How Heap Sort Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Build a max heap from the input array</li>
                <li>Swap the root (maximum element) with the last element</li>
                <li>Remove the last element from the heap</li>
                <li>Heapify the root of the tree</li>
                <li>Repeat steps 2-4 until the heap is empty</li>
                <li>The array is now sorted in ascending order</li>
              </ol>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Complexity Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Case:</span>
                  <code className="bg-secondary p-1 rounded">O(n log n)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Case:</span>
                  <code className="bg-secondary p-1 rounded">O(n log n)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Worst Case:</span>
                  <code className="bg-secondary p-1 rounded">O(n log n)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Space Complexity:</span>
                  <code className="bg-secondary p-1 rounded">O(1)</code>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-2" 
                  onClick={() => setShowComplexityModal(true)}
                >
                  View Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {showComplexityModal && (
        <ComplexityModal
          open={showComplexityModal}
          onOpenChange={setShowComplexityModal}
          algorithmName="Heap Sort"
          timeComplexity={{
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
          }}
          spaceComplexity="O(1)"
          timeComplexityExplanation="Heap Sort has a time complexity of O(n log n) in all cases. Building the heap takes O(n) time, and each of the n heapify operations takes O(log n) time."
          spaceComplexityExplanation="Heap Sort has a space complexity of O(1) as it sorts the array in-place, using only a constant amount of extra space."
        />
      )}
    </div>
  );
};

export default HeapSortPage; 