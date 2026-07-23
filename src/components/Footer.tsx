import React, { useState } from 'react';
import { Send, Check, Flame } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-red-600 rounded-2xl flex items-center justify-center font-black text-lg italic text-white shadow-lg shadow-red-600/30">
                CT
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white">
                <span className="text-red-600">Crispy</span> <span className="text-amber-400">&</span> Tender
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed pt-1">
              Authentic 24-hour marinated pressure-fried chicken. Secret recipe spices, golden perfection delivered hot in 14 minutes.
            </p>

            <div className="flex items-center gap-2 text-amber-400 text-[11px] font-extrabold pt-1">
              <Flame className="w-4 h-4 text-red-500" /> Open 7 Days: 10 AM - 2 AM
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              {['hero', 'menu', 'deals', 'why-us', 'gallery', 'reviews', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className="hover:text-red-500 transition-colors capitalize font-medium"
                  >
                    {id === 'why-us' ? 'About Us' : id === 'hero' ? 'Home' : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Items Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Top Menu Favorites</h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>3-Pcs Golden Crispy Bucket</li>
              <li>Zinger Deluxe Burger</li>
              <li>12-Pcs Crispy Wing Basket</li>
              <li>Loaded Cheese & Bacon Fries</li>
              <li>Charcoal Chicken Shawarma</li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white">Get Secret Deals</h4>
            <p className="text-xs text-zinc-400">
              Subscribe for exclusive secret coupon codes, VIP secret menu drops, and BOGO alerts.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4" /> You&apos;re subscribed for secret coupons!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
          <div>
            © {new Date().getFullYear()} Crispy & Tender • Authentic Pressure Fried Chicken
          </div>

          <div className="flex gap-6">
            <a href="#hero" className="hover:text-white transition-colors">Instagram</a>
            <a href="#hero" className="hover:text-white transition-colors">TikTok</a>
            <a href="#hero" className="hover:text-white transition-colors">Twitter</a>
            <a href="#hero" className="hover:text-white transition-colors">Terms & Privacy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
