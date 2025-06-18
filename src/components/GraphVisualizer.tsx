import React from "react";
import { GraphNode } from "@/types/algorithms";
import { VISUALIZATION_CONFIG } from '@/config/visualizationConfig';

interface GraphVisualizerProps {
  nodes: GraphNode[];
  currentNode?: string;
  visitedOrder: string[];
}

const GraphVisualizer = ({
  nodes,
  currentNode,
  visitedOrder,
}: GraphVisualizerProps) => {
  const { svgSize, colors, stroke } = VISUALIZATION_CONFIG.graph;
  const NODE_RADIUS = 20; // Define node radius as a constant since it's not in config

  // Draw edges first so they appear behind nodes
  const renderEdges = () => {
    const edges: React.ReactNode[] = [];
    
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const targetNode = nodes.find(n => n.id === targetId);
        
        if (targetNode && node.id < targetId) { // Avoid duplicate edges
          edges.push(
            <line
              key={`${node.id}-${targetId}`}
              x1={node.x}
              y1={node.y}
              x2={targetNode.x}
              y2={targetNode.y}
              stroke={stroke.color}
              strokeWidth={stroke.width}
            />
          );
        }
      });
    });
    
    return edges;
  };
  
  // Draw nodes
  const renderNodes = () => {
    return nodes.map(node => {
      let nodeColor: string = colors.default;
      
      if (node.id === currentNode) {
        nodeColor = colors.current;
      } else if (node.visited) {
        nodeColor = colors.visited;
      } else if (node.inQueue) {
        nodeColor = colors.inQueue;
      } else if (node.inStack) {
        nodeColor = colors.inStack;
      }
      
      return (
        <g key={node.id}>
          <circle
            cx={node.x}
            cy={node.y}
            r={NODE_RADIUS}
            fill={nodeColor}
            stroke={stroke.color}
            strokeWidth={stroke.width}
          />
          <text
            x={node.x}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="white"
            fontWeight="bold"
          >
            {node.id}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="flex justify-center items-center p-4">
      <svg width={svgSize} height={svgSize} className="bg-card rounded-lg shadow">
        {renderEdges()}
        {renderNodes()}
      </svg>
    </div>
  );
};

export default GraphVisualizer;