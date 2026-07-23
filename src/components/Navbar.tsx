import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Flame, PhoneCall, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onSearchClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'deals', label: 'Deals' },
    { id: 'why-us', label: 'About' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 py-3 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            CT
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase leading-none">
              <span className="text-red-600">Crispy</span>{' '}
              <span className="text-amber-400">&</span>{' '}
              <span className="text-white">Tender</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold hidden sm:inline-block">
              Pressure Fried • Fresh Daily
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 px-6 py-2 bg-zinc-900/60 border border-zinc-800/80 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-400">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`transition-colors hover:text-red-500 py-1 ${
                activeSection === link.id ? 'text-white border-b-2 border-red-600' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search */}
          <button
            onClick={onSearchClick}
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-full border border-zinc-800 transition-colors"
            title="Search Menu"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Hotline Call */}
          <a
            href="tel:18005552747"
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full text-xs font-semibold text-zinc-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-bold tracking-tight">1-800-CRISPY</span>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={onOpenCart}
            className="relative px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-extrabold text-xs tracking-wider uppercase rounded-full shadow-lg shadow-red-600/25 flex items-center gap-2 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Order Now</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-amber-400 text-zinc-950 text-[11px] font-black flex items-center justify-center rounded-full shadow-md ml-0.5 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 bg-zinc-900 border border-zinc-800 text-white rounded-full focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-zinc-800/80 px-2 pb-4 space-y-2 bg-zinc-950/95 backdrop-blur-2xl rounded-2xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-3 px-4 rounded-xl text-left text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeSection === link.id
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-zinc-400 px-2">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Flame className="w-4 h-4" /> Fresh pressure fried 24/7
            </span>
            <a href="tel:18005552747" className="text-red-500 font-extrabold underline">
              Call Hotline
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
