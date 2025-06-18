import { useEffect, useRef, useState } from "react";

interface SearchVisualizerProps {
  array: number[];
  currentIndex?: number;
  searchIndices: number[];
  foundIndex?: number;
}

const SearchVisualizer = ({
  array,
  currentIndex,
  searchIndices,
  foundIndex,
}: SearchVisualizerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState(30);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    if (!array.length) return;
    
    setMaxValue(Math.max(...array));
    
    // Calculate dynamic bar width based on container size and array length
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const calculatedWidth = (containerWidth / array.length) * 0.6;
      setBarWidth(Math.max(4, Math.min(calculatedWidth, 30)));
    }
  }, [array, containerRef]);

  return (
    <div ref={containerRef} className="algo-container">
      {array.map((value, index) => {
        let barClass = "algo-bar";
        
        if (foundIndex !== undefined && index === foundIndex) {
          barClass += " algo-bar-found";
        } else if (currentIndex !== undefined && index === currentIndex) {
          barClass += " algo-bar-current";
        } else if (searchIndices.includes(index)) {
          barClass += " algo-bar-search";
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
          >
            <span className="text-xs absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default SearchVisualizer;