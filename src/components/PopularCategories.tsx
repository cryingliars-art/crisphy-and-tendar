import React from 'react';
import { FoodCategory } from '../types/food';

interface PopularCategoriesProps {
  selectedCategory: FoodCategory;
  onSelectCategory: (cat: FoodCategory) => void;
  categoryCounts: Record<string, number>;
}

const CATEGORY_ICONS: Record<string, string> = {
  'All': '✨',
  'Fried Chicken': '🍗',
  'Burgers': '🍔',
  'Wraps': '🌯',
  'Pizza': '🍕',
  'Fries & Sides': '🍟',
  'Nuggets & Wings': '🧆',
  'Shawarma': '🥙',
  'Drinks': '🥤',
  'Desserts': '🍰',
};

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const categories: FoodCategory[] = [
    'All',
    'Fried Chicken',
    'Burgers',
    'Wraps',
    'Pizza',
    'Fries & Sides',
    'Nuggets & Wings',
    'Shawarma',
    'Drinks',
    'Desserts',
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">
          Popular Categories
        </h3>
        <span className="text-[11px] text-zinc-500 font-medium">Select to filter menu</span>
      </div>

      {/* Horizontally scrollable chips */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] || 0;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border-red-500 shadow-lg shadow-red-950/50 scale-105'
                  : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80'
              }`}
            >
              <span className="text-base">{CATEGORY_ICONS[cat] || '🍽️'}</span>
              <span>{cat}</span>
              {cat !== 'All' && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isSelected ? 'bg-zinc-950 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
