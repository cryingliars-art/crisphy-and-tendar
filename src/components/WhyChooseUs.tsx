import React from 'react';
import { WHY_CHOOSE_US } from '../data/mockData';
import { ShieldCheck, Flame, Zap, Award, Sparkles, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
          The Crispy & Tender Difference
        </span>
        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white mt-2">
          WHY CHOOSE <span className="text-red-600">US?</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
          We don&apos;t compromise on quality. Every piece of chicken is ethically sourced, fresh never frozen, and fried to exact thermal precision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WHY_CHOOSE_US.map((feature, index) => (
          <div
            key={index}
            className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col justify-between group hover:border-red-600/50 hover:shadow-2xl hover:shadow-red-950/20 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl group-hover:bg-red-600/15 transition-colors"></div>

            <div className="space-y-4 relative z-10">
              <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-zinc-400 text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>

            <div className="pt-6 relative z-10 flex items-center gap-1 text-[11px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">
              <span>Guaranteed Quality</span> • <span>Grade A+</span>
            </div>
          </div>
        ))}

        {/* Extra Card for Kitchen Promise */}
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-red-600/30 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden text-white shadow-xl">
          <div className="space-y-3 relative z-10">
            <span className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-[10px] font-black uppercase tracking-widest">
              100% Fresh Promise
            </span>
            <h3 className="text-2xl font-black italic">
              NEVER FROZEN.<br/><span className="text-amber-400">ALWAYS CRISPY.</span>
            </h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Our master chefs hand-bread every order right before it enters the pressure fryer. Enjoy authentic, juicy perfection every single bite.
            </p>
          </div>
          <div className="pt-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sanitized & Sealed Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
