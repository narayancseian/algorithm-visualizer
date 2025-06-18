import { useState } from "react";
import AlgorithmCard from "@/components/AlgorithmCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample algorithms data
const algorithmsData = [
  {
    id: "bubble-sort",
    title: "Bubble Sort",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    path: "/algorithms/bubble-sort",
    completed: false,
  },
  {
    id: "quick-sort",
    title: "Quick Sort",
    description: "An efficient, divide-and-conquer sorting algorithm that selects a 'pivot' element and partitions the array around the pivot.",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    path: "/algorithms/quick-sort",
    completed: false,
  },
  {
    id: "merge-sort",
    title: "Merge Sort",
    description: "A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    path: "/algorithms/merge-sort",
    completed: false,
  },
  {
    id: "selection-sort",
    title: "Selection Sort",
    description: "A simple sorting algorithm that divides the input into a sorted and unsorted region, and repeatedly selects the smallest element from the unsorted region.",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    path: "/algorithms/selection-sort",
    completed: false,
  },
  {
    id: "insertion-sort",
    title: "Insertion Sort",
    description: "A simple sorting algorithm that builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
    category: "Sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    path: "/algorithms/insertion-sort",
    completed: false,
  },
  {
    id: "heap-sort",
    title: "Heap Sort",
    description: "A comparison-based sorting algorithm that uses a binary heap data structure to sort elements in ascending or descending order.",
    category: "Sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    path: "/algorithms/heap-sort",
    completed: false,
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "A search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
    category: "Searching",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    path: "/algorithms/binary-search",
    completed: false,
  },
  {
    id: "bfs",
    title: "Breadth-First Search",
    description: "A graph traversal algorithm that explores all the vertices of a graph in breadth-first order, i.e., visiting all neighbors before moving to the next level.",
    category: "Graph",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    path: "/algorithms/bfs",
    completed: false,
  },
  {
    id: "dfs",
    title: "Depth-First Search",
    description: "A graph traversal algorithm that explores as far as possible along each branch before backtracking, using a stack to keep track of vertices to visit next.",
    category: "Graph",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    path: "/algorithms/dfs",
    completed: false,
  },
];

const AlgorithmsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter algorithms based on search term and active category
  const filteredAlgorithms = algorithmsData.filter((algo) => {
    const matchesSearch = (
      algo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      algo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesCategory = activeCategory === "all" || algo.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Explore Algorithms</h1>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <Input
          placeholder="Search algorithms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sorting">Sorting</TabsTrigger>
            <TabsTrigger value="searching">Searching</TabsTrigger>
            <TabsTrigger value="graph">Graph</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {filteredAlgorithms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No algorithms found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlgorithms.map((algorithm) => (
            <AlgorithmCard
              key={algorithm.id}
              title={algorithm.title}
              description={algorithm.description}
              category={algorithm.category}
              timeComplexity={algorithm.timeComplexity}
              spaceComplexity={algorithm.spaceComplexity}
              path={algorithm.path}
              completed={algorithm.completed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AlgorithmsPage;