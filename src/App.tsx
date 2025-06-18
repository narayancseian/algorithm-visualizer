import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import AlgorithmsPage from "./pages/AlgorithmsPage";
import BubbleSortPage from "./pages/BubbleSortPage";
import MergeSortPage from "./pages/MergeSortPage";
import QuickSortPage from "./pages/QuickSortPage";
import SelectionSortPage from "./pages/SelectionSortPage";
import InsertionSortPage from "./pages/InsertionSortPage";
import HeapSortPage from "./pages/HeapSortPage";
import BinarySearchPage from "./pages/BinarySearchPage";
import BFSPage from "./pages/BFSPage";
import DFSPage from "./pages/DFSPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/algorithms" element={<AlgorithmsPage />} />
    <Route path="/algorithms/bubble-sort" element={<BubbleSortPage />} />
    <Route path="/algorithms/merge-sort" element={<MergeSortPage />} />
    <Route path="/algorithms/quick-sort" element={<QuickSortPage />} />
    <Route path="/algorithms/selection-sort" element={<SelectionSortPage />} />
    <Route path="/algorithms/insertion-sort" element={<InsertionSortPage />} />
    <Route path="/algorithms/heap-sort" element={<HeapSortPage />} />
    <Route path="/algorithms/binary-search" element={<BinarySearchPage />} />
    <Route path="/algorithms/bfs" element={<BFSPage />} />
    <Route path="/algorithms/dfs" element={<DFSPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-1">
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;