# Nxt Trendz - Complete Setup Guide

## Overview

This project now includes a full-stack ecommerce application with:
- **Frontend**: React application
- **Backend**: Node.js/Express server
- **Database**: MongoDB

## Prerequisites

1. **Node.js** (v12 or higher)
2. **MongoDB** (Local installation or MongoDB Atlas account)
3. **npm** or **yarn**

## Setup Steps

### 1. Install MongoDB

#### Option A: Local MongoDB
- Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service

#### Option B: MongoDB Atlas (Cloud)
- Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get connection string

### 2. Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
# Create .env file in server directory
PORT=4000
MONGODB_URI=mongodb://localhost:27017/nxt-trendz
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=30d
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nxt-trendz
```

4. Seed the database:
```bash
node seed.js
```

5. Start the backend server:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Backend will run on `http://localhost:4000`

### 3. Frontend Setup

1. Open a new terminal and navigate to project root:
```bash
cd ENHANCEMENT-OF-NXT-TRENDZ---PAYMENT-CCBP
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Create `.env` file in root directory (optional):
```env
REACT_APP_API_URL=http://localhost:4000/api
```

4. Start the frontend:
```bash
npm start
```

Frontend will run on `http://localhost:3000` (or 3001 if 3000 is busy)

## Running Both Servers

You need to run both backend and frontend servers:

1. **Terminal 1** - Backend:
```bash
cd server
npm start
```

2. **Terminal 2** - Frontend:
```bash
npm start
```

## Testing the Application

1. Open `http://localhost:3000` in your browser
2. Sign up for a new account
3. Browse products
4. Add items to cart
5. Complete checkout

## Database Models

All data is stored in MongoDB:

- **Users**: Authentication and user profiles
- **Products**: Product catalog
- **Carts**: User shopping carts
- **Orders**: Order history

## API Configuration

The frontend is configured to use the local backend API. The API base URL can be changed in:
- `src/config/api.js`

Or via environment variable:
- `REACT_APP_API_URL`

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (if using local)
- Check `MONGODB_URI` in `.env` file
- Verify network access for MongoDB Atlas

### Port Already in Use
- Backend: Change `PORT` in `server/.env`
- Frontend: Use `PORT=3001 npm start`

### CORS Issues
- Backend CORS is configured to allow all origins
- For production, update CORS settings in `server/server.js`

## Production Deployment

For production:
1. Set strong `JWT_SECRET` in `.env`
2. Use MongoDB Atlas or secured MongoDB instance
3. Update CORS settings for your domain
4. Set `REACT_APP_API_URL` to production API URL
5. Build frontend: `npm run build`


