import React from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import IngredientInput from '../components/IngredientInput';
import { Trash2, ShoppingBasket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Pantry() {
  const { pantry, addPantryItem, removePantryItem, loading } = useRecipeContext();

  const handleAdd = (name) => {
    // Check if it already exists
    if (pantry.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      return;
    }
    addPantryItem(name);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBasket className="h-8 w-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-slate-900">My Pantry</h1>
          </div>
          <p className="text-slate-600 mb-8">Add ingredients you currently have at home.</p>
          
          <IngredientInput onAdd={handleAdd} />
        </div>

        <div className="p-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
            <span>Your Ingredients</span>
            <span className="bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-sm">
              {pantry.length} items
            </span>
          </h2>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : pantry.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-500">Your pantry is empty. Add some ingredients above!</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <AnimatePresence>
                {pantry.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    layout
                    className="flex items-center gap-2 bg-white border border-slate-200 pl-4 pr-2 py-2 rounded-lg shadow-sm hover:border-primary-300 transition-colors group"
                  >
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <button
                      onClick={() => removePantryItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
