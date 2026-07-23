import React, { useState } from 'react';
import { MENU_ITEMS, DEALS, REVIEWS } from './data/mockData';
import { MenuItem, CartItem, CartCustomization, CustomerReview, OrderDetails, FoodCategory } from './types/food';

import { Navbar } from './components/Navbar';
import { HeroBento } from './components/HeroBento';
import { PopularCategories } from './components/PopularCategories';
import { FeaturedMenu } from './components/FeaturedMenu';
import { ItemModal } from './components/ItemModal';
import { SpecialOffers } from './components/SpecialOffers';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerReviews } from './components/CustomerReviews';
import { Gallery } from './components/Gallery';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OnlineOrderingCart } from './components/OnlineOrderingCart';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTracker } from './components/OrderTracker';
import { FloatingWidgets } from './components/FloatingWidgets';

export default function App() {
  // Navigation & Category state
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Ordering state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState('CRISPY24');
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<CustomerReview[]>(REVIEWS);

  // Category counts
  const categoryCounts = MENU_ITEMS.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity: number, customization: CartCustomization) => {
    const extrasTotal = customization.selectedExtras.reduce((acc, curr) => acc + curr.price, 0);
    const unitPrice = item.price + extrasTotal;

    const newCartItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      customization,
      itemTotalPrice: unitPrice * quantity,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    setIsCartOpen(true);
  };

  const handleQuickAdd = (item: MenuItem) => {
    handleAddToCart(item, 1, {
      selectedExtras: [],
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => {
        if (ci.id === cartItemId) {
          const unitPrice = ci.itemTotalPrice / ci.quantity;
          return {
            ...ci,
            quantity: newQty,
            itemTotalPrice: unitPrice * newQty,
          };
        }
        return ci;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddReview = (newRev: Omit<CustomerReview, 'id' | 'date' | 'helpfulCount'>) => {
    const reviewObj: CustomerReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      helpfulCount: 1,
    };
    setReviewsList([reviewObj, ...reviewsList]);
  };

  const handleOrderPlaced = (order: OrderDetails) => {
    setActiveOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
  };

  // Sample items for Hero section triggers
  const sampleZinger = MENU_ITEMS.find((i) => i.id === 'item-2');
  const sampleWings = MENU_ITEMS.find((i) => i.id === 'item-3');

  // Cart summary totals for sticky widget
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.itemTotalPrice, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Sticky Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, ci) => acc + ci.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onSearchClick={() => {
          handleNavigate('menu');
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Bento Grid Hero */}
        <HeroBento
          onQuickAdd={handleQuickAdd}
          onExploreMenu={() => handleNavigate('menu')}
          onOpenDeals={() => handleNavigate('deals')}
          onOpenItemModal={(item) => setSelectedItemForModal(item)}
          sampleItems={{ zinger: sampleZinger, wings: sampleWings }}
        />

        {/* Popular Categories Filter Bar */}
        <PopularCategories
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleNavigate('menu');
          }}
          categoryCounts={categoryCounts}
        />

        {/* Featured Menu Grid */}
        <FeaturedMenu
          items={MENU_ITEMS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenItemModal={(item) => setSelectedItemForModal(item)}
          onQuickAdd={handleQuickAdd}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Special Offers & Deals */}
        <SpecialOffers
          deals={DEALS}
          onApplyCoupon={(code) => {
            setAppliedCoupon(code);
            setIsCartOpen(true);
          }}
          onExploreMenu={() => handleNavigate('menu')}
        />

        {/* Why Choose Us Features */}
        <WhyChooseUs />

        {/* Customer Testimonials & Reviews */}
        <CustomerReviews
          reviews={reviewsList}
          onAddReview={handleAddReview}
        />

        {/* Food Photo Gallery */}
        <Gallery />

        {/* Contact Form & Google Map */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Drawers */}
      <ItemModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
      />

      <OnlineOrderingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={setAppliedCoupon}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        deliveryType={deliveryType}
        onToggleDeliveryType={setDeliveryType}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={cartSubtotal}
        discount={
          appliedCoupon === 'CRISPY24'
            ? cartSubtotal * 0.15
            : appliedCoupon === 'ZINGER20'
            ? 5.0
            : 0
        }
        deliveryType={deliveryType}
        onOrderPlaced={handleOrderPlaced}
      />

      {activeOrder && (
        <OrderTracker
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}

      {/* Floating WhatsApp and Sticky Cart */}
      <FloatingWidgets
        cartCount={cartItems.reduce((acc, ci) => acc + ci.quantity, 0)}
        cartTotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
