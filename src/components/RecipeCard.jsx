import React from 'react';
import { Clock, Heart, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecipeCard({ recipe, onClick, onToggleFavorite }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-all group"
      onClick={() => onClick(recipe)}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {recipe.recipeName}
          </h3>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(recipe.id, recipe.isFavorite);
            }}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <Heart className={`h-5 w-5 ${recipe.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookingTime} mins</span>
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="h-4 w-4" />
            <span>{recipe.difficulty}</span>
          </div>
        </div>

        <div className="text-sm text-slate-600 line-clamp-2 mb-4">
          Contains: {recipe.ingredients.map(i => i.name).join(', ')}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {recipe.spices?.slice(0, 3).map((spice, i) => (
            <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
              {spice}
            </span>
          ))}
          {recipe.spices?.length > 3 && (
            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
              +{recipe.spices.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
