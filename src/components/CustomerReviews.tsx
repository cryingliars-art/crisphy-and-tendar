import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquarePlus, X, Check } from 'lucide-react';
import { CustomerReview } from '../types/food';

interface CustomerReviewsProps {
  reviews: CustomerReview[];
  onAddReview: (review: Omit<CustomerReview, 'id' | 'date' | 'helpfulCount'>) => void;
}

export const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, onAddReview }) => {
  const [showModal, setShowModal] = useState(false);
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});
  
  // Review form state
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [orderItemName, setOrderItemName] = useState('3-Pcs Golden Crispy Bucket');

  const handleHelpfulClick = (id: string, initialCount: number) => {
    const current = helpfulMap[id] ?? initialCount;
    setHelpfulMap({ ...helpfulMap, [id]: current + 1 });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({
      name: name.trim(),
      rating,
      comment: comment.trim(),
      orderItemName,
      verifiedBuyer: true,
    });

    setName('');
    setComment('');
    setShowModal(false);
  };

  return (
    <section id="reviews" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Real Customer Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-black italic tracking-tight text-white mt-2">
            CUSTOMER <span className="text-amber-400">REVIEWS</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-1">
            Over 10,000+ 5-star reviews across New York.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 font-extrabold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <MessageSquarePlus className="w-4 h-4 text-amber-400" /> Write a Review
        </button>
      </div>

      {/* Testimonial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => {
          const currentHelpful = helpfulMap[rev.id] ?? rev.helpfulCount;
          return (
            <div
              key={rev.id}
              className="bg-zinc-900/90 border border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-zinc-500 font-semibold">{rev.date}</span>
                </div>

                <p className="text-xs text-zinc-300 italic leading-relaxed">
                  &quot;{rev.comment}&quot;
                </p>

                {rev.orderItemName && (
                  <span className="inline-block text-[10px] font-bold text-amber-400/90 bg-amber-400/10 px-2.5 py-0.5 rounded-md">
                    Ordered: {rev.orderItemName}
                  </span>
                )}
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-600/40 text-red-400 font-black text-xs flex items-center justify-center">
                    {rev.name.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">{rev.name}</p>
                    {rev.verifiedBuyer && (
                      <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified Buyer
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleHelpfulClick(rev.id, rev.helpfulCount)}
                  className="flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-amber-400 transition-colors px-2 py-1 bg-zinc-950 rounded-lg border border-zinc-800"
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{currentHelpful}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-white italic">WRITE A REVIEW</h3>
            <p className="text-zinc-400 text-xs mt-1">Share your experience with Crispy & Tender.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-extrabold uppercase text-zinc-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex M."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase text-zinc-300 block mb-1">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase text-zinc-300 block mb-1">Ordered Item</label>
                <select
                  value={orderItemName}
                  onChange={(e) => setOrderItemName(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white focus:outline-none focus:border-red-600"
                >
                  <option value="3-Pcs Golden Crispy Bucket">3-Pcs Golden Crispy Bucket</option>
                  <option value="Zinger Deluxe Burger">Zinger Deluxe Burger</option>
                  <option value="12-Pcs Crispy Wing Basket">12-Pcs Crispy Wing Basket</option>
                  <option value="Loaded Cheese & Bacon Fries">Loaded Cheese & Bacon Fries</option>
                  <option value="Charcoal Grilled Shawarma">Charcoal Grilled Shawarma</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase text-zinc-300 block mb-1">Your Review</label>
                <textarea
                  required
                  rows={3}
                  placeholder="How was the crunch, flavor, and delivery speed?"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-red-950/50 transition-all active:scale-95"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
