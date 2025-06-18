import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Learn Algorithms Through Visualization
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Master sorting, searching, and graph algorithms with our interactive visualizations.
          See how algorithms work step-by-step and understand their complexity.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <NavLink to="/algorithms">
            <Button size="lg" className="w-full">
              Explore Algorithms
            </Button>
          </NavLink>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Interactive Visualizations</h3>
            <p className="text-muted-foreground text-center">
              Watch algorithms in action with step-by-step visualizations and detailed explanations.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Complexity Analysis</h3>
            <p className="text-muted-foreground text-center">
              Understand time and space complexity with detailed explanations and graphical representations.
            </p>
          </div>
          
          <div className="bg-card rounded-lg p-6 shadow-md">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-center mb-2">Learn at Your Pace</h3>
            <p className="text-muted-foreground text-center">
              Control the visualization speed and step through algorithms at your own pace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;