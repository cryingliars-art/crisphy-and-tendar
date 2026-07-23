import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, CreditCard, DollarSign, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { CartItem, OrderDetails } from '../types/food';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discount: number;
  deliveryType: 'delivery' | 'pickup';
  onOrderPlaced: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discount,
  deliveryType,
  onOrderPlaced,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('122 Main Street, Apt 4B');
  const [city, setCity] = useState('New York, NY 10001');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cash'>('card');
  
  // Card details
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('441');

  if (!isOpen) return null;

  const deliveryFee = deliveryType === 'pickup' ? 0 : subtotal > 25 ? 0 : 2.99;
  const tax = subtotal * 0.08875;
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newOrder: OrderDetails = {
      id: 'CT-' + Math.floor(100000 + Math.random() * 900000),
      items: cartItems,
      subtotal,
      discount,
      deliveryFee,
      tax,
      total,
      deliveryType,
      customerInfo: {
        fullName,
        phone,
        email,
        address,
        city,
        notes,
      },
      paymentMethod,
      status: 'received',
      estimatedMinutes: 14,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onOrderPlaced(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 rounded-full border border-zinc-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-xl font-black text-white italic">CHECKOUT & PAYMENT</h2>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                {deliveryType === 'delivery' ? '⚡ 14-Min Hot Delivery' : '🛍️ Store Pickup'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Customer Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              1. Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Phone Number (For SMS Updates) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-400 block mb-1">Email Address (Optional receipt)</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Delivery Address */}
          {deliveryType === 'delivery' && (
            <div className="space-y-3 pt-2 border-t border-zinc-800">
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                2. Delivery Destination
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    placeholder="122 Main Street, Apt 4B"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-400 block mb-1">City / Zip</label>
                  <input
                    type="text"
                    required
                    placeholder="New York, NY 10001"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-zinc-400 block mb-1">Delivery Gate Code / Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Ring Apt 4B, leave at doorstep..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              3. Payment Method
            </h3>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-red-600/20 border-red-500 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-red-400" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-amber-500/20 border-amber-400 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <span className="text-sm">🍎 Pay</span>
                <span>Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all ${
                  paymentMethod === 'cash'
                    ? 'bg-emerald-600/20 border-emerald-500 text-white'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Cash</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-zinc-500 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 block mb-1">Expiry</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 block mb-1">CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full p-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Final Order Total & Security Badge */}
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> 256-Bit SSL Encrypted Checkout
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 uppercase font-bold block">Total Due</span>
              <span className="text-xl font-black text-amber-400">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-xl shadow-red-950/60 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Place Order (${total.toFixed(2)})
          </button>
        </form>

      </div>
    </div>
  );
};
