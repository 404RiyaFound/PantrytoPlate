import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, ArrowRight, Sparkles, Clock, List } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-50/50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Turn your <span className="text-primary-600">Pantry</span> <br className="hidden md:block" />
              into a <span className="text-orange-500">Masterpiece</span>
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-slate-600 mx-auto mb-10">
              Don't know what to cook? Enter the ingredients you have, and our AI Chef will generate a structured, delicious recipe tailored just for you.
            </p>
            <div className="flex justify-center gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold text-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div 
            whileHover={{ y: -5 }}
            className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <div className="w-16 h-16 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
              <List className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Manage Pantry</h3>
            <p className="text-slate-600">Keep track of all the ingredients you have at home in one digital space.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Generation</h3>
            <p className="text-slate-600">Our advanced AI creates unique, delicious recipes based exactly on what you have.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100"
          >
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <Clock className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Time-Based</h3>
            <p className="text-slate-600">Need dinner in 20 minutes? Filter and generate recipes that fit your schedule.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
