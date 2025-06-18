import { useCallback, useState } from 'react';
import { useAlgorithmVisualization } from './useAlgorithmVisualization';
import { generateGraph } from '@/utils/graphUtils';
import { GraphNode, GraphStep } from '@/types/algorithms';
import { ALGORITHM_CONFIG } from '@/config/algorithmConfig';

interface UseGraphVisualizationProps {
  algorithm: (nodes: GraphNode[], startNodeId: string) => GraphStep[];
  onStepChange?: (step: GraphStep) => void;
}

export const useGraphVisualization = ({
  algorithm,
  onStepChange
}: UseGraphVisualizationProps) => {
  const [startNode, setStartNode] = useState<string>('A');

  const {
    data: nodes,
    setData: setNodes,
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handleNextStep,
    handlePrevStep,
    generateSteps
  } = useAlgorithmVisualization<GraphNode[]>({
    initialData: generateGraph(),
    algorithm: (nodes) => algorithm(nodes, startNode),
    onStepChange
  });

  const generateNewGraph = useCallback(() => {
    const newGraph = generateGraph(ALGORITHM_CONFIG.graph.defaultNodeCount);
    setNodes(newGraph);
    setStartNode('A');
  }, [setNodes]);

  const startNewSearch = useCallback(() => {
    generateSteps();
  }, [generateSteps]);

  return {
    nodes,
    startNode,
    setStartNode,
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    handlePlay,
    handlePause,
    handleReset,
    handleNextStep,
    handlePrevStep,
    generateNewGraph,
    startNewSearch
  };
}; 