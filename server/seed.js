const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Sample products data with working image URLs
const sampleProducts = [
  {
    id: '1',
    title: 'Fjallraven - Foldsack No. 1 Backpack',
    brand: 'Fjallraven',
    price: 109.95,
    imageUrl:
      'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: 3.9,
    category: 'MEN',
    availability: 'IN_STOCK',
    description: 'Your perfect pack for everyday use and walks in the forest.',
  },
  {
    id: '2',
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    brand: 'DressBerry',
    price: 22.3,
    imageUrl:
      'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: 4.1,
    category: 'MEN',
    availability: 'IN_STOCK',
    description: 'Slim-fitting style, contrast raglan long sleeve.',
  },
  {
    id: '3',
    title: 'Mens Cotton Jacket',
    brand: 'Topwear',
    price: 55.99,
    imageUrl:
      'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: 4.7,
    category: 'MEN',
    availability: 'IN_STOCK',
    description: 'Great outerwear jackets for Spring/Autumn/Winter.',
  },
  {
    id: '4',
    title: 'Mens Casual Slim Fit',
    brand: 'Roadster',
    price: 15.99,
    imageUrl:
      'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: 2.1,
    category: 'MEN',
    availability: 'OUT_OF_STOCK',
    description: 'The color could be slightly different between on the screen.',
  },
  {
    id: '5',
    title: "Women's 3-in-1 Snowboard Jacket",
    brand: 'TOMMY HILFIGER',
    price: 56.99,
    imageUrl:
      'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    rating: 4.6,
    category: 'WOMEN',
    availability: 'IN_STOCK',
    description: 'Note: The Jackets is US standard size.',
  },
  {
    id: '6',
    title: 'Women Rain Jacket',
    brand: 'DressBerry',
    price: 39.99,
    imageUrl:
      'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
    rating: 3.8,
    category: 'WOMEN',
    availability: 'IN_STOCK',
    description: 'Lightweight perfet for trip or casual wear.',
  },
  {
    id: '7',
    title: 'Chiffon Dupatta',
    brand: 'LIBAS',
    price: 1200,
    imageUrl:
      'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UX679_.jpg',
    rating: 4.0,
    category: 'WOMEN',
    availability: 'IN_STOCK',
    description: 'Attractive Pink Colour Dupatta.',
  },
  {
    id: '8',
    title: 'Classic Shoes',
    brand: 'Nike',
    price: 4599,
    imageUrl:
      'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: 4.8,
    category: 'FOOTWEAR',
    availability: 'IN_STOCK',
    description: 'Comfortable classic style shoes.',
  },
  {
    id: '9',
    title: 'Sneakers',
    brand: 'Adidas',
    price: 5999,
    imageUrl:
      'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    rating: 4.5,
    category: 'FOOTWEAR',
    availability: 'IN_STOCK',
    description: 'Perfect for running and sports activities.',
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/nxt-trendz',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );

    console.log('MongoDB Connected');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Products seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();

