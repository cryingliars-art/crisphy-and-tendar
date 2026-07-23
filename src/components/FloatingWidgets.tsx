import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, X, Send, Phone } from 'lucide-react';

interface FloatingWidgetsProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
}

export const FloatingWidgets: React.FC<FloatingWidgetsProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
}) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState('');
  const [sentMsg, setSentMsg] = useState(false);

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMsg.trim()) return;
    setSentMsg(true);
    setTimeout(() => {
      setSentMsg(false);
      setChatMsg('');
      setChatOpen(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating WhatsApp Chat Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="w-13 h-13 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-transform active:scale-95 group"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-white group-hover:rotate-12 transition-transform" />
          </button>
        ) : (
          <div className="w-80 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in text-white">
            <div className="p-4 bg-emerald-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-xs">
                  CT
                </div>
                <div>
                  <h4 className="text-xs font-black">Crispy Support</h4>
                  <p className="text-[9px] text-emerald-100 font-semibold">Typically replies in 1 min</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white hover:opacity-80">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-zinc-950 space-y-3 max-h-60 overflow-y-auto text-xs">
              <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 max-w-[85%] space-y-1">
                <p className="font-bold text-emerald-400 text-[10px]">Crispy Assistant</p>
                <p className="text-zinc-300">
                  Hey there! 👋 Craving crispy fried chicken or need help with your order?
                </p>
              </div>

              {sentMsg && (
                <div className="p-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-2xl ml-auto max-w-[85%] font-medium text-[11px]">
                  Opening WhatsApp chat...
                </div>
              )}
            </div>

            <form onSubmit={handleSendWhatsapp} className="p-3 bg-zinc-900 border-t border-zinc-800 flex gap-2">
              <input
                type="text"
                placeholder="Ask about deals, ingredients..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                className="flex-1 p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl font-bold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bottom Order Now Bar */}
      {cartCount > 0 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 shadow-2xl">
          <button
            onClick={onOpenCart}
            className="w-full py-3 px-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-between active:scale-95 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 bg-amber-400 text-zinc-950 font-black text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
              <span>View Cart & Order</span>
            </div>
            <span className="text-amber-300 font-black text-sm">${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </>
  );
};
