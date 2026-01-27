# 📖 API Testing Endpoints

Use this file to test all the API endpoints with curl commands.

## Test with cURL

### 1. Get all products
```bash
curl http://localhost:5000/api/products
```

### 2. Get only name and price
```bash
curl http://localhost:5000/api/products/name-price
```

### 3. Get products in stock (quantity > 0)
```bash
curl http://localhost:5000/api/products/in-stock
```

### 4. Check if any product has price > 30,000,000
```bash
curl http://localhost:5000/api/products/check-price
```

### 5. Check if all Accessories are available
```bash
curl http://localhost:5000/api/products/check-accessories
```

### 6. Get total inventory value
```bash
curl http://localhost:5000/api/products/inventory-value
```

### 7. Get product details (using for...of loop)
```bash
curl http://localhost:5000/api/products/details
```

### 8. Get properties of product with ID 1 (using for...in loop)
```bash
curl http://localhost:5000/api/products/properties/1
```

### 9. Get products that are available AND in stock
```bash
curl http://localhost:5000/api/products/available-in-stock
```

---

## Alternative: Test with Postman

1. Open Postman
2. Create a new collection "Product API"
3. Add each endpoint as a separate request
4. Change method to GET for all endpoints
5. Send requests and view responses

---

## Sample Data

All 8 products are initialized in `backend/server.js`:

| ID | Name | Price | Qty | Category | Available |
|----|------|-------|-----|----------|-----------|
| 1 | iPhone 15 Pro | 25,000,000 | 15 | Electronics | Yes |
| 2 | Samsung Galaxy S24 | 22,000,000 | 8 | Electronics | Yes |
| 3 | iPad Air | 18,000,000 | 5 | Electronics | No |
| 4 | AirPods Pro | 7,990,000 | 25 | Accessories | Yes |
| 5 | USB-C Cable | 500,000 | 50 | Accessories | Yes |
| 6 | Phone Stand | 300,000 | 0 | Accessories | No |
| 7 | Apple Watch Ultra | 16,990,000 | 12 | Electronics | Yes |
| 8 | Screen Protector | 150,000 | 100 | Accessories | Yes |

---

## Expected Results

### Query 4: Check price > 30,000,000
**Result**: false (no products with price > 30M)

### Query 5: Check all Accessories available
**Result**: false (Phone Stand is not available)

### Query 6: Total inventory value
**Result**: ~823,240,000 VND

### Query 9: Available & In-Stock products
**Result**: 6 products (all except iPad Air and Phone Stand)

---

**Test all endpoints to verify they work correctly!**
