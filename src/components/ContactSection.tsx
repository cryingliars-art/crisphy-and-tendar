import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-black uppercase tracking-widest text-red-500 bg-red-600/10 px-3 py-1 rounded-full border border-red-600/20">
          We&apos;re Here For You
        </span>
        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white mt-2">
          VISIT US OR <span className="text-red-600">GET IN TOUCH</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2">
          Questions regarding bulk catering, franchise opportunities, or feedback? Drop us a line.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Contact Information & Interactive Map */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex items-start gap-4">
              <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-2xl text-red-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Restaurant Location</h4>
                <p className="text-xs text-zinc-300 font-bold mt-1">122 Main Street</p>
                <p className="text-[11px] text-zinc-400">Downtown, New York, NY 10001</p>
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Direct Hotline</h4>
                <p className="text-xs text-amber-400 font-bold mt-1">+1 (800) 555-CRISPY</p>
                <p className="text-[11px] text-zinc-400">Orders & Delivery Hotline</p>
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Email Inquiry</h4>
                <p className="text-xs text-zinc-300 font-bold mt-1">orders@crispytender.com</p>
                <p className="text-[11px] text-zinc-400">Response within 1 hour</p>
              </div>
            </div>

            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Business Hours</h4>
                <p className="text-xs text-zinc-300 font-bold mt-1">Mon - Sun: 10 AM - 2 AM</p>
                <p className="text-[11px] text-zinc-400">365 Days Open</p>
              </div>
            </div>

          </div>

          {/* Interactive Simulated Google Map */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-6 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-red-500" />
                <span className="text-xs font-black uppercase text-white tracking-wider">Store Locator Map</span>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-black uppercase tracking-wider text-amber-400 hover:underline"
              >
                Open in Google Maps ↗
              </a>
            </div>

            {/* Simulated Map Visual */}
            <div className="h-48 w-full bg-zinc-950 rounded-2xl relative overflow-hidden border border-zinc-800 flex items-center justify-center">
              {/* Grid map pattern background */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Pulse Pin Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-600/50 animate-bounce">
                  <MapPin className="w-5 h-5 fill-white" />
                </div>
                <div className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-white font-extrabold text-[10px] rounded-lg mt-1 shadow-2xl">
                  Crispy & Tender • 122 Main St
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-2 mb-6">
            <h3 className="text-2xl font-black text-white italic">SEND US A MESSAGE</h3>
            <p className="text-xs text-zinc-400">We respond to catering requests and guest questions promptly.</p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl text-center space-y-3 my-auto">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-white">Message Sent Successfully!</h4>
              <p className="text-xs text-zinc-300 max-w-xs mx-auto">
                Thank you for reaching out to Crispy & Tender. Our guest relations team will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-extrabold text-zinc-300 uppercase block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-extrabold text-zinc-300 uppercase block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-zinc-300 uppercase block mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Catering Request, General Feedback"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-zinc-300 uppercase block mb-1">Your Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we serve you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950/50 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
