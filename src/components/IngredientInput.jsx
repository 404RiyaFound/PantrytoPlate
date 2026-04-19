import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const COMMON_INGREDIENTS = [
  'Chicken Breast', 'Eggs', 'Milk', 'Butter', 'Garlic', 'Onion', 
  'Tomato', 'Potato', 'Rice', 'Pasta', 'Olive Oil', 'Salt', 'Black Pepper',
  'Flour', 'Sugar', 'Cheese', 'Beef', 'Pork', 'Fish', 'Lemon'
];

export default function IngredientInput({ onAdd }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.length > 0) {
      const filtered = COMMON_INGREDIENTS.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleAdd = (itemName) => {
    if (itemName.trim()) {
      onAdd(itemName.trim());
      setInput('');
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(input);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Add an ingredient (e.g. Tomato)"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all shadow-sm"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-slate-200 mt-1 rounded-lg shadow-lg overflow-hidden">
              {suggestions.map((suggestion, index) => (
                <li 
                  key={index}
                  onClick={() => handleAdd(suggestion)}
                  className="px-4 py-2 cursor-pointer hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          disabled={!input.trim()}
          className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-sm"
        >
          <Plus className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}
