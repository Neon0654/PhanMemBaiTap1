# Trần Thanh Hoài_2280601015
# 📦 Product Management System - Full Stack Project

A complete full-stack application demonstrating Node.js + Express backend with React + Vite frontend for managing and displaying product inventory.

---

## 🏗️ Project Structure

```
BT_1/
├── backend/
│   ├── package.json          # Node.js dependencies
│   ├── server.js             # Main Express server with all APIs
│   └── node_modules/         # Dependencies (after npm install)
│
└── frontend/
    ├── package.json          # React + Vite dependencies
    ├── vite.config.js        # Vite configuration
    ├── index.html            # HTML entry point
    ├── node_modules/         # Dependencies (after npm install)
    └── src/
        ├── main.jsx          # React entry point
        ├── App.jsx           # Main App component
        ├── index.css         # Global styles
        └── components/
            ├── Dashboard.jsx # Statistics dashboard
            └── ProductTable.jsx # Product listing table
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Backend Setup

```bash
cd backend
npm install
npm start
# or npm run dev (with watch mode)
```

The backend will start at: **http://localhost:5000**

### 2. Frontend Setup (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

The frontend will open at: **http://localhost:3000**

---

## 📋 Backend Implementation Details

### Product Class

```javascript
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
```

### Initialized Products

The backend initializes 8 products across 2 categories:
- **Electronics**: iPhone 15 Pro, Samsung Galaxy S24, iPad Air, Apple Watch Ultra
- **Accessories**: AirPods Pro, USB-C Cable, Phone Stand, Screen Protector

---

## 📡 API Endpoints

### 1. **GET /api/products**
Returns all products with full details.

**Response:**
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 25000000,
    "quantity": 15,
    "category": "Electronics",
    "isAvailable": true
  },
  ...
]
```

### 2. **GET /api/products/name-price**
Returns only product name and price (Requirement #3).

**Response:**
```json
[
  { "name": "iPhone 15 Pro", "price": 25000000 },
  { "name": "Samsung Galaxy S24", "price": 22000000 },
  ...
]
```

### 3. **GET /api/products/in-stock**
Filters products with quantity > 0 (Requirement #4).

**Response:**
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 25000000,
    "quantity": 15,
    "category": "Electronics",
    "isAvailable": true
  },
  ...
]
```

### 4. **GET /api/products/check-price**
Checks if any product has price > 30,000,000 (Requirement #5).

**Response:**
```json
{
  "hasPriceGreater": false,
  "message": "No products with price > 30,000,000 found"
}
```

### 5. **GET /api/products/check-accessories**
Checks if all "Accessories" category products are available (Requirement #6).

**Response:**
```json
{
  "allAccessoriesAvailable": false,
  "totalAccessories": 4,
  "message": "Not all Accessories are available for sale"
}
```

### 6. **GET /api/products/inventory-value**
Calculates total inventory value = price × quantity (Requirement #7, uses for...of loop).

**Response:**
```json
{
  "totalInventoryValue": 1234567890,
  "formattedValue": "1.234.567.890 VND"
}
```

### 7. **GET /api/products/details**
Uses for...of loop to return product name, category, and selling status (Requirement #8).

**Response:**
```json
[
  {
    "name": "iPhone 15 Pro",
    "category": "Electronics",
    "sellingStatus": "Available"
  },
  ...
]
```

### 8. **GET /api/products/properties/:id**
Uses for...in loop on a product object to print all properties (Requirement #9).

**Example:** `GET /api/products/properties/1`

**Response:**
```json
{
  "message": "Properties of product ID 1:",
  "properties": {
    "id": 1,
    "name": "iPhone 15 Pro",
    "price": 25000000,
    "quantity": 15,
    "category": "Electronics",
    "isAvailable": true
  }
}
```

### 9. **GET /api/products/available-in-stock**
Returns product names that are both available AND in stock (Requirement #10).

**Response:**
```json
{
  "availableInStockProducts": [
    "iPhone 15 Pro",
    "Samsung Galaxy S24",
    "AirPods Pro",
    "USB-C Cable",
    "Apple Watch Ultra",
    "Screen Protector"
  ],
  "count": 6
}
```

---

## 🎨 Frontend Components

### App.jsx
- Fetches data from all backend APIs
- Manages loading and error states
- Passes data to child components (Dashboard and ProductTable)

### Dashboard.jsx
Displays key statistics:
- Total inventory value
- Products in stock count
- Premium products availability (price > 30M VND)
- Accessories availability status
- Count of products available AND in stock

### ProductTable.jsx
Displays all products in a table format with:
- Product ID
- Product Name
- Category
- Price (formatted)
- Quantity
- Selling Status (Available/Not Available)

---

## 🔄 Backend-Frontend Communication

### How They Connect:

1. **CORS Configuration**: Backend uses `cors` middleware to allow frontend requests
2. **API Base URL**: Frontend uses `http://localhost:5000/api` to communicate with backend
3. **Axios HTTP Client**: Frontend uses axios to make HTTP requests
4. **JSON Data Format**: All communication uses JSON

### Data Flow:

```
Frontend (React/Vite)
       ↓
  Axios Request
       ↓
Express Routes
       ↓
Product Data Processing
       ↓
JSON Response
       ↓
React State Update
       ↓
Component Re-render
```

### Example Request Flow:

```javascript
// Frontend (App.jsx)
const productsRes = await axios.get(`${API_BASE_URL}/products`)
// Makes GET request to: http://localhost:5000/api/products

// Backend (server.js)
app.get('/api/products', (req, res) => {
  res.json(products);  // Returns products array as JSON
});
```

---

## 🧪 Testing the APIs

### Using cURL:

```bash
# Get all products
curl http://localhost:5000/api/products

# Get name and price only
curl http://localhost:5000/api/products/name-price

# Get in-stock products
curl http://localhost:5000/api/products/in-stock

# Check if any product > 30M
curl http://localhost:5000/api/products/check-price

# Check if all accessories available
curl http://localhost:5000/api/products/check-accessories

# Get inventory value
curl http://localhost:5000/api/products/inventory-value

# Get product details (for...of loop)
curl http://localhost:5000/api/products/details

# Get product properties (for...in loop) - example with ID 1
curl http://localhost:5000/api/products/properties/1

# Get available and in-stock products
curl http://localhost:5000/api/products/available-in-stock
```

### Using Postman:
1. Import the API endpoints listed above
2. Test each endpoint individually
3. Verify JSON responses match the expected format

---

## 📝 Key Features

✅ **Product Class**: Constructor function to create product objects
✅ **Product Array**: 8 products initialized with various properties
✅ **Name & Price API**: Returns only necessary fields (Requirement #3)
✅ **In-Stock Filter**: Products with quantity > 0 (Requirement #4)
✅ **Price Check**: Verifies products with price > 30M (Requirement #5)
✅ **Accessories Check**: Validates all accessories availability (Requirement #6)
✅ **Inventory Value**: Calculates total value with for...of loop (Requirement #7)
✅ **For...of Loop**: Iterates products for name, category, status (Requirement #8)
✅ **For...in Loop**: Enumerates product properties (Requirement #9)
✅ **Available & In-Stock**: Returns products meeting both conditions (Requirement #10)
✅ **Responsive UI**: Dashboard and product table display
✅ **Error Handling**: Displays user-friendly error messages

---

## 🛠️ Technologies Used

### Backend:
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend:
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

---

## 📚 Educational Value

This project is suitable for students learning:
- JavaScript ES6 classes and objects
- Array methods: map(), filter(), some(), every()
- Loop structures: for...of and for...in
- RESTful API design
- Express.js basics
- React hooks (useState, useEffect)
- HTTP requests and responses
- Frontend-backend communication

---

## 💡 Next Steps (Optional Enhancements)

- Add product search/filter functionality
- Implement pagination
- Add product create/update/delete features
- Add authentication
- Add database (MongoDB, PostgreSQL)
- Add unit tests
- Deploy to cloud services

---

**Happy Coding! 🎉**
