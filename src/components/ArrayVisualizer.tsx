import { useRef, useState, useEffect } from 'react';
import { VISUALIZATION_CONFIG } from '@/config/visualizationConfig';
import { SortingStep } from '@/types/algorithms';

interface ArrayVisualizerProps {
  array: number[];
  highlightIndices?: number[];
  compareIndices?: number[];
  sortedIndices?: number[];
}

const ArrayVisualizer = ({
  array,
  highlightIndices = [],
  compareIndices = [],
  sortedIndices = [],
}: ArrayVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState<number>(VISUALIZATION_CONFIG.array.barWidth.default);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (!array.length) return;
    
    setMaxValue(Math.max(...array));
    
    // Calculate dynamic bar width based on container size and array length
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const calculatedWidth = (containerWidth / array.length) * 0.6;
      setBarWidth(Math.max(
        VISUALIZATION_CONFIG.array.barWidth.min,
        Math.min(calculatedWidth, VISUALIZATION_CONFIG.array.barWidth.max)
      ));
    }
  }, [array, containerRef]);

  return (
    <div 
      ref={containerRef} 
      className="algo-container"
      style={{ height: VISUALIZATION_CONFIG.array.containerHeight.desktop }}
    >
      {array.map((value, index) => {
        let barClass = "algo-bar";
        
        if (sortedIndices.includes(index)) {
          barClass += " algo-bar-sorted";
        } else if (highlightIndices.includes(index)) {
          barClass += " algo-bar-highlight";
        } else if (compareIndices.includes(index)) {
          barClass += " algo-bar-compare";
        }
        
        const height = (value / maxValue) * 90 + "%";
        const left = `calc(50% + ${(index - array.length / 2) * barWidth * 1.5}px)`;

        return (
          <div
            key={index}
            className={barClass}
            style={{
              height,
              left,
              width: `${barWidth}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ArrayVisualizer;