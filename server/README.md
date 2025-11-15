# Nxt Trendz Backend Server

Backend server with MongoDB database for Nxt Trendz ecommerce application.

## Features

- User authentication (Login/Register)
- Product management
- Shopping cart
- Order management
- MongoDB database storage

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- MongoDB (Local installation or MongoDB Atlas)

### Installation

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in server directory:
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/nxt-trendz
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=30d
```

4. Make sure MongoDB is running:
- For local MongoDB: Start MongoDB service
- For MongoDB Atlas: Update `MONGODB_URI` in `.env` file

5. Seed the database with sample products:
```bash
node seed.js
```

6. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

Server will run on `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

## Database Models

- **User**: Stores user account information
- **Product**: Stores product details
- **Cart**: Stores shopping cart items per user
- **Order**: Stores order history

## Environment Variables

- `PORT`: Server port (default: 4000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRE`: JWT token expiration (default: 30d)


