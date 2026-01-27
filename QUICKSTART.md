# 🚀 Quick Start Guide

## Step 1: Install Backend Dependencies

Open terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

This will install Express.js and CORS packages.

---

## Step 2: Start the Backend Server

```bash
npm start
```

You should see:
```
✅ Server is running at http://localhost:5000

📋 Available API Endpoints:
  GET /api/products - Get all products
  GET /api/products/name-price - Get name and price only
  GET /api/products/in-stock - Get products in stock
  GET /api/products/check-price - Check price > 30,000,000
  GET /api/products/check-accessories - Check all Accessories available
  GET /api/products/inventory-value - Calculate total inventory value
  GET /api/products/details - Get product details (for...of loop)
  GET /api/products/properties/:id - Get product properties (for...in loop)
  GET /api/products/available-in-stock - Get available AND in-stock products
```

✅ **Backend is ready!**

---

## Step 3: Install Frontend Dependencies

Open a **NEW terminal** and navigate to the frontend folder:

```bash
cd frontend
npm install
```

This will install React, Vite, and Axios packages.

---

## Step 4: Start the Frontend Dev Server

```bash
npm run dev
```

The frontend will automatically open in your browser at **http://localhost:3000**

✅ **Frontend is ready!**

---

## ✅ You're Done!

You should now see:
- A dashboard with 5 statistics cards
- A table with all 8 products
- All data fetched from the backend API

---

## 📝 File Locations

- Backend server code: `backend/server.js`
- Frontend main component: `frontend/src/App.jsx`
- Frontend components: `frontend/src/components/`
- API documentation: `README.md`

---

## 🧪 Testing an API Endpoint

Open your browser and visit:
```
http://localhost:5000/api/products
```

You should see JSON data of all products.

---

## ⚠️ Troubleshooting

### Port 5000 is already in use:
Edit `backend/server.js` and change:
```javascript
const PORT = 5000;  // Change to 5001, 5002, etc.
```

### Frontend can't connect to backend:
- Make sure backend is running on http://localhost:5000
- Check that CORS is enabled (it is by default)
- Check browser console (F12) for error messages

### npm install fails:
- Make sure you have Node.js installed: `node --version`
- Update npm: `npm install -g npm@latest`
- Delete `node_modules` folder and try again

---

## 🎓 Key Learning Points

1. **Backend**: How to create REST APIs with Express
2. **Frontend**: How to fetch and display data with React
3. **Communication**: How frontend and backend exchange data via HTTP
4. **JavaScript**: Arrays, loops, object destructuring, async/await
5. **Styling**: Responsive CSS grid and table layout

---

Enjoy your project! 🎉
