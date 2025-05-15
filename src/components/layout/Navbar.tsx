
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, Calendar, Heart, Play, Settings } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-yoga-blue to-yoga-green flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-yoga-dark dark:text-white">YogaAI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/practice">
            <Button variant="ghost" className="flex items-center">
              <Play className="mr-2 h-4 w-4" />
              Practice
            </Button>
          </Link>
          <Link to="/progress">
            <Button variant="ghost" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Progress
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="ml-4 flex items-center">
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-4 py-2 px-4 bg-white dark:bg-gray-900 animate-fade-in">
          <Link to="/practice" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <div className="flex items-center">
              <Play className="mr-2 h-4 w-4" />
              Practice
            </div>
          </Link>
          <Link to="/progress" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Progress
            </div>
          </Link>
          <Link to="/settings" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <div className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </div>
          </Link>
          <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Login
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
