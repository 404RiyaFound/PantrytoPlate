import React, { useState } from 'react';
import { useRecipeContext } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import RecipeModal from '../components/RecipeModal';
import { dbService } from '../services/dbService';

export default function Dashboard() {
  const { recipes, toggleFavorite, deleteRecipe } = useRecipeContext();
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const favoriteRecipes = recipes.filter(r => r.isFavorite);
  const recentRecipes = recipes.filter(r => !r.isFavorite).slice(0, 6);

  const handleSaveRecipe = async (editedRecipe) => {
    // In a full implementation, you would update the recipe in Firestore here
    // For now, we'll just log it
    console.log("Saving edited recipe:", editedRecipe);
    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      await deleteRecipe(id);
      setSelectedRecipe(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">My Recipe Dashboard</h1>

      {recipes.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-slate-500 mb-4">You haven't generated any recipes yet.</p>
          <a href="/generate" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
            Generate Your First Recipe
          </a>
        </div>
      ) : (
        <>
          {favoriteRecipes.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="text-red-500">❤️</span> Favorite Recipes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteRecipes.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={setSelectedRecipe}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-slate-500">🕒</span> Recent Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentRecipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={setSelectedRecipe}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)}
          onSave={handleSaveRecipe}
          onDelete={handleDeleteRecipe}
        />
      )}
    </div>
  );
}
