import React, { useState } from 'react';
import { X, Clock, ChefHat, Save, Edit2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecipeModal({ recipe, onClose, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(recipe);

  const handleSave = () => {
    onSave(editedRecipe);
    setIsEditing(false);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...editedRecipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setEditedRecipe({ ...editedRecipe, ingredients: newIngredients });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
            {isEditing ? (
              <input 
                type="text" 
                value={editedRecipe.recipeName}
                onChange={(e) => setEditedRecipe({...editedRecipe, recipeName: e.target.value})}
                className="font-bold text-xl text-slate-900 bg-white border border-slate-300 rounded px-2 py-1 w-2/3"
              />
            ) : (
              <h2 className="font-bold text-2xl text-slate-900">{recipe.recipeName}</h2>
            )}
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-grow">
            <div className="flex items-center gap-6 mb-8 bg-primary-50 p-4 rounded-xl border border-primary-100">
              <div className="flex items-center gap-2 text-primary-700 font-medium">
                <Clock className="h-5 w-5" />
                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      value={editedRecipe.cookingTime}
                      onChange={(e) => setEditedRecipe({...editedRecipe, cookingTime: parseInt(e.target.value)})}
                      className="w-16 px-2 py-1 rounded border border-primary-300"
                    /> mins
                  </div>
                ) : (
                  <span>{recipe.cookingTime} mins</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-primary-700 font-medium">
                <ChefHat className="h-5 w-5" />
                {isEditing ? (
                  <select 
                    value={editedRecipe.difficulty}
                    onChange={(e) => setEditedRecipe({...editedRecipe, difficulty: e.target.value})}
                    className="px-2 py-1 rounded border border-primary-300"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                ) : (
                  <span>{recipe.difficulty}</span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ingredients & Spices */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm">🛒</div>
                  Ingredients
                </h3>
                <ul className="space-y-3 mb-8">
                  {editedRecipe.ingredients.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                      {isEditing ? (
                        <div className="flex gap-2 w-full">
                          <input 
                            type="text" 
                            value={item.name} 
                            onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
                            className="flex-grow px-2 py-1 border border-slate-300 rounded text-sm"
                          />
                          <input 
                            type="text" 
                            value={item.quantity} 
                            onChange={(e) => handleIngredientChange(idx, 'quantity', e.target.value)}
                            className="w-24 px-2 py-1 border border-slate-300 rounded text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <span className="text-slate-700 font-medium">{item.name}</span>
                          <span className="text-slate-500 text-sm bg-slate-100 px-2 py-1 rounded">{item.quantity}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>

                <h3 className="font-bold text-lg mb-4 text-slate-800">Spices & Condiments</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.spices?.map((spice, idx) => (
                    <span key={idx} className="px-3 py-1 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-full text-sm font-medium">
                      {spice}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">🍳</div>
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {editedRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      {isEditing ? (
                        <textarea 
                          value={step}
                          onChange={(e) => {
                            const newSteps = [...editedRecipe.steps];
                            newSteps[idx] = e.target.value;
                            setEditedRecipe({...editedRecipe, steps: newSteps});
                          }}
                          className="w-full px-3 py-2 border border-slate-300 rounded text-sm"
                          rows={3}
                        />
                      ) : (
                        <p className="text-slate-700 leading-relaxed">{step}</p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between">
            {onDelete ? (
              <button 
                onClick={() => onDelete(recipe.id)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
              >
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            ) : <div></div>}
            
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                  >
                    <Save className="h-4 w-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Edit2 className="h-4 w-4" /> Edit Recipe
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
