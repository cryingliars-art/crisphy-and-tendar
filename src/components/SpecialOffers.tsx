import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, ArrowRight, Flame } from 'lucide-react';
import { Deal } from '../types/food';

interface SpecialOffersProps {
  deals: Deal[];
  onApplyCoupon: (code: string) => void;
  onExploreMenu: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({
  deals,
  onApplyCoupon,
  onExploreMenu,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleApply = (deal: Deal) => {
    onApplyCoupon(deal.discountCode);
    setCopiedId(deal.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="deals" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Exclusive Savings
          </span>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white mt-2">
            SPECIAL <span className="text-amber-400">OFFERS</span> & COMBOS
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Apply discount codes directly to your online order cart for instant savings.
          </p>
        </div>

        <button
          onClick={onExploreMenu}
          className="text-xs font-black uppercase tracking-wider text-red-500 hover:text-red-400 flex items-center gap-1 self-start sm:self-auto"
        >
          View Full Menu <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Deals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {deals.map((deal) => {
          const isCopied = copiedId === deal.id;
          return (
            <div
              key={deal.id}
              className={`bg-gradient-to-br ${deal.bgGradient} rounded-[2.5rem] p-6 text-white flex flex-col justify-between relative overflow-hidden shadow-2xl border border-white/10 group hover:scale-[1.02] transition-transform duration-300 min-h-[320px]`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

              {/* Card Header */}
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] font-extrabold uppercase tracking-widest text-amber-300 border border-white/10">
                    {deal.tag}
                  </span>
                  <span className="px-3 py-1 bg-amber-400 text-zinc-950 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                    {deal.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tight leading-tight">
                  {deal.title}
                </h3>

                <p className="text-xs text-white/80 leading-relaxed font-medium">
                  {deal.description}
                </p>
              </div>

              {/* Deal Coupon Footer */}
              <div className="relative z-10 pt-6 space-y-3">
                <div className="flex items-center justify-between bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/15">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-300 ml-1" />
                    <span className="font-mono text-xs font-extrabold text-amber-300 tracking-wider">
                      {deal.discountCode}
                    </span>
                  </div>
                  <button
                    onClick={() => handleApply(deal)}
                    className="px-4 py-1.5 bg-white text-zinc-950 hover:bg-amber-300 font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Applied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Apply Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
