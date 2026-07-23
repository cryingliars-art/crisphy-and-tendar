import React from 'react';
import { Sparkles, ArrowRight, ShoppingBag, MapPin, Clock, Star, Flame, Copy, Check } from 'lucide-react';
import { MenuItem } from '../types/food';

interface HeroBentoProps {
  onQuickAdd: (item: MenuItem) => void;
  onExploreMenu: () => void;
  onOpenDeals: () => void;
  onOpenItemModal: (item: MenuItem) => void;
  sampleItems: {
    zinger: MenuItem | undefined;
    wings: MenuItem | undefined;
  };
}

export const HeroBento: React.FC<HeroBentoProps> = ({
  onQuickAdd,
  onExploreMenu,
  onOpenDeals,
  onOpenItemModal,
  sampleItems,
}) => {
  const [copiedCode, setCopiedCode] = React.useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CRISPY24');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="hero" className="w-full pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
        
        {/* BIG HERO CARD (Spans 2 Cols, 2 Rows on lg) */}
        <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden group shadow-2xl flex flex-col justify-between min-h-[440px]">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/15 blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 blur-[100px] pointer-events-none"></div>
          
          {/* Overlay Background Dish Image */}
          <div className="absolute -right-12 -bottom-12 w-80 h-80 opacity-20 sm:opacity-30 pointer-events-none transition-transform duration-700 group-hover:scale-105">
            <img 
              src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=600" 
              alt="Crispy Fried Chicken"
              className="w-full h-full object-cover rounded-full filter drop-shadow-2xl"
            />
          </div>

          {/* Top Tag & Main Title */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600/15 border border-red-600/30 text-red-500 text-xs font-extrabold rounded-full tracking-widest uppercase">
                <Flame className="w-3.5 h-3.5" /> 24-Hr Marinated Signature
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black leading-[0.92] italic tracking-tight">
              <span className="text-white">CRISPY</span><br/>
              <span className="text-red-600">OUTSIDE,</span><br/>
              <span className="text-amber-400">TENDER</span><br/>
              <span className="text-white">INSIDE!</span>
            </h1>

            <p className="text-zinc-400 max-w-md text-sm sm:text-base font-normal leading-relaxed pt-1">
              Experience the unmatched crunch of our pressure-fried chicken. Soaked 24 hours in secret spices, fried golden to order.
            </p>
          </div>

          {/* CTAs */}
          <div className="relative z-10 flex flex-wrap gap-3 pt-6">
            <button
              onClick={onExploreMenu}
              className="px-7 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black rounded-2xl shadow-xl shadow-red-900/30 flex items-center gap-2 transition-all active:scale-95 text-sm uppercase tracking-wider"
            >
              <ShoppingBag className="w-4 h-4" />
              View Menu
            </button>
            <button
              onClick={onOpenDeals}
              className="px-7 py-3.5 bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-100 border border-zinc-700/80 font-bold rounded-2xl flex items-center gap-2 transition-colors text-sm uppercase tracking-wider"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Hot Deals
            </button>
          </div>

          {/* Subtle Watermark */}
          <div className="absolute right-4 bottom-2 opacity-5 select-none pointer-events-none hidden sm:block">
            <span className="text-[10rem] font-black text-white leading-none tracking-tighter">CHKN</span>
          </div>
        </div>

        {/* FEATURED ITEM 1: Zinger Deluxe Burger */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between overflow-hidden relative group hover:border-red-600/40 transition-colors">
          <div className="relative z-10">
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md">Bestseller</span>
                <h3 className="text-xl font-bold text-white mt-1">Zinger Deluxe</h3>
              </div>
              <span className="text-amber-400 font-black text-lg">$8.99</span>
            </div>
            <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2">Double spicy fillet, house mayo, lettuce on brioche.</p>
          </div>

          <div className="h-28 my-2 flex items-center justify-center relative cursor-pointer" onClick={() => sampleItems.zinger && onOpenItemModal(sampleItems.zinger)}>
            <div className="w-28 h-28 bg-red-600/10 rounded-full blur-xl absolute opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400" 
              alt="Zinger Deluxe Burger"
              className="w-28 h-24 object-cover rounded-2xl shadow-xl filter drop-shadow-lg group-hover:scale-105 transition-transform"
            />
          </div>

          <button
            onClick={() => sampleItems.zinger ? onQuickAdd(sampleItems.zinger) : onExploreMenu()}
            className="w-full py-3 bg-zinc-800 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
          </button>
        </div>

        {/* FEATURED ITEM 2: Wing Basket */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between overflow-hidden relative group hover:border-red-600/40 transition-colors">
          <div className="relative z-10">
            <div className="flex justify-between items-start gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-md">Fiery Spicy</span>
                <h3 className="text-xl font-bold text-white mt-1">12-Pcs Wings</h3>
              </div>
              <span className="text-amber-400 font-black text-lg">$12.50</span>
            </div>
            <p className="text-zinc-400 text-xs mt-1.5 line-clamp-2">Jumbo wings tossed in your choice of sauce with ranch.</p>
          </div>

          <div className="h-28 my-2 flex items-center justify-center relative cursor-pointer" onClick={() => sampleItems.wings && onOpenItemModal(sampleItems.wings)}>
            <div className="w-28 h-28 bg-amber-500/10 rounded-full blur-xl absolute opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <img 
              src="https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=400" 
              alt="Wing Basket"
              className="w-28 h-24 object-cover rounded-2xl shadow-xl filter drop-shadow-lg group-hover:scale-105 transition-transform"
            />
          </div>

          <button
            onClick={() => sampleItems.wings ? onQuickAdd(sampleItems.wings) : onExploreMenu()}
            className="w-full py-3 bg-zinc-800 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
          </button>
        </div>

        {/* BOGO PROMO BANNER (Spans 2 cols on lg) */}
        <div className="lg:col-span-2 bg-gradient-to-r from-red-600 via-red-700 to-rose-700 rounded-[2.5rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl shadow-red-950/50 border border-red-500/30">
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-2 text-center sm:text-left">
            <span className="px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
              🔥 SPECIAL PROMO OFFER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-none">
              BOGO FRIDAY!
            </h2>
            <p className="text-red-100 font-medium text-xs sm:text-sm max-w-sm">
              Buy 1 Family Bucket, get a 6-Pcs Bucket 15% off! Use code below at checkout.
            </p>
            <div className="flex items-center gap-2 justify-center sm:justify-start pt-1">
              <span className="px-3.5 py-1.5 bg-black/40 border border-white/20 rounded-lg text-xs font-mono font-bold text-amber-300 tracking-wider">
                CODE: CRISPY24
              </span>
              <button
                onClick={handleCopyCode}
                className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white text-xs font-bold transition-colors flex items-center gap-1"
                title="Copy promo code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center sm:items-end">
            <span className="text-5xl filter drop-shadow-md animate-bounce">🍗</span>
            <button
              onClick={onOpenDeals}
              className="mt-3 bg-white hover:bg-zinc-100 text-red-600 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
            >
              Claim Deal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* POPULAR CATEGORIES QUICK BADGES */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-5 flex flex-col justify-between text-center">
          <h4 className="text-xs font-extrabold tracking-widest text-zinc-400 uppercase">Popular Categories</h4>
          
          <div className="grid grid-cols-2 gap-2 text-[11px] uppercase font-bold text-zinc-300 my-2">
            <button onClick={onExploreMenu} className="p-2.5 bg-zinc-950/80 rounded-xl border border-zinc-800 hover:border-red-600/60 hover:text-red-400 transition-colors flex items-center justify-center gap-1">
              🍔 Burgers
            </button>
            <button onClick={onExploreMenu} className="p-2.5 bg-zinc-950/80 rounded-xl border border-zinc-800 hover:border-red-600/60 hover:text-red-400 transition-colors flex items-center justify-center gap-1">
              🍗 Chicken
            </button>
            <button onClick={onExploreMenu} className="p-2.5 bg-zinc-950/80 rounded-xl border border-zinc-800 hover:border-red-600/60 hover:text-red-400 transition-colors flex items-center justify-center gap-1">
              🍟 Sides
            </button>
            <button onClick={onExploreMenu} className="p-2.5 bg-zinc-950/80 rounded-xl border border-zinc-800 hover:border-red-600/60 hover:text-red-400 transition-colors flex items-center justify-center gap-1">
              🥤 Drinks
            </button>
          </div>

          <span className="text-[10px] text-zinc-500 font-semibold">Click to filter menu instantly</span>
        </div>

        {/* LIVE CUSTOMER REVIEWS CARD */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">4.9 / 5.0</span>
          </div>

          <p className="text-xs text-zinc-300 italic my-2 leading-snug">
            &quot;Best chicken in the city. The crunch is real and the zinger sauce is divine!&quot;
          </p>

          <div className="flex items-center gap-2.5 pt-1">
            <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center text-xs font-black text-red-400">
              JD
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-200">James D.</p>
              <p className="text-[9px] text-zinc-400">Verified Foodie</p>
            </div>
          </div>
        </div>

        {/* LIVE DELIVERY STATS CARD */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-zinc-400">
            <span>Fast Delivery</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Live
            </span>
          </div>

          <div className="my-2">
            <p className="text-3xl font-black text-amber-400 flex items-baseline gap-1">
              14m <span className="text-xs text-zinc-400 font-semibold">avg</span>
            </p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Kitchen prep to door step</p>
          </div>

          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-amber-400 h-full w-4/5 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* LOCATION & ADDRESS CARD */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-5 flex flex-col justify-between items-center text-center">
          <div className="w-10 h-10 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center text-red-500 mb-1">
            <MapPin className="w-5 h-5" />
          </div>

          <div>
            <p className="text-xs font-bold text-zinc-200 uppercase tracking-wide">122 Main Street</p>
            <p className="text-[10px] text-zinc-400">Downtown, NY • Open till 2 AM</p>
          </div>

          <a 
            href="#contact" 
            className="text-[10px] font-black text-red-500 hover:text-red-400 uppercase tracking-widest hover:underline pt-1"
          >
            Get Directions →
          </a>
        </div>

      </div>
    </section>
  );
};
