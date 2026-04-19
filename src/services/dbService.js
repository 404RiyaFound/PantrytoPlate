import { collection, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

export const dbService = {
  // --- PANTRY ---
  async getPantry(userId) {
    const q = query(collection(db, 'pantry'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addPantryItem(userId, ingredient) {
    const newDoc = doc(collection(db, 'pantry'));
    const item = { ...ingredient, userId, createdAt: new Date().toISOString() };
    await setDoc(newDoc, item);
    return { id: newDoc.id, ...item };
  },

  async updatePantryItem(id, data) {
    const itemRef = doc(db, 'pantry', id);
    await updateDoc(itemRef, data);
  },

  async deletePantryItem(id) {
    await deleteDoc(doc(db, 'pantry', id));
  },

  // --- RECIPES ---
  async getRecipes(userId) {
    const q = query(collection(db, 'recipes'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async saveRecipe(userId, recipe) {
    const newDoc = doc(collection(db, 'recipes'));
    const recipeData = { 
      ...recipe, 
      userId, 
      isFavorite: false,
      createdAt: new Date().toISOString() 
    };
    await setDoc(newDoc, recipeData);
    return { id: newDoc.id, ...recipeData };
  },

  async toggleFavorite(id, currentStatus) {
    const recipeRef = doc(db, 'recipes', id);
    await updateDoc(recipeRef, { isFavorite: !currentStatus });
  },

  async deleteRecipe(id) {
    await deleteDoc(doc(db, 'recipes', id));
  }
};
