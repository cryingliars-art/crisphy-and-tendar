import React, { useState } from 'react';
import { X, Flame, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, ExtraOption, CartCustomization } from '../types/food';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, customization: CartCustomization) => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [spiciness, setSpiciness] = useState<string>(
    item.spicinessLevels ? item.spicinessLevels[0] : ''
  );
  const [selectedExtras, setSelectedExtras] = useState<ExtraOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  const toggleExtra = (extra: ExtraOption) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const extrasTotal = selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
  const unitPrice = item.price + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, {
      spicinessLevel: spiciness || undefined,
      selectedExtras,
      specialInstructions: specialInstructions.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 bg-zinc-950/80 hover:bg-zinc-800 text-white rounded-full border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-zinc-950">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              {item.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">
              {item.name}
            </h2>
            <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        {/* Customization Options */}
        <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
          
          {/* Spiciness Level Selector */}
          {item.spicinessLevels && item.spicinessLevels.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-500" />
                Select Flavor / Spiciness Level:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {item.spicinessLevels.map((lvl) => {
                  const isSelected = spiciness === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpiciness(lvl)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-between ${
                        isSelected
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span>{lvl}</span>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Addons & Dips */}
          {item.customizations && item.customizations.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-zinc-300">
                Extra Dips & Side Addons:
              </label>
              <div className="space-y-2">
                {item.customizations.map((extra) => {
                  const isChecked = selectedExtras.some((e) => e.id === extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra)}
                      className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-zinc-800 border-amber-500/80 text-white'
                          : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-amber-400 border-amber-400 text-zinc-950'
                              : 'border-zinc-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-amber-400">
                        {extra.price === 0 ? 'FREE' : `+$${extra.price.toFixed(2)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-zinc-300">
              Special Kitchen Instructions:
            </label>
            <textarea
              rows={2}
              placeholder="e.g., Extra crispy, sauce on the side, no pickle..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
            />
          </div>

        </div>

        {/* Footer Quantity & Add to Cart Bar */}
        <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-2xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-black text-sm text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 text-zinc-400 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950/50 flex items-center justify-between transition-all active:scale-95"
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Add to Order
            </span>
            <span className="text-amber-300 font-black text-sm">${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
