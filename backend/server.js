import express from 'express';
import cors from 'cors';
import products from './data/products.json' with { type: 'json' };

const app = express();
const PORT = 5000;

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

// ============================================
// PRODUCT CLASS
// ============================================
class Product {
  constructor({
    id,
    name,
    price,
    quantity,
    category,
    isAvailable,
    description,
    images,
  }) {
    this.id = id;
    this.title = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
    this.description = description;
    this.images = images;
  }
}

// ============================================
// API 1: Get only name and price of all products
// ============================================
app.get('/api/products/name-price', (req, res) => {
  const result = products.map(product => ({
    name: product.name,
    price: product.price
  }));
  res.json(result);
});

// ============================================
// API 2: Filter products that are in stock (quantity > 0)
// ============================================
app.get('/api/products/in-stock', (req, res) => {
  const inStockProducts = products.filter(product => product.quantity > 0);
  res.json(inStockProducts);
});

// ============================================
// API 3: Check if any product has price > 30,000,000
// ============================================
app.get('/api/products/check-price', (req, res) => {
  const hasPriceGreater = products.some(product => product.price > 30000000);
  res.json({
    hasPriceGreater: hasPriceGreater,
    message: hasPriceGreater 
      ? 'There is at least one product with price > 30,000,000' 
      : 'No products with price > 30,000,000 found'
  });
});

// ============================================
// API 4: Check if all "Accessories" are available
// ============================================
app.get('/api/products/check-accessories', (req, res) => {
  const accessoriesProducts = products.filter(p => p.category === 'Accessories');
  const allAccessoriesAvailable = accessoriesProducts.every(product => product.isAvailable === true);
  
  res.json({
    allAccessoriesAvailable: allAccessoriesAvailable,
    totalAccessories: accessoriesProducts.length,
    message: allAccessoriesAvailable 
      ? 'All Accessories are available for sale' 
      : 'Not all Accessories are available for sale'
  });
});

// ============================================
// API 5: Calculate total inventory value
// ============================================
app.get('/api/products/inventory-value', (req, res) => {
  let totalValue = 0;
  
  for (const product of products) {
    totalValue += product.price * product.quantity;
  }
  
  res.json({
    totalInventoryValue: totalValue,
    formattedValue: totalValue.toLocaleString('vi-VN') + ' VND'
  });
});

// ============================================
// API 6: Use for...of loop to get product details
// ============================================
app.get('/api/products/details', (req, res) => {
  const productDetails = [];
  
  for (const product of products) {
    productDetails.push({
      name: product.name,
      category: product.category,
      sellingStatus: product.isAvailable ? 'Available' : 'Not Available'
    });
  }
  
  res.json(productDetails);
});

// ============================================
// API 7: Use for...in loop on a product object
// ============================================
app.get('/api/products/properties/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const properties = {};
  for (const key in product) {
    properties[key] = product[key];
  }
  
  res.json({
    message: `Properties of product ID ${productId}:`,
    properties: properties
  });
});

// ============================================
// API 8: Get products that are available AND in stock
// ============================================
app.get('/api/products/available-in-stock', (req, res) => {
  const availableInStock = products
    .filter(product => product.isAvailable === true && product.quantity > 0)
    .map(product => product.name);
  
  res.json({
    availableInStockProducts: availableInStock,
    count: availableInStock.length
  });
});

// ============================================
// API 9: Get all products (for frontend display)
// ============================================
app.get('/api/products', (req, res) => {
  res.json(products);
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
  console.log('\n📋 Available API Endpoints:');
  console.log('  GET /api/products - Get all products');
  console.log('  GET /api/products/name-price - Get name and price only');
  console.log('  GET /api/products/in-stock - Get products in stock');
  console.log('  GET /api/products/check-price - Check price > 30,000,000');
  console.log('  GET /api/products/check-accessories - Check all Accessories available');
  console.log('  GET /api/products/inventory-value - Calculate total inventory value');
  console.log('  GET /api/products/details - Get product details (for...of loop)');
  console.log('  GET /api/products/properties/:id - Get product properties (for...in loop)');
  console.log('  GET /api/products/available-in-stock - Get available AND in-stock products');
});
