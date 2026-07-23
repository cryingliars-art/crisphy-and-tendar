import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Clock, Flame, Bike, Home, PhoneCall, MessageSquare, AlertCircle } from 'lucide-react';
import { OrderDetails, OrderStatus } from '../types/food';

interface OrderTrackerProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, onClose }) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('received');
  const [minutesRemaining, setMinutesRemaining] = useState(14);

  useEffect(() => {
    if (!order) return;

    // Simulate real-time status updates every few seconds
    const timer1 = setTimeout(() => {
      setCurrentStatus('preparing');
      setMinutesRemaining(11);
    }, 4000);

    const timer2 = setTimeout(() => {
      setCurrentStatus('on_the_way');
      setMinutesRemaining(6);
    }, 10000);

    const timer3 = setTimeout(() => {
      setCurrentStatus('delivered');
      setMinutesRemaining(0);
    }, 18000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [order]);

  if (!order) return null;

  const steps: { key: OrderStatus; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      key: 'received',
      label: 'Order Confirmed',
      icon: <CheckCircle className="w-5 h-5" />,
      desc: 'Sent to kitchen display',
    },
    {
      key: 'preparing',
      label: 'Kitchen Frying',
      icon: <Flame className="w-5 h-5 text-amber-400" />,
      desc: 'Pressure frying 24-hr chicken',
    },
    {
      key: 'on_the_way',
      label: 'Out for Delivery',
      icon: <Bike className="w-5 h-5 text-red-500" />,
      desc: 'Marcus is riding thermal bag',
    },
    {
      key: 'delivered',
      label: 'Delivered Hot',
      icon: <Home className="w-5 h-5 text-emerald-400" />,
      desc: 'Enjoy your crispy feast!',
    },
  ];

  const statusIndexMap: Record<OrderStatus, number> = {
    received: 0,
    preparing: 1,
    on_the_way: 2,
    delivered: 3,
  };

  const currentIndex = statusIndexMap[currentStatus];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Live Order Status
            </span>
            <h2 className="text-2xl font-black text-white italic mt-1">ORDER {order.id}</h2>
            <p className="text-xs text-zinc-400">Placed at {order.createdAt}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-full border border-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Timer Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 p-6 rounded-3xl text-white flex items-center justify-between shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-300">
              {currentStatus === 'delivered' ? 'Order Complete' : 'Estimated Arrival'}
            </span>
            <h3 className="text-4xl font-black">
              {currentStatus === 'delivered' ? 'ARRIVED!' : `${minutesRemaining} MINS`}
            </h3>
            <p className="text-xs text-red-100 font-medium">
              {currentStatus === 'delivered'
                ? 'Delivered to your doorstep'
                : 'Directly from Downtown Kitchen'}
            </p>
          </div>

          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-4xl shadow-inner animate-pulse">
            {currentStatus === 'received' && '📝'}
            {currentStatus === 'preparing' && '🍗'}
            {currentStatus === 'on_the_way' && '🛵'}
            {currentStatus === 'delivered' && '🎉'}
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="space-y-4 py-2">
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={step.key} className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center border font-bold transition-all ${
                    isCompleted
                      ? 'bg-red-600 border-red-500 text-white shadow-lg'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                  }`}
                >
                  {step.icon}
                </div>

                <div className="flex-1 pb-2 border-b border-zinc-800/60">
                  <div className="flex justify-between items-center">
                    <h4
                      className={`text-sm font-extrabold ${
                        isCompleted ? 'text-white' : 'text-zinc-500'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Driver Card */}
        {currentStatus === 'on_the_way' && (
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/40 text-red-400 font-black text-sm flex items-center justify-center">
                MV
              </div>
              <div>
                <p className="text-xs font-bold text-white">Marcus Vance</p>
                <p className="text-[10px] text-zinc-400">Delivery Partner • Red Scooter</p>
              </div>
            </div>

            <a
              href="tel:18005552747"
              className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-zinc-800 rounded-xl flex items-center gap-1.5 text-xs font-bold"
            >
              <PhoneCall className="w-4 h-4" /> Call Driver
            </a>
          </div>
        )}

        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-colors"
        >
          Close Tracker Window
        </button>

      </div>
    </div>
  );
};
