import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipeContext } from '../context/RecipeContext';
import { aiService } from '../services/aiService';
import RecipeModal from '../components/RecipeModal';
import { Sparkles, Loader2, Clock, Map, ChefHat } from 'lucide-react';

const CUISINES = ['Any', 'Italian', 'Mexican', 'Indian', 'Asian', 'Mediterranean', 'American'];
const TIMES = [15, 30, 45, 60, 120];

export default function Generator() {
  const { pantry, saveGeneratedRecipe } = useRecipeContext();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cuisine, setCuisine] = useState('Any');
  const [maxTime, setMaxTime] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const navigate = useNavigate();

  // Initialize selected ingredients with all pantry items if none selected
  React.useEffect(() => {
    if (pantry.length > 0 && selectedIngredients.length === 0) {
      setSelectedIngredients(pantry.map(i => i.name));
    }
  }, [pantry, selectedIngredients.length]);

  const toggleIngredient = (name) => {
    setSelectedIngredients(prev => 
      prev.includes(name) 
        ? prev.filter(i => i !== name)
        : [...prev, name]
    );
  };

  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) {
      setError("Please select at least one ingredient.");
      return;
    }

    try {
      setLoading(true);
      setError('');
      const recipe = await aiService.generateRecipe(selectedIngredients, cuisine, maxTime);
      setGeneratedRecipe(recipe);
    } catch (err) {
      setError(err.message || "Failed to generate recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      await saveGeneratedRecipe(recipe);
      setGeneratedRecipe(null);
      navigate('/dashboard');
    } catch (err) {
      setError("Failed to save recipe.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-orange-500" /> AI Recipe Generator
            </h1>
            <p className="text-slate-600">Select what you want to use, and let AI do the magic.</p>
          </div>
        </div>

        <div className="p-8 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Ingredients Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-slate-500" /> Use these ingredients
                </h2>
                <button 
                  onClick={() => setSelectedIngredients(pantry.map(i => i.name))}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Select All
                </button>
              </div>
              
              {pantry.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-center">
                  <p className="text-slate-500 mb-2">Your pantry is empty.</p>
                  <button onClick={() => navigate('/pantry')} className="text-primary-600 font-medium hover:underline">
                    Go add some ingredients
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {pantry.map((item) => {
                    const isSelected = selectedIngredients.includes(item.name);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleIngredient(item.name)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                          isSelected 
                            ? 'bg-primary-50 border-primary-500 text-primary-700 shadow-sm' 
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
            {/* Settings */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Map className="h-4 w-4 text-slate-500" /> Cuisine Preference
              </label>
              <select 
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" /> Max Cooking Time
              </label>
              <select 
                value={maxTime}
                onChange={(e) => setMaxTime(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                {TIMES.map(t => <option key={t} value={t}>{t} mins or less</option>)}
              </select>
            </div>

            <div className="pt-4 border-t border-slate-200">
              {error && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{error}</p>}
              <button
                onClick={handleGenerate}
                disabled={loading || selectedIngredients.length === 0}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" /> Generate Recipe
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {generatedRecipe && (
        <RecipeModal 
          recipe={generatedRecipe} 
          onClose={() => setGeneratedRecipe(null)}
          onSave={handleSaveRecipe}
        />
      )}
    </div>
  );
}
