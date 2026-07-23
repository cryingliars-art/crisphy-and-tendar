import { MenuItem, Deal, CustomerReview, GalleryItem } from '../types/food';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: '3-Pcs Golden Crispy Bucket',
    category: 'Fried Chicken',
    price: 11.99,
    originalPrice: 13.99,
    rating: 4.9,
    reviewsCount: 342,
    description: '3 pieces of our signature 24-hour marinated chicken pressure-fried in secret spice blend for maximum crunch and juiciness.',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800',
    calories: 780,
    isSpicy: false,
    isPopular: true,
    isBestseller: true,
    prepTime: '12-15 mins',
    spicinessLevels: ['Original Crisp', 'Mild Spice', 'Fiery Hot', 'Xtra Reaper'],
    customizations: [
      { id: 'dip-garlic', name: 'Signature Garlic Toum Dip', price: 1.25 },
      { id: 'dip-spicy-mayo', name: 'Zinger Spicy Mayo Dip', price: 1.25 },
      { id: 'extra-biscuit', name: 'Honey Butter Biscuit', price: 1.99 },
      { id: 'extra-slaw', name: 'Creamy Coleslaw (Small)', price: 2.50 },
    ]
  },
  {
    id: 'item-2',
    name: 'Zinger Deluxe Burger',
    category: 'Burgers',
    price: 8.99,
    originalPrice: 10.49,
    rating: 4.8,
    reviewsCount: 289,
    description: 'Extra crispy spicy chicken fillet, house-made zinger mayo, crisp iceberg lettuce, cheddar cheese on a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    calories: 650,
    isSpicy: true,
    isPopular: true,
    isBestseller: true,
    prepTime: '10-12 mins',
    spicinessLevels: ['Mild Spicy', 'Hot Zinger', 'Inferno Zinger'],
    customizations: [
      { id: 'double-fillet', name: 'Double Chicken Fillet', price: 3.50 },
      { id: 'extra-cheese', name: 'Extra Cheddar Slice', price: 0.99 },
      { id: 'add-bacon', name: 'Crispy Beef Bacon', price: 1.75 },
    ]
  },
  {
    id: 'item-3',
    name: '12-Pcs Crispy Wing Basket',
    category: 'Nuggets & Wings',
    price: 12.50,
    originalPrice: 14.99,
    rating: 4.9,
    reviewsCount: 195,
    description: '12 plump jumbo wings tossed in your choice of sauce or dry rub, served with celery and house ranch dip.',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800',
    calories: 890,
    isSpicy: true,
    isPopular: true,
    prepTime: '12 mins',
    spicinessLevels: ['Honey BBQ', 'Spicy Buffalo', 'Garlic Parmesan', 'Mango Habanero'],
    customizations: [
      { id: 'blue-cheese', name: 'Extra Blue Cheese Dip', price: 1.25 },
      { id: 'ranch-dip', name: 'Extra House Ranch', price: 1.25 },
    ]
  },
  {
    id: 'item-4',
    name: 'Honey Garlic Chicken Wrap',
    category: 'Wraps',
    price: 7.99,
    rating: 4.7,
    reviewsCount: 142,
    description: 'Golden crispy chicken tenders drizzled in honey garlic glaze with shredded lettuce, tomatoes, and cheddar inside a warm tortilla.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800',
    calories: 540,
    isSpicy: false,
    isPopular: false,
    prepTime: '8-10 mins',
    spicinessLevels: ['Sweet Honey', 'Spicy Honey Glaze'],
    customizations: [
      { id: 'extra-sauce', name: 'Extra Honey Garlic Sauce', price: 0.99 },
      { id: 'jalapeno', name: 'Add Sliced Jalapeños', price: 0.75 },
    ]
  },
  {
    id: 'item-5',
    name: 'Spicy Chicken Supreme Pizza',
    category: 'Pizza',
    price: 14.99,
    originalPrice: 17.99,
    rating: 4.8,
    reviewsCount: 178,
    description: 'Hand-tossed crust loaded with spicy chicken chunks, caramelized red onions, bell peppers, jalapeños, and melted mozzarella.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    calories: 1120,
    isSpicy: true,
    isPopular: true,
    prepTime: '15-18 mins',
    customizations: [
      { id: 'stuffed-crust', name: 'Cheese Stuffed Crust', price: 2.99 },
      { id: 'extra-chicken', name: 'Double Chicken Topping', price: 2.50 },
    ]
  },
  {
    id: 'item-6',
    name: 'Loaded Cheese & Bacon Fries',
    category: 'Fries & Sides',
    price: 5.99,
    rating: 4.9,
    reviewsCount: 310,
    description: 'Crispy waffle-cut fries smothered in hot liquid cheddar cheese, crispy bacon bits, chopped chives, and spicy ranch drizzle.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    calories: 580,
    isSpicy: false,
    isPopular: true,
    isBestseller: true,
    prepTime: '6-8 mins',
    customizations: [
      { id: 'extra-cheese-sauce', name: 'Extra Liquid Cheddar', price: 1.50 },
      { id: 'jalapenos-side', name: 'Pickled Jalapeño Topping', price: 0.99 },
    ]
  },
  {
    id: 'item-7',
    name: 'Charcoal Grilled Chicken Shawarma',
    category: 'Shawarma',
    price: 8.99,
    rating: 4.8,
    reviewsCount: 220,
    description: 'Authentic marinated chicken shaved fresh from the vertical spit, wrapped in hot pita bread with garlic toum, wild pickles, and crispy fries.',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=800',
    calories: 620,
    isSpicy: false,
    isPopular: true,
    prepTime: '8-10 mins',
    spicinessLevels: ['Classic Garlic', 'Spicy Garlic Toum'],
    customizations: [
      { id: 'extra-toum', name: 'Extra Garlic Toum Spread', price: 1.00 },
      { id: 'extra-meat', name: '50% Extra Shawarma Meat', price: 2.99 },
    ]
  },
  {
    id: 'item-8',
    name: '10-Pcs Golden Chicken Nuggets',
    category: 'Nuggets & Wings',
    price: 7.49,
    rating: 4.7,
    reviewsCount: 164,
    description: '100% white breast chicken bites coated in golden crunchy breadcrumbs. Includes 2 dip sauces of your choice.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=800',
    calories: 450,
    isSpicy: false,
    isPopular: false,
    prepTime: '6-8 mins',
    customizations: [
      { id: 'bbq-sauce', name: 'Smoky BBQ Sauce', price: 0.00 },
      { id: 'sweet-sour', name: 'Sweet & Sour Dip', price: 0.00 },
      { id: 'honey-mustard', name: 'Honey Mustard Dip', price: 0.00 },
    ]
  },
  {
    id: 'item-9',
    name: 'Thick Salted Caramel Milkshake',
    category: 'Drinks',
    price: 5.49,
    rating: 4.9,
    reviewsCount: 145,
    description: 'Hand-spun ice cream shake mixed with real sea salted caramel, topped with whipped cream and butterscotch drizzle.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800',
    calories: 520,
    isSpicy: false,
    isPopular: true,
    prepTime: '4 mins',
    customizations: [
      { id: 'extra-whipped', name: 'Extra Whipped Cream', price: 0.50 },
      { id: 'cherry-on-top', name: 'Maraschino Cherry', price: 0.30 },
    ]
  },
  {
    id: 'item-10',
    name: 'Molten Chocolate Lava Cake',
    category: 'Desserts',
    price: 5.99,
    rating: 4.9,
    reviewsCount: 201,
    description: 'Warm, rich dark chocolate cake with a gushing gooey chocolate center. Served warm with a scoop of vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    calories: 480,
    isSpicy: false,
    isPopular: true,
    isBestseller: true,
    prepTime: '5 mins',
    customizations: [
      { id: 'extra-vanilla', name: 'Extra Scoop Vanilla Ice Cream', price: 1.50 },
    ]
  },
  {
    id: 'item-11',
    name: 'Seasoned Golden Cajun Fries',
    category: 'Fries & Sides',
    price: 3.99,
    rating: 4.6,
    reviewsCount: 240,
    description: 'Double-fried skin-on potato fries tossed in our signature house Cajun pepper and garlic seasoning blend.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=800',
    calories: 380,
    isSpicy: true,
    isPopular: false,
    prepTime: '5 mins',
  },
  {
    id: 'item-12',
    name: 'Iced Golden Citrus Soda',
    category: 'Drinks',
    price: 2.99,
    rating: 4.8,
    reviewsCount: 98,
    description: 'Sparkling refreshing citrus cooler infused with fresh mint leaves and key lime slices.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    calories: 120,
    isSpicy: false,
    isPopular: false,
    prepTime: '2 mins',
  }
];

export const DEALS: Deal[] = [
  {
    id: 'deal-bogo',
    title: 'BOGO FRIDAY BUCKET',
    tag: 'Limited Time Offer',
    discountCode: 'CRISPY24',
    description: 'Buy 1 6-Pcs Family Bucket & get a 6-Pcs Bucket half price! Use coupon CRISPY24 at checkout.',
    discountPercentage: 15,
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=600',
    badge: '15% OFF COUPON',
    bgGradient: 'from-red-600 to-rose-700'
  },
  {
    id: 'deal-combo',
    title: 'ZINGER COMBO SPREAD',
    tag: 'Best Value',
    discountCode: 'ZINGER20',
    description: 'Get 2 Zinger Deluxe Burgers, 1 Loaded Cheese Fries, and 2 Drinks for just $21.99.',
    discountAmount: 5.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
    badge: 'SAVE $5.00',
    bgGradient: 'from-amber-600 to-amber-700'
  },
  {
    id: 'deal-wings',
    title: '24-PCS WING FRENZY',
    tag: 'Party Favorite',
    discountCode: 'WING24',
    description: '24 Wing Basket with 4 Sauce Flavour Dips + Large Cajun Fries for $22.99.',
    discountPercentage: 20,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=600',
    badge: '20% OFF',
    bgGradient: 'from-zinc-800 to-zinc-950'
  }
];

export const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'James D.',
    rating: 5,
    date: 'Yesterday',
    comment: 'Best chicken in the city! The crunch is real and the zinger garlic toum sauce is divine. Delivered in under 15 minutes piping hot!',
    orderItemName: '3-Pcs Golden Crispy Bucket',
    verifiedBuyer: true,
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    name: 'Samantha K.',
    rating: 5,
    date: '3 days ago',
    comment: 'The Zinger Deluxe burger is a masterpiece. Double fillet was super crispy outside yet remarkably juicy inside. Will order again!',
    orderItemName: 'Zinger Deluxe Burger',
    verifiedBuyer: true,
    helpfulCount: 28
  },
  {
    id: 'rev-3',
    name: 'Marcus Vance',
    rating: 5,
    date: '1 week ago',
    comment: 'Loaded Bacon Fries were swimming in hot cheese! The online tracker updated in real-time, very smooth checkout experience.',
    orderItemName: 'Loaded Cheese & Bacon Fries',
    verifiedBuyer: true,
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    name: 'Elena Rostova',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Impressed by the packaging and hygienic seal. The wings with Mango Habanero were flaming spicy and perfectly crisp.',
    orderItemName: '12-Pcs Crispy Wing Basket',
    verifiedBuyer: true,
    helpfulCount: 35
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Signature 24-Hr Marinated Fried Chicken',
    category: 'Fried Chicken',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80&w=800',
    likes: 342
  },
  {
    id: 'gal-2',
    title: 'Double Zinger Stack with Molten Cheddar',
    category: 'Burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    likes: 289
  },
  {
    id: 'gal-3',
    title: 'Jumbo Wings in Honey Garlic Glaze',
    category: 'Wings',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800',
    likes: 198
  },
  {
    id: 'gal-4',
    title: 'Hot Cheese Loaded Waffle Fries',
    category: 'Sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800',
    likes: 412
  },
  {
    id: 'gal-5',
    title: 'Charcoal Shaved Chicken Shawarma Wrap',
    category: 'Shawarma',
    image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=800',
    likes: 265
  },
  {
    id: 'gal-6',
    title: 'Hand-tossed Spicy Supreme Pizza',
    category: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    likes: 310
  }
];

export const WHY_CHOOSE_US = [
  {
    icon: '🍗',
    title: '24-Hour Marinade',
    description: 'We soak our fresh farm chicken for a full day in secret spices for depth of flavour.'
  },
  {
    icon: '🔥',
    title: 'Pressure Fried Crunch',
    description: 'Engineered high-pressure frying locks in moisture while building an ultra-crispy crust.'
  },
  {
    icon: '⚡',
    title: '14-Min Hot Delivery',
    description: 'Guaranteed thermal insulated bag delivery so your order arrives steaming fresh.'
  },
  {
    icon: '✨',
    title: '100% Hygienic Kitchen',
    description: 'Grade-A certified open kitchen with strict sanitation protocols.'
  },
  {
    icon: '💰',
    title: 'Affordable Pricing',
    description: 'Unmatched portion sizes and daily promotional combo deals.'
  }
];
