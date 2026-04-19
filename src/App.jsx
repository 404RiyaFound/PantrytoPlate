import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { RecipeProvider } from './context/RecipeContext';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Pantry = lazy(() => import('./pages/Pantry'));
const Generator = lazy(() => import('./pages/Generator'));

function App() {
  return (
    <Router>
      <RecipeProvider>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={
              <div className="flex h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/pantry" 
                  element={
                    <ProtectedRoute>
                      <Pantry />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/generate" 
                  element={
                    <ProtectedRoute>
                      <Generator />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </RecipeProvider>
    </Router>
  );
}

export default App;
