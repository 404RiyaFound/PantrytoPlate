import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dbService } from '../services/dbService';
import { useAuth } from './AuthContext';

const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);

export const RecipeProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [pantry, setPantry] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!currentUser) {
      setPantry([]);
      setRecipes([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const fetchedPantry = await dbService.getPantry(currentUser.uid);
      const fetchedRecipes = await dbService.getRecipes(currentUser.uid);
      setPantry(fetchedPantry);
      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addPantryItem = async (name, category = 'Other') => {
    if (!currentUser) return;
    try {
      const newItem = await dbService.addPantryItem(currentUser.uid, { name, category });
      setPantry(prev => [...prev, newItem]);
    } catch (error) {
      console.error("Error adding pantry item:", error);
    }
  };

  const removePantryItem = async (id) => {
    try {
      await dbService.deletePantryItem(id);
      setPantry(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting pantry item:", error);
    }
  };

  const saveGeneratedRecipe = async (recipeData) => {
    if (!currentUser) return;
    try {
      const newRecipe = await dbService.saveRecipe(currentUser.uid, recipeData);
      setRecipes(prev => [newRecipe, ...prev]);
      return newRecipe;
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw error;
    }
  };

  const deleteRecipe = async (id) => {
    try {
      await dbService.deleteRecipe(id);
      setRecipes(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const toggleFavorite = async (id, currentStatus) => {
    try {
      await dbService.toggleFavorite(id, currentStatus);
      setRecipes(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !currentStatus } : r));
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const value = {
    pantry,
    recipes,
    loading,
    addPantryItem,
    removePantryItem,
    saveGeneratedRecipe,
    deleteRecipe,
    toggleFavorite,
    refreshData: fetchData
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};
