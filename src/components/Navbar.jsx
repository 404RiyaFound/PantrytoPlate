import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-primary-500" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">Pantry to Plate</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Dashboard</Link>
                <Link to="/pantry" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">My Pantry</Link>
                <Link to="/generate" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">Generate</Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">Log in</Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 transition-colors">Sign up</Link>
              </>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden border-t border-slate-200">
          <div className="pt-2 pb-3 space-y-1">
            {currentUser ? (
              <>
                <Link to="/dashboard" className="block px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Dashboard</Link>
                <Link to="/pantry" className="block px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">My Pantry</Link>
                <Link to="/generate" className="block px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Generate Recipe</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-50">Log in</Link>
                <Link to="/signup" className="block px-4 py-2 text-base font-medium text-primary-600 hover:bg-primary-50">Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
