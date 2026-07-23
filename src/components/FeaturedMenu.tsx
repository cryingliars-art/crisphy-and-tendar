import React, { useState } from 'react';
import { Search, Flame, Star, Clock, Plus, SlidersHorizontal, Sparkles } from 'lucide-react';
import { MenuItem, FoodCategory } from '../types/food';

interface FeaturedMenuProps {
  items: MenuItem[];
  selectedCategory: FoodCategory;
  onSelectCategory: (cat: FoodCategory) => void;
  onOpenItemModal: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const FeaturedMenu: React.FC<FeaturedMenuProps> = ({
  items,
  selectedCategory,
  onOpenItemModal,
  onQuickAdd,
  searchQuery,
  onSearchChange,
}) => {
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterBestsellersOnly, setFilterBestsellersOnly] = useState(false);

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpicy = !filterSpicyOnly || item.isSpicy;
    const matchesBestseller = !filterBestsellersOnly || item.isBestseller || item.isPopular;

    return matchesCategory && matchesSearch && matchesSpicy && matchesBestseller;
  });

  return (
    <section id="menu" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
            Handcrafted & Pressure Fried
          </span>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white mt-2">
            FEATURED <span className="text-red-600">MENU</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Fresh ingredients, secret spice marinades, prepared fresh upon order.
          </p>
        </div>

        {/* Search & Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search chicken, burgers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 transition-colors"
            />
          </div>

          <button
            onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 border transition-colors ${
              filterSpicyOnly
                ? 'bg-red-600 text-white border-red-500'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Spicy Only
          </button>

          <button
            onClick={() => setFilterBestsellersOnly(!filterBestsellersOnly)}
            className={`px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 border transition-colors ${
              filterBestsellersOnly
                ? 'bg-amber-500 text-zinc-950 border-amber-400'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Bestsellers
          </button>
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-[2rem] p-12 text-center my-8">
          <p className="text-zinc-400 text-base font-semibold">No items matched your filter or search criteria.</p>
          <button
            onClick={() => {
              onSearchChange('');
              setFilterSpicyOnly(false);
              setFilterBestsellersOnly(false);
            }}
            className="mt-4 px-6 py-2.5 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-red-500 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/90 border border-zinc-800/90 rounded-[2rem] overflow-hidden flex flex-col justify-between group hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-950/20 transition-all duration-300"
            >
              <div>
                {/* Image & Badges Container */}
                <div 
                  className="relative h-48 overflow-hidden bg-zinc-950 cursor-pointer"
                  onClick={() => onOpenItemModal(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    {item.isBestseller && (
                      <span className="px-2.5 py-1 bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md">
                        Bestseller
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md flex items-center gap-1">
                        <Flame className="w-3 h-3 fill-white" /> Spicy
                      </span>
                    )}
                  </div>

                  {/* Price Tag Badge */}
                  <div className="absolute bottom-3 right-3 bg-zinc-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-zinc-800 text-amber-400 font-black text-sm shadow-xl">
                    ${item.price.toFixed(2)}
                    {item.originalPrice && (
                      <span className="text-[10px] text-zinc-500 line-through ml-1.5 font-semibold">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-bold text-zinc-500 uppercase tracking-wider text-[10px]">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                      <span className="text-zinc-500">({item.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 
                    onClick={() => onOpenItemModal(item)}
                    className="text-lg font-bold text-white group-hover:text-red-400 transition-colors cursor-pointer leading-tight"
                  >
                    {item.name}
                  </h3>

                  <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {item.calories && (
                    <div className="flex items-center gap-3 pt-1 text-[11px] text-zinc-500 font-medium">
                      <span>🔥 {item.calories} kcal</span>
                      {item.prepTime && <span>• ⏱️ {item.prepTime}</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 pb-5 pt-1 flex items-center gap-2">
                <button
                  onClick={() => onOpenItemModal(item)}
                  className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={() => onQuickAdd(item)}
                  className="px-3.5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl shadow-lg shadow-red-950/40 transition-all active:scale-95 flex items-center justify-center"
                  title="Quick Add to Cart"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
