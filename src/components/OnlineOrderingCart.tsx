import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Check, Flame } from 'lucide-react';
import { CartItem } from '../types/food';

interface OnlineOrderingCartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  appliedCoupon: string;
  onApplyCoupon: (code: string) => void;
  onProceedToCheckout: () => void;
  deliveryType: 'delivery' | 'pickup';
  onToggleDeliveryType: (type: 'delivery' | 'pickup') => void;
}

export const OnlineOrderingCart: React.FC<OnlineOrderingCartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onProceedToCheckout,
  deliveryType,
  onToggleDeliveryType,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);

  // Discount calculation
  let discountAmount = 0;
  if (appliedCoupon === 'CRISPY24') {
    discountAmount = subtotal * 0.15; // 15% off
  } else if (appliedCoupon === 'ZINGER20') {
    discountAmount = 5.00;
  } else if (appliedCoupon === 'WING24') {
    discountAmount = subtotal * 0.20;
  }

  const deliveryFee = deliveryType === 'pickup' ? 0 : subtotal > 25 || subtotal === 0 ? 0 : 2.99;
  const tax = subtotal * 0.08875; // NY sales tax ~8.875%
  const total = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === 'CRISPY24' || code === 'ZINGER20' || code === 'WING24') {
      onApplyCoupon(code);
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid code. Try "CRISPY24" or "ZINGER20"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col justify-between shadow-2xl animate-slide-left">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-600/10 rounded-xl text-red-500 border border-red-600/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white italic">YOUR CART</h2>
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'} Selected
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery / Pickup Toggle */}
        <div className="px-6 py-3 bg-zinc-900/50 border-b border-zinc-800/80 flex items-center gap-2">
          <button
            onClick={() => onToggleDeliveryType('delivery')}
            className={`flex-1 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
              deliveryType === 'delivery'
                ? 'bg-red-600 text-white border-red-500 shadow-md'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800'
            }`}
          >
            ⚡ Delivery (14m)
          </button>
          <button
            onClick={() => onToggleDeliveryType('pickup')}
            className={`flex-1 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
              deliveryType === 'pickup'
                ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800'
            }`}
          >
            🛍️ Pickup (Store)
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-3xl">
                🍗
              </div>
              <p className="text-zinc-300 font-extrabold text-base">Your cart is empty!</p>
              <p className="text-zinc-500 text-xs max-w-xs">
                Add some crispy fried chicken or zinger burgers to satisfy your craving.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-red-600 text-white rounded-full font-extrabold text-xs uppercase tracking-wider hover:bg-red-500 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            cartItems.map((cartItem) => (
              <div
                key={cartItem.id}
                className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl flex gap-3 relative group"
              >
                <img
                  src={cartItem.menuItem.image}
                  alt={cartItem.menuItem.name}
                  className="w-16 h-16 object-cover rounded-xl border border-zinc-800"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-xs font-extrabold text-white leading-tight">
                      {cartItem.menuItem.name}
                    </h4>
                    <span className="text-amber-400 font-black text-xs">
                      ${cartItem.itemTotalPrice.toFixed(2)}
                    </span>
                  </div>

                  {cartItem.customization?.spicinessLevel && (
                    <p className="text-[10px] text-red-400 font-semibold flex items-center gap-0.5">
                      <Flame className="w-3 h-3" /> {cartItem.customization.spicinessLevel}
                    </p>
                  )}

                  {cartItem.customization?.selectedExtras && cartItem.customization.selectedExtras.length > 0 && (
                    <p className="text-[10px] text-zinc-400 line-clamp-1">
                      + {cartItem.customization.selectedExtras.map((e) => e.name).join(', ')}
                    </p>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-extrabold text-white w-4 text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className="text-zinc-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(cartItem.id)}
                      className="text-zinc-500 hover:text-red-500 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Order Summary & Checkout Button */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-zinc-900 border-t border-zinc-800 space-y-4">
            
            {/* Coupon Box */}
            <form onSubmit={handleCouponSubmit} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. CRISPY24)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-extrabold text-xs uppercase rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>

              {appliedCoupon && (
                <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 pt-1">
                  <Check className="w-3 h-3" /> Coupon &quot;{appliedCoupon}&quot; active!
                </div>
              )}
              {couponError && <p className="text-[10px] text-red-400 font-bold">{couponError}</p>}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-400 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
              </div>
              
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Tax (8.875%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-zinc-800">
                <span>Total Amount</span>
                <span className="text-amber-400 text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
