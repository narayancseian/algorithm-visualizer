import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface ComplexityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  algorithmName: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  timeComplexityExplanation: string;
  spaceComplexityExplanation: string;
}

// Helper function to generate graph data based on complexity notation
const generateComplexityData = (complexityType: string, dataPoints = 10) => {
  const data = [];
  
  for (let i = 1; i <= dataPoints; i++) {
    const n = i * 10;
    let value = 0;
    
    // Calculate growth based on complexity notation
    if (complexityType.includes("O(1)")) {
      value = 1;
    } else if (complexityType.includes("O(log n)")) {
      value = Math.log2(n);
    } else if (complexityType.includes("O(n)")) {
      value = n;
    } else if (complexityType.includes("O(n log n)")) {
      value = n * Math.log2(n);
    } else if (complexityType.includes("O(n²)")) {
      value = Math.pow(n, 2);
    } else if (complexityType.includes("O(2^n)")) {
      // Limit exponential growth to avoid chart scaling issues
      value = Math.min(Math.pow(2, i), 1000);
    } else {
      value = n; // Default to linear if unknown
    }
    
    data.push({
      n,
      value: Math.round(value * 100) / 100,
    });
  }
  
  return data;
};

const ComplexityModal = ({
  open,
  onOpenChange,
  algorithmName,
  timeComplexity,
  spaceComplexity,
  timeComplexityExplanation,
  spaceComplexityExplanation,
}: ComplexityModalProps) => {
  // Generate data for different complexity types
  const bestCaseData = generateComplexityData(timeComplexity.best);
  const averageCaseData = generateComplexityData(timeComplexity.average);
  const worstCaseData = generateComplexityData(timeComplexity.worst);
  const spaceComplexityData = generateComplexityData(spaceComplexity);
  
  const timeConfig = {
    best: { label: "Best Case", theme: { light: "#34D399", dark: "#34D399" } },
    average: { label: "Average Case", theme: { light: "#60A5FA", dark: "#60A5FA" } },
    worst: { label: "Worst Case", theme: { light: "#F87171", dark: "#F87171" } },
  };
  
  const spaceConfig = {
    space: { label: "Space Complexity", theme: { light: "#A78BFA", dark: "#A78BFA" } },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{algorithmName} Complexity Analysis</DialogTitle>
          <DialogDescription>
            A detailed breakdown of the time and space complexity for this algorithm.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="time">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="time">Time Complexity</TabsTrigger>
            <TabsTrigger value="space">Space Complexity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="time" className="space-y-4">
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Best Case:</span>
                <code className="bg-secondary p-1 rounded">{timeComplexity.best}</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Average Case:</span>
                <code className="bg-secondary p-1 rounded">{timeComplexity.average}</code>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Worst Case:</span>
                <code className="bg-secondary p-1 rounded">{timeComplexity.worst}</code>
              </div>
            </div>
            
            <div className="h-[200px]">
              <ChartContainer className="h-[200px]" config={timeConfig}>
                <LineChart data={worstCaseData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="n" label={{ value: 'Input Size (n)', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis label={{ value: 'Time', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Best Case" stroke="#34D399" data={bestCaseData} />
                  <Line type="monotone" dataKey="value" name="Average Case" stroke="#60A5FA" data={averageCaseData} />
                  <Line type="monotone" dataKey="value" name="Worst Case" stroke="#F87171" data={worstCaseData} />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Explanation:</h4>
              <p className="text-sm text-muted-foreground">{timeComplexityExplanation}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="space" className="space-y-4">
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Space Complexity:</span>
                <code className="bg-secondary p-1 rounded">{spaceComplexity}</code>
              </div>
            </div>
            
            <div className="h-[200px]">
              <ChartContainer className="h-[200px]" config={spaceConfig}>
                <LineChart data={spaceComplexityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="n" label={{ value: 'Input Size (n)', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis label={{ value: 'Space', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" name="Space Complexity" stroke="#A78BFA" />
                </LineChart>
              </ChartContainer>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Explanation:</h4>
              <p className="text-sm text-muted-foreground">{spaceComplexityExplanation}</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComplexityModal;