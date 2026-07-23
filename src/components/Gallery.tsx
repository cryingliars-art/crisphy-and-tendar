import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/mockData';
import { Heart, X, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../types/food';

export const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Fried Chicken', 'Burgers', 'Wings', 'Sides', 'Shawarma', 'Pizza'];

  const filteredItems = GALLERY_ITEMS.filter((item) => 
    activeFilter === 'All' || item.category === activeFilter
  );

  const handleLike = (id: string, initialLikes: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const current = likesMap[id] ?? initialLikes;
    setLikesMap({ ...likesMap, [id]: current + 1 });
  };

  return (
    <section id="gallery" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
            Visual Feast
          </span>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white mt-2">
            CRISPY <span className="text-red-600">GALLERY</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Mouthwatering shots directly from our pressure fryer and open kitchen.
          </p>
        </div>

        {/* Gallery Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeFilter === cat
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const currentLikes = likesMap[item.id] ?? item.likes;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group relative h-72 rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-zinc-800 cursor-pointer shadow-xl hover:border-red-600/50 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Like Badge */}
              <button
                onClick={(e) => handleLike(item.id, item.likes, e)}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-white flex items-center gap-1.5 hover:bg-red-600 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>{currentLikes}</span>
              </button>

              {/* Title & Category Overlay */}
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  {item.category}
                </span>
                <h3 className="text-lg font-black text-white leading-snug group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" /> Click to view full image
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-zinc-800 text-white rounded-full border border-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[80vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            <div className="p-6 bg-zinc-900 flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  {selectedImage.category}
                </span>
                <h3 className="text-xl font-extrabold text-white">{selectedImage.title}</h3>
              </div>
              <button
                onClick={(e) => handleLike(selectedImage.id, selectedImage.likes, e)}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-lg flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{likesMap[selectedImage.id] ?? selectedImage.likes} Likes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
