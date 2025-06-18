import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AlgorithmControls from "@/components/AlgorithmControls";
import GraphVisualizer from "@/components/GraphVisualizer";
import ComplexityModal from "@/components/ComplexityModal";
import { bfs, generateGraph, GraphStep } from "@/utils/algorithms";

const BFSPage = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<ReturnType<typeof generateGraph>>([]);
  const [bfsSteps, setBfsSteps] = useState<GraphStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [showComplexityModal, setShowComplexityModal] = useState(false);
  const [startNode, setStartNode] = useState<string>("A");
  
  const generateNewGraph = useCallback(() => {
    const newGraph = generateGraph();
    setNodes(newGraph);
    const steps = bfs(newGraph, "A");
    setBfsSteps(steps);
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
    const steps = bfs(nodes, startNode);
    setBfsSteps(steps);
    setCurrentStep(0);
    setIsPlaying(false);
  };
  
  // Animation playback
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && currentStep < bfsSteps.length - 1) {
      intervalId = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = prevStep + 1;
          
          if (nextStep >= bfsSteps.length - 1) {
            setIsPlaying(false);
            return bfsSteps.length - 1;
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
  }, [isPlaying, currentStep, bfsSteps, speed]);
  
  const handlePlay = () => {
    if (currentStep < bfsSteps.length - 1) {
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
    if (currentStep < bfsSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const currentBfsStep = bfsSteps[currentStep] || {
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
            <h1 className="text-3xl font-bold mb-2">Breadth-First Search (BFS)</h1>
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
              Breadth-First Search (BFS) is a graph traversal algorithm that explores all the vertices 
              of a graph in breadth-first order, i.e., visiting all the neighbor nodes at the present 
              depth prior to moving on to the nodes at the next depth level.
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
            <Button onClick={startNewSearch}>Start BFS</Button>
          </div>
          
          <GraphVisualizer
            nodes={currentBfsStep.nodes}
            currentNode={currentBfsStep.currentNode}
            visitedOrder={currentBfsStep.visitedOrder}
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
              disabled={bfsSteps.length === 0}
            />
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Current Step</h3>
              <div className="text-sm mb-2">
                Step {currentStep + 1} of {bfsSteps.length}
              </div>
              <p className="text-muted-foreground">{currentBfsStep.description}</p>
              
              {currentBfsStep.queue && currentBfsStep.queue.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium">Queue</h4>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {currentBfsStep.queue.map((nodeId, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-100">
                        {nodeId}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <h3 className="text-lg font-semibold mt-6 mb-2">How BFS Works</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Start at a selected source node</li>
                <li>Visit all its neighbors before moving to the next level</li>
                <li>Use a queue to keep track of nodes to visit next</li>
                <li>Mark nodes as visited to avoid cycles</li>
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
        algorithmName="Breadth-First Search (BFS)"
        timeComplexity={{
          best: "O(V + E)",
          average: "O(V + E)",
          worst: "O(V + E)",
        }}
        spaceComplexity="O(V)"
        timeComplexityExplanation="BFS has a time complexity of O(V + E), where V is the number of vertices and E is the number of edges in the graph. This is because in the worst case, BFS needs to visit every vertex and traverse every edge in the graph exactly once. The algorithm processes each vertex when it's dequeued from the queue, and each edge when it's considering the neighbors of a vertex."
        spaceComplexityExplanation="BFS has a space complexity of O(V) because in the worst case, all vertices might be stored in the queue simultaneously. This happens when all vertices are at the same level in the BFS tree (e.g., in a complete binary tree). The space is also used to track which vertices have been visited, requiring O(V) additional space."
      />
    </div>
  );
};

export default BFSPage;