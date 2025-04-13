
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md px-4 py-3 shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">DG</span>
          </div>
          <span className="font-bold text-xl text-gray-800">DataGuardian</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/pipeline" className="text-gray-700 hover:text-blue-600 font-medium">
                Pipeline
              </Link>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600">
                  Welcome, {user?.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout} 
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col gap-4">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-blue-600 font-medium py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link 
                to="/pipeline" 
                className="text-gray-700 hover:text-blue-600 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pipeline
              </Link>
              <div className="py-2">
                <span className="text-sm font-medium text-gray-600 block mb-2">
                  Welcome, {user?.name}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 py-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white w-full">
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
