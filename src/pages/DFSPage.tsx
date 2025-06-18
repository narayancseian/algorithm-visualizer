import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AlgorithmControls from "@/components/AlgorithmControls";
import GraphVisualizer from "@/components/GraphVisualizer";
import ComplexityModal from "@/components/ComplexityModal";
import { dfs, generateGraph, GraphStep } from "@/utils/algorithms";

const DFSPage = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<ReturnType<typeof generateGraph>>([]);
  const [dfsSteps, setDfsSteps] = useState<GraphStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [showComplexityModal, setShowComplexityModal] = useState(false);
  const [startNode, setStartNode] = useState<string>("A");
  
  const generateNewGraph = useCallback(() => {
    const newGraph = generateGraph();
    setNodes(newGraph);
    const steps = dfs(newGraph, "A");
    setDfsSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
    setStartNode("A");
  }, []);
  
  // Generate initial graph
  useEffect(() => {
    generateNewGraph();
  }, [generateNewGraph]);
  
  // Start a new search with a specific start node
  const startNewSearch = () => {
    const steps = dfs(nodes, startNode);
    setDfsSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  // Animation playback
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && currentStep < dfsSteps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = prevStep + 1;
          
          if (nextStep >= dfsSteps.length - 1) {
            setIsPlaying(false);
            return dfsSteps.length - 1;
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
  }, [isPlaying, currentStep, dfsSteps, speed]);
  
  const handlePlay = () => {
    if (currentStep < dfsSteps.length - 1) {
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
    if (currentStep < dfsSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentDfsStep = dfsSteps[currentStep] || {
    nodes: [],
    visitedOrder: [],
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
          <Button onClick={generateNewGraph}>Generate New Graph</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Depth-First Search (DFS)</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">Graph</Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setShowComplexityModal(true)}
              >
                Time: O(V + E)
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer hover:bg-secondary"
                onClick={() => setShowComplexityModal(true)}
              >
                Space: O(V)
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Depth-First Search (DFS) is a graph traversal algorithm that explores as far as possible 
              along each branch before backtracking. It uses a stack data structure or recursion to 
              keep track of vertices to visit next.
            </p>
          </div>
          
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-64">
              <Select value={startNode} onValueChange={setStartNode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select start node" />
                </SelectTrigger>
                <SelectContent>
                  {nodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>Node {node.id}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={startNewSearch}>Start DFS</Button>
          </div>
          
          <GraphVisualizer
            nodes={currentDfsStep.nodes}
            currentNode={currentDfsStep.currentNode}
            visitedOrder={currentDfsStep.visitedOrder}
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
              disabled={dfsSteps.length === 0}
            />
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Current Step</h3>
              <div className="text-sm mb-2">
                Step {currentStep + 1} of {dfsSteps.length}
              </div>
              <p className="text-muted-foreground">{currentDfsStep.description}</p>
              
              {currentDfsStep.stack && currentDfsStep.stack.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium">Stack</h4>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {currentDfsStep.stack.map((nodeId, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-100">
                        {nodeId}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <h3 className="text-lg font-semibold mt-6 mb-2">How DFS Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Start at a selected source node</li>
                <li>Explore as far as possible along each branch</li>
                <li>Use a stack (or recursion) to keep track of nodes to visit</li>
                <li>Mark nodes as visited to avoid cycles</li>
                <li>Backtrack when reaching a dead end</li>
                <li>Continue until all reachable nodes are visited</li>
              </ol>
              
              <h3 className="text-lg font-semibold mt-6 mb-2">Complexity Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time Complexity:</span>
                  <code className="bg-secondary p-1 rounded">O(V + E)</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Space Complexity:</span>
                  <code className="bg-secondary p-1 rounded">O(V)</code>
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
        algorithmName="Depth-First Search (DFS)"
        timeComplexity={{
          best: "O(V + E)",
          average: "O(V + E)",
          worst: "O(V + E)",
        }}
        spaceComplexity="O(V)"
        timeComplexityExplanation="DFS has a time complexity of O(V + E), where V is the number of vertices and E is the number of edges in the graph. This is because DFS visits each vertex and explores each edge exactly once in the worst case. The time complexity is linear in the size of the graph, making it efficient for large graphs."
        spaceComplexityExplanation="DFS has a space complexity of O(V) in the worst case, which occurs when the graph is a skewed tree (e.g., a linked list). In this case, the recursion stack or explicit stack would contain all vertices in the path from the root to the deepest leaf. For general graphs, the space complexity is determined by the maximum depth of the recursion, which is bounded by the number of vertices."
      />
    </div>
  );
};

export default DFSPage;