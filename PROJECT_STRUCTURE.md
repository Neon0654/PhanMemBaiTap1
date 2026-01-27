# 📁 Project Structure Overview

```
BT_1/
│
├── 📄 README.md                          # Full documentation
├── 📄 QUICKSTART.md                      # Step-by-step setup guide
├── 📄 API_TESTING.md                     # API endpoint testing guide
├── 📄 .gitignore                         # Git ignore rules
│
├── 📂 backend/                           # Express.js Backend
│   ├── 📄 package.json                   # Backend dependencies
│   ├── 📄 server.js                      # Main Express server
│   │   │
│   │   ├── Product Class                 # Constructor for products
│   │   ├── Products Array                # 8 initialized products
│   │   │
│   │   ├── API #1: /api/products                    (all products)
│   │   ├── API #2: /api/products/name-price        (name & price only)
│   │   ├── API #3: /api/products/in-stock          (quantity > 0)
│   │   ├── API #4: /api/products/check-price       (price > 30M check)
│   │   ├── API #5: /api/products/check-accessories (all available check)
│   │   ├── API #6: /api/products/inventory-value   (total value calc)
│   │   ├── API #7: /api/products/details           (for...of loop)
│   │   ├── API #8: /api/products/properties/:id    (for...in loop)
│   │   └── API #9: /api/products/available-in-stock (both conditions)
│   │
│   └── 📂 node_modules/                 # Dependencies (after npm install)
│
└── 📂 frontend/                          # React + Vite Frontend
    ├── 📄 package.json                   # Frontend dependencies
    ├── 📄 vite.config.js                 # Vite configuration
    ├── 📄 index.html                     # HTML entry point
    │
    ├── 📂 src/
    │   ├── 📄 main.jsx                   # React entry point
    │   ├── 📄 App.jsx                    # Main App component
    │   │   └── Fetches all APIs
    │   │   └── Manages state
    │   │   └── Passes data to components
    │   │
    │   ├── 📄 index.css                  # Global styles
    │   │
    │   └── 📂 components/
    │       ├── 📄 Dashboard.jsx          # Statistics display
    │       │   ├── Total inventory value
    │       │   ├── Products in stock count
    │       │   ├── Premium products check
    │       │   ├── Accessories availability
    │       │   └── Available & in-stock count
    │       │
    │       └── 📄 ProductTable.jsx       # Product listing table
    │           ├── Product ID
    │           ├── Name
    │           ├── Category
    │           ├── Price
    │           ├── Quantity
    │           └── Selling Status
    │
    └── 📂 node_modules/                 # Dependencies (after npm install)

```

---

## 🔄 Data Flow

```
┌──────────────────┐
│   React App      │
│    (Frontend)    │
└────────┬─────────┘
         │
         │ Axios HTTP Requests
         │ (JSON over HTTP)
         ▼
┌──────────────────┐
│  Express API     │
│    (Backend)     │
└────────┬─────────┘
         │
         │ Process Data
         │ (loops, filters, calculations)
         │
         ▼
┌──────────────────┐
│   Products Array │
│  (8 Products)    │
└──────────────────┘

```

---

## 📊 Component Hierarchy

```
App (main component)
│
├─ Dashboard (statistics cards)
│  ├─ Inventory Value Card
│  ├─ In Stock Count Card
│  ├─ Premium Products Card
│  ├─ Accessories Status Card
│  └─ Available & In-Stock Card
│
└─ ProductTable (product listing)
   └─ Table with 8 rows (one per product)
```

---

## 🔌 API Communication

**Base URL**: `http://localhost:5000/api`

All endpoints return JSON responses that the frontend processes and displays.

---

## ✨ File Purposes

| File | Purpose |
|------|---------|
| `server.js` | Main backend logic with 9 APIs |
| `App.jsx` | Fetches data from all APIs, manages state |
| `Dashboard.jsx` | Displays statistics and key metrics |
| `ProductTable.jsx` | Displays all products in table format |
| `index.css` | Styling for dashboard and table |

---

## 🎯 Code Examples by Requirement

### Req #1: Product Class
Found in: `backend/server.js` (lines 9-18)

### Req #2: Initialize Products
Found in: `backend/server.js` (lines 20-29)

### Req #3: Name & Price API
Found in: `backend/server.js` (lines 32-40)

### Req #4: In-Stock Filter
Found in: `backend/server.js` (lines 43-49)

### Req #5: Price Check
Found in: `backend/server.js` (lines 52-62)

### Req #6: Accessories Check
Found in: `backend/server.js` (lines 65-75)

### Req #7: Inventory Value (for...of)
Found in: `backend/server.js` (lines 78-90)

### Req #8: Details (for...of)
Found in: `backend/server.js` (lines 93-108)

### Req #9: Properties (for...in)
Found in: `backend/server.js` (lines 111-126)

### Req #10: Available & In-Stock
Found in: `backend/server.js` (lines 129-140)

---

Happy coding! 🚀
