# Quick Start Guide - What You Need to Provide

## ✅ Required Setup Steps

### 1. **MongoDB Database**

You need to provide one of the following:

**Option A: Local MongoDB**
- Download and install MongoDB Community Edition from: https://www.mongodb.com/try/download/community
- Make sure MongoDB service is running on your computer
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Recommended for beginners)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a free cluster
- Get your connection string (will look like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 2. **Backend Environment Variables**

Create a file: `server/.env` with the following:

```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/nxt-trendz
JWT_SECRET=your-secret-key-change-this
JWT_EXPIRE=30d
```

**If using MongoDB Atlas**, replace `MONGODB_URI` with:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/nxt-trendz?retryWrites=true&w=majority
```

### 3. **Install Backend Dependencies**

Run these commands:
```bash
cd server
npm install
```

### 4. **Seed the Database**

After installing dependencies, seed the database with sample products:
```bash
cd server
node seed.js
```

### 5. **Start the Backend Server**

```bash
cd server
npm start
```

The backend will run on `http://localhost:4000`

### 6. **Start the Frontend**

Open a NEW terminal window:
```bash
cd ENHANCEMENT-OF-NXT-TRENDZ---PAYMENT-CCBP
npm start
```

The frontend will run on `http://localhost:3000` (or 3001 if 3000 is busy)

## 📋 Complete Checklist

- [ ] MongoDB installed and running (local) OR MongoDB Atlas account created
- [ ] Created `server/.env` file with MongoDB connection string
- [ ] Installed backend dependencies: `cd server && npm install`
- [ ] Seeded database: `cd server && node seed.js`
- [ ] Backend server running: `cd server && npm start`
- [ ] Frontend server running: `npm start` (from root directory)

## 🔑 Important Notes

1. **MongoDB Connection String**: 
   - For local: `mongodb://localhost:27017/nxt-trendz`
   - For Atlas: Get it from your MongoDB Atlas dashboard

2. **JWT_SECRET**: 
   - Use a random string for security (can be anything like: `my-super-secret-key-12345`)

3. **Two Terminal Windows**: 
   - Terminal 1: Backend server (must run first)
   - Terminal 2: Frontend server

## 🚀 Quick Commands Summary

```bash
# Terminal 1 - Backend
cd server
npm install
# Create .env file (see above)
node seed.js
npm start

# Terminal 2 - Frontend  
cd ENHANCEMENT-OF-NXT-TRENDZ---PAYMENT-CCBP
npm start
```

## ❓ Troubleshooting

**If MongoDB connection fails:**
- Check if MongoDB is running (if local)
- Verify connection string in `.env` file
- Check internet connection (if using Atlas)

**If backend won't start:**
- Make sure port 4000 is not in use
- Check `.env` file exists in `server/` directory
- Verify all dependencies installed: `npm install` in server folder

**If frontend can't connect:**
- Make sure backend is running first
- Check that backend is on `http://localhost:4000`
- Verify API configuration in `src/config/api.js`


