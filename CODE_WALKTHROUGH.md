# 💻 Code Walkthrough

A detailed explanation of the code structure to help you understand everything!

---

## 🔷 Backend Code Structure

### File: `backend/server.js`

```javascript
// 1. IMPORTS (Lines 1-3)
import express from 'express';
import cors from 'cors';

// These import the libraries we need
// express = web framework
// cors = allow requests from frontend

// 2. CREATE APP (Line 5)
const app = express();
const PORT = 5000;

// This creates our web server that will run on port 5000

// 3. MIDDLEWARE (Lines 8-10)
app.use(cors());                    // Allow requests from frontend
app.use(express.json());            // Parse JSON in requests

// These are functions that process all requests

// ============================================
// 4. PRODUCT CLASS (Lines 13-22)
// ============================================
class Product {
  constructor(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
  }
}

// This class creates product objects with all properties

// ============================================
// 5. PRODUCTS ARRAY (Lines 24-31)
// ============================================
const products = [
  new Product(1, 'iPhone 15 Pro', 25000000, 15, 'Electronics', true),
  new Product(2, 'Samsung Galaxy S24', 22000000, 8, 'Electronics', true),
  // ... 6 more products
];

// This array stores all 8 products
// Each product is created using the Product class

// ============================================
// 6. API ENDPOINTS (Lines 34+)
// ============================================
app.get('/api/products/name-price', (req, res) => {
  // req = request from frontend
  // res = response to frontend
  
  const result = products.map(product => ({
    name: product.name,
    price: product.price
  }));
  
  res.json(result);  // Send JSON response
});

// This creates an endpoint that:
// 1. Takes each product (map)
// 2. Extracts only name and price
// 3. Returns as JSON to frontend

// ============================================
// 7. START SERVER (Lines ~150+)
// ============================================
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});

// This starts the server and logs a message
```

---

## 🔵 Frontend Code Structure

### File: `frontend/src/App.jsx`

```javascript
// 1. IMPORTS (Lines 1-4)
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import ProductTable from './components/ProductTable'

// These import the tools we need
// useState, useEffect = React hooks
// axios = HTTP library
// Dashboard, ProductTable = components

// 2. API BASE URL (Line 6)
const API_BASE_URL = 'http://localhost:5000/api'

// This is where our backend is running

// 3. APP COMPONENT (Line 8)
function App() {
  // 4. STATE VARIABLES (Lines 9-12)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({})
  
  // State = data that can change
  // useState = React way to manage state
  
  // 5. FETCH DATA ON MOUNT (Lines 14-17)
  useEffect(() => {
    fetchData()
  }, [])
  
  // useEffect = runs when component loads (empty [] = once)
  // Calls fetchData() function to get data from backend
  
  // 6. FETCH FUNCTION (Lines 19-61)
  const fetchData = async () => {
    try {
      // Fetch all products
      const productsRes = await axios.get(`${API_BASE_URL}/products`)
      setProducts(productsRes.data)
      
      // Fetch inventory value
      const inventoryRes = await axios.get(`${API_BASE_URL}/products/inventory-value`)
      statsData.inventoryValue = inventoryRes.data.totalInventoryValue
      
      // ... fetch other stats ...
      
      setStats(statsData)
    } catch (err) {
      setError('Failed to fetch data...')
    }
  }
  
  // This function:
  // 1. Makes HTTP requests to backend APIs
  // 2. Gets the JSON response
  // 3. Stores data in state variables
  // 4. If error, shows error message
  
  // 7. RETURN JSX (Lines 63-77)
  return (
    <div className="container">
      <h1>📦 Product Management System</h1>
      
      {error && <div className="error">{error}</div>}
      
      {loading ? (
        <div className="loading">⏳ Loading...</div>
      ) : (
        <>
          <Dashboard stats={stats} />
          <ProductTable products={products} />
        </>
      )}
    </div>
  )
}

// This returns the HTML to display:
// - Title
// - Error message (if any)
// - Loading message (if loading)
// - Dashboard and Table (if loaded)
```

### File: `frontend/src/components/Dashboard.jsx`

```javascript
function Dashboard({ stats }) {
  // stats = props passed from App.jsx
  
  return (
    <div className="dashboard">
      {/* Each card shows one statistic */}
      <div className="dashboard-card">
        <h3>📊 Total Inventory Value</h3>
        <div className="dashboard-value">
          {stats.inventoryValueFormatted || 'Loading...'}
        </div>
        <p>Total value of all products in stock</p>
      </div>
      
      {/* More cards... */}
    </div>
  )
}

// This component:
// 1. Receives stats from App.jsx
// 2. Displays 5 statistic cards
// 3. Shows data in a nice format
```

### File: `frontend/src/components/ProductTable.jsx`

```javascript
function ProductTable({ products }) {
  // products = array passed from App.jsx
  
  return (
    <div className="table-container">
      <h2>📋 All Products</h2>
      <table>
        <thead>
          <tr>
            {/* Header row */}
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price (VND)</th>
            <th>Quantity</th>
            <th>Selling Status</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through products and create a row for each */}
          {products.map((product) => (
            <tr key={product.id}>
              <td>#{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price.toLocaleString('vi-VN')}</td>
              <td>{product.quantity}</td>
              <td>
                <span className={`available-badge ${product.isAvailable ? 'available' : 'not-available'}`}>
                  {product.isAvailable ? '✓ Available' : '✗ Not Available'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// This component:
// 1. Receives products array from App.jsx
// 2. Uses map() to create a table row for each product
// 3. Shows product details in columns
// 4. Formats price with Vietnamese locale
// 5. Shows status badge (green/red)
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────┐
│            Frontend App.jsx                          │
│  (Runs in browser at http://localhost:3000)         │
│                                                     │
│  useEffect → calls fetchData()                      │
│                     ↓                               │
│            Makes HTTP requests                      │
│            (via Axios)                              │
└────────────────────┬────────────────────────────────┘
                     │
                     │ HTTP GET Requests
                     │ (JSON format)
                     ↓
┌─────────────────────────────────────────────────────┐
│         Backend server.js                            │
│  (Runs at http://localhost:5000)                    │
│                                                     │
│  app.get('/api/products', ...)                      │
│      ↓                                              │
│  Processes request                                  │
│      ↓                                              │
│  Returns JSON response                              │
└────────────────────┬────────────────────────────────┘
                     │
                     │ HTTP Response
                     │ (JSON data)
                     ↓
┌─────────────────────────────────────────────────────┐
│        Frontend receives data                        │
│  (axios response)                                   │
│                     ↓                               │
│  Updates state (setProducts, setStats)              │
│                     ↓                               │
│  Components re-render                               │
│                     ↓                               │
│  Shows Dashboard and Table with data                │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Key Concepts Explained

### Backend Concepts

**1. Express Routes (API Endpoints)**
```javascript
app.get('/api/products', (req, res) => {
  // req = what user asks for
  // res = what we give back
  res.json(products);  // Send JSON response
});
```

**2. Array Methods Used**
- `map()` - Transform each item
- `filter()` - Keep only items that match condition
- `some()` - Check if any item matches
- `every()` - Check if all items match

**3. Loops Used**
```javascript
// for...of loop (goes through values)
for (const product of products) {
  totalValue += product.price * product.quantity;
}

// for...in loop (goes through keys)
for (const key in product) {
  console.log(key, product[key]);
}
```

### Frontend Concepts

**1. React Hooks**
```javascript
// useState = state management
const [products, setProducts] = useState([])

// useEffect = side effects (runs when component mounts)
useEffect(() => {
  fetchData()
}, [])  // Empty [] = run once when loaded
```

**2. Props (Passing data between components)**
```javascript
// In App.jsx
<Dashboard stats={stats} />  // Pass stats to Dashboard

// In Dashboard.jsx
function Dashboard({ stats }) {  // Receive stats as props
  // Use stats here
}
```

**3. Axios (Making HTTP requests)**
```javascript
// GET request to backend
const response = await axios.get('http://localhost:5000/api/products')
const data = response.data  // Get response data
```

**4. JSX (Mixing HTML with JavaScript)**
```javascript
{/* If loading is true, show loading message */}
{loading ? (
  <div>Loading...</div>
) : (
  // Otherwise show dashboard
  <Dashboard stats={stats} />
)}
```

---

## 📊 API Endpoint Details

### Example: Get Products in Stock

**Backend Code (server.js):**
```javascript
app.get('/api/products/in-stock', (req, res) => {
  // filter() keeps only products with quantity > 0
  const inStockProducts = products.filter(product => product.quantity > 0);
  
  // Send JSON response
  res.json(inStockProducts);
});
```

**Frontend Code (App.jsx):**
```javascript
// Make request to backend
const inStockRes = await axios.get(`${API_BASE_URL}/products/in-stock`)

// Get the data
const inStockProducts = inStockRes.data

// Now we can use this data to show statistics
statsData.inStockCount = inStockProducts.length
```

---

## 🧩 Component Relationship

```
App.jsx (Main Component)
├── Fetches all data from backend
├── Stores data in state
├── Passes data to child components
│
├── Dashboard.jsx (Child Component)
│   ├── Receives: stats (object with statistics)
│   └── Displays: 5 statistic cards
│
└── ProductTable.jsx (Child Component)
    ├── Receives: products (array of 8 products)
    └── Displays: Table with product data
```

---

## 🔍 Code Quality Features

✨ **Readable**: Variable names are clear
✨ **Structured**: Code is organized in sections
✨ **Commented**: Important parts are explained
✨ **Error Handling**: Catches and shows errors
✨ **Responsive**: Works on all screen sizes

---

## 📝 Understanding the Flow

1. **User loads page** → Browser requests http://localhost:3000
2. **React renders App** → App component loads
3. **useEffect runs** → Calls fetchData()
4. **Axios makes requests** → Sends HTTP GET to backend
5. **Backend processes** → Finds data, returns JSON
6. **Frontend receives** → Updates state with response
7. **Components re-render** → Dashboard and Table show data
8. **User sees results** → Page displays products and statistics

---

## 🎯 Testing Your Understanding

Try these:

1. **Change a product's price** in `backend/server.js`
   - What happens to inventory value?

2. **Add a console.log()** in App.jsx
   ```javascript
   console.log('Products:', products);
   ```
   - Check browser console (F12)

3. **Modify a component** in ProductTable.jsx
   - Change column order
   - Add a new column
   - Change styling

4. **Test an API directly** in browser:
   ```
   http://localhost:5000/api/products
   ```
   - See raw JSON response

---

## 💡 Key Takeaways

- **Backend**: Stores data, provides APIs, processes requests
- **Frontend**: Displays data, handles user interaction, makes API calls
- **Communication**: HTTP requests/responses in JSON format
- **React**: Components, props, state, hooks
- **Express**: Routes, middleware, responses
- **JavaScript**: Arrays, loops, promises, async/await

---

**Now you understand the code! Happy learning! 🚀**
