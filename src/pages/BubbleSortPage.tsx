import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AlgorithmControls from "@/components/AlgorithmControls";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import ComplexityModal from "@/components/ComplexityModal";
import { bubbleSort, generateRandomArray, SortingStep } from "@/utils/algorithms";

const BubbleSortPage = () => {
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
    const steps = bubbleSort(newArray);
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
            <h1 className="text-3xl font-bold mb-2">Bubble Sort</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">Sorting</Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setShowComplexityModal(true)}
              >
                Time: O(n²)
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
              Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, 
              compares adjacent elements, and swaps them if they are in the wrong order. The algorithm 
              gets its name because smaller elements "bubble" to the top of the list.
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
              
              <h3 className="text-lg font-semibold mt-6 mb-2">How Bubble Sort Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Start at the beginning of the array</li>
                <li>Compare each pair of adjacent elements</li>
                <li>If they are in the wrong order, swap them</li>
                <li>Move to the next pair</li>
                <li>After each pass, the largest element "bubbles" to the end</li>
                <li>Repeat until no more swaps are needed</li>
              </ol>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Complexity Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Case:</span>
                  <code className="bg-secondary p-1 rounded">O(n)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Case:</span>
                  <code className="bg-secondary p-1 rounded">O(n²)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Worst Case:</span>
                  <code className="bg-secondary p-1 rounded">O(n²)</code>
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
      
      <ComplexityModal
        open={showComplexityModal}
        onOpenChange={setShowComplexityModal}
        algorithmName="Bubble Sort"
        timeComplexity={{
          best: "O(n)",
          average: "O(n²)",
          worst: "O(n²)",
        }}
        spaceComplexity="O(1)"
        timeComplexityExplanation="Bubble Sort compares each pair of adjacent items and swaps them if they are in the wrong order. In the worst case scenario, we need to make n−1 comparisons for each of the n elements, leading to O(n²) time complexity. The best case occurs when the array is already sorted, resulting in O(n) time complexity because we only need to iterate through the array once."
        spaceComplexityExplanation="Bubble Sort is an in-place sorting algorithm, meaning it doesn't require additional memory proportional to the input size. It only uses a constant amount of extra space regardless of the input size, resulting in O(1) space complexity."
      />
    </div>
  );
};

export default BubbleSortPage;