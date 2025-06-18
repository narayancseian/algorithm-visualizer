import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-primary">
          Algorithm Visualizer
        </NavLink>
        
        <div className="flex items-center space-x-4">
          <NavLink 
            to="/algorithms" 
            className={({ isActive }) => 
              isActive ? "font-medium text-primary" : "text-foreground hover:text-primary"
            }
          >
            Algorithms
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;