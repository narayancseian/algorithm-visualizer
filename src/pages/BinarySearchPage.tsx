import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AlgorithmControls from "@/components/AlgorithmControls";
import SearchVisualizer from "@/components/SearchVisualizer";
import ComplexityModal from "@/components/ComplexityModal";
import { binarySearch, generateSortedArray, SearchStep } from "@/utils/algorithms";

const BinarySearchPage = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState<number[]>([]);
  const [searchSteps, setSearchSteps] = useState<SearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [showComplexityModal, setShowComplexityModal] = useState(false);
  const [searchTarget, setSearchTarget] = useState<number>(50);
  
  const generateNewArray = useCallback(() => {
    const newArray = generateSortedArray(15);
    setArray(newArray);
    // Select a random value from the array as the search target
    const randomIndex = Math.floor(Math.random() * newArray.length);
    const newTarget = newArray[randomIndex];
    setSearchTarget(newTarget);
    const steps = binarySearch(newArray, newTarget);
    setSearchSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);
  
  // Generate initial array
  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);
  
  // Start a new search with a specific target
  const startNewSearch = () => {
    const steps = binarySearch(array, searchTarget);
    setSearchSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  // Animation playback
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && currentStep < searchSteps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = prevStep + 1;
          
          if (nextStep >= searchSteps.length - 1) {
            setIsPlaying(false);
            return searchSteps.length - 1;
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
  }, [isPlaying, currentStep, searchSteps, speed]);
  
  const handlePlay = () => {
    if (currentStep < searchSteps.length - 1) {
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
    if (currentStep < searchSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentSearchStep = searchSteps[currentStep] || {
    array: [],
    searchIndices: [],
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
            <h1 className="text-3xl font-bold mb-2">Binary Search</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">Searching</Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setShowComplexityModal(true)}
              >
                Time: O(log n)
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
              Binary Search is an efficient algorithm for finding a target value within a sorted array.
              It works by repeatedly dividing the search interval in half until the target is found or
              the interval is empty.
            </p>
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-auto flex-grow">
              <Input
                type="number"
                value={searchTarget}
                onChange={(e) => setSearchTarget(Number(e.target.value))}
                placeholder="Search target"
              />
            </div>
            <Button onClick={startNewSearch}>Search</Button>
          </div>
          
          <SearchVisualizer
            array={currentSearchStep.array}
            currentIndex={currentSearchStep.currentIndex}
            searchIndices={currentSearchStep.searchIndices}
            foundIndex={currentSearchStep.foundIndex}
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
              disabled={searchSteps.length === 0}
            />
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Current Step</h3>
              <div className="text-sm mb-2">
                Step {currentStep + 1} of {searchSteps.length}
              </div>
              <p className="text-muted-foreground">{currentSearchStep.description}</p>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">How Binary Search Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Start with the middle element of the sorted array</li>
                <li>If the target value equals the middle element, we're done</li>
                <li>If the target is less than the middle element, search the left half</li>
                <li>If the target is greater than the middle element, search the right half</li>
                <li>Repeat until the element is found or the subarray is empty</li>
              </ol>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Complexity Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best Case:</span>
                  <code className="bg-secondary p-1 rounded">O(1)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Case:</span>
                  <code className="bg-secondary p-1 rounded">O(log n)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Worst Case:</span>
                  <code className="bg-secondary p-1 rounded">O(log n)</code>
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
        algorithmName="Binary Search"
        timeComplexity={{
          best: "O(1)",
          average: "O(log n)",
          worst: "O(log n)",
        }}
        spaceComplexity="O(1)"
        timeComplexityExplanation="Binary Search has a best-case time complexity of O(1) when the target is found at the middle of the array on the first try. The average and worst-case time complexity is O(log n) because with each comparison, we eliminate half of the remaining elements. This gives us a logarithmic time complexity, making binary search significantly faster than linear search for large sorted arrays."
        spaceComplexityExplanation="Binary Search has a space complexity of O(1) because it only requires a constant amount of extra space regardless of the input size. The iterative implementation only needs variables to keep track of the search boundaries and the middle element, making it very memory efficient."
      />
    </div>
  );
};

export default BinarySearchPage;