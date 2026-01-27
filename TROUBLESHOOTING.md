# 🔧 Troubleshooting Guide

Having issues? This guide will help you solve them!

---

## 🚨 Common Issues & Solutions

### Issue 1: Backend won't start

**Error**: `npm: command not found` or similar

**Solutions**:
1. Install Node.js from https://nodejs.org/
2. Verify installation: `node --version` and `npm --version`
3. Restart your terminal
4. Try again: `npm start`

---

### Issue 2: Port 5000 already in use

**Error**: `Error: listen EADDRINUSE :::5000`

**Solution 1** - Use a different port:
```javascript
// In backend/server.js, change line:
const PORT = 5000;  // Change to 5001, 5002, 5003, etc.
```

**Solution 2** - Kill the process using port 5000:

**On Windows (PowerShell)**:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
```

**On Mac/Linux**:
```bash
lsof -i :5000  # Find process ID
kill -9 <PID>  # Replace <PID> with process ID
```

---

### Issue 3: Frontend can't connect to backend

**Error**: "Failed to fetch data from the server" message in browser

**Causes & Solutions**:

1. **Backend not running**
   - Check: Is backend server running in terminal?
   - Solution: Run `npm start` in backend folder

2. **Wrong port**
   - Check: Backend should be on http://localhost:5000
   - Solution: Verify PORT in `backend/server.js` is 5000

3. **CORS issue** (unlikely, but check)
   - Solution: Verify `cors()` is imported in server.js
   - Line should be: `import cors from 'cors';`

4. **API URL wrong**
   - Check: `frontend/src/App.jsx`
   - Line should be: `const API_BASE_URL = 'http://localhost:5000/api'`

---

### Issue 4: npm install fails

**Error**: `npm ERR!` messages

**Solutions**:

1. **Clear npm cache**:
```bash
npm cache clean --force
```

2. **Delete node_modules and reinstall**:
```bash
rm -rf node_modules package-lock.json  # On Mac/Linux
rmdir /s node_modules  # On Windows
npm install
```

3. **Use different npm version**:
```bash
npm install -g npm@latest
npm install
```

4. **Check internet connection**
   - Ensure you're connected to the internet
   - Retry: `npm install`

---

### Issue 5: Blank page or "⏳ Loading..." stuck

**Causes & Solutions**:

1. **Frontend never finishes loading**
   - Check: Browser console (F12) for errors
   - Check: Backend is running
   - Try: Hard refresh (Ctrl+Shift+R)

2. **Components not rendering**
   - Check: `frontend/src/App.jsx` exists
   - Check: `frontend/src/components/` folder exists
   - Check: All imports are correct

3. **Vite dev server issue**
   - Solution: Stop (Ctrl+C) and restart:
   ```bash
   npm run dev
   ```

---

### Issue 6: Table shows but no data

**Error**: Table headers visible but no product rows

**Causes & Solutions**:

1. **Backend data not fetching**
   - Check: `http://localhost:5000/api/products` in browser
   - Should show JSON array of 8 products
   - If blank: backend data might not be initialized

2. **Frontend components not receiving data**
   - Check: Browser console for errors
   - Check: ProductTable.jsx receives `products` prop
   - Check: App.jsx fetches and sets state correctly

3. **CORS blocking requests**
   - Check: Backend has `cors()` middleware
   - Solution: Restart backend and frontend

---

### Issue 7: Dashboard cards show "Loading..." forever

**Cause**: One of the API calls is failing

**Solution**:
1. Test each API individually:
```bash
curl http://localhost:5000/api/products/inventory-value
curl http://localhost:5000/api/products/check-price
curl http://localhost:5000/api/products/check-accessories
curl http://localhost:5000/api/products/available-in-stock
curl http://localhost:5000/api/products/in-stock
```

2. Check browser console (F12) for error details
3. If an API returns error, check backend logs

---

### Issue 8: Styling looks broken/off

**Solutions**:

1. **CSS not loading**
   - Check: `frontend/src/index.css` exists
   - Check: `main.jsx` imports it: `import './index.css'`
   - Solution: Restart dev server

2. **Responsive design not working**
   - Check: Browser width (try resizing window)
   - Check: Check mobile view (F12 → toggle device toolbar)

3. **Colors not showing**
   - Check: CSS file wasn't corrupted
   - Solution: Clear browser cache (Ctrl+Shift+Delete)

---

### Issue 9: "Cannot find module" errors

**Error**: `Error: Cannot find module 'express'`

**Solution**:
```bash
cd backend
npm install  # Install missing dependencies
npm start
```

Same for frontend:
```bash
cd frontend
npm install  # Install missing dependencies
npm run dev
```

---

### Issue 10: Vite/React errors in console

**Error**: `React is not defined` or similar

**Solutions**:

1. **Make sure React is imported**
   - Files should have: `import React from 'react'`

2. **Check imports in components**
   - Dashboard.jsx and ProductTable.jsx should be properly imported

3. **Restart dev server**:
```bash
# Stop (Ctrl+C) then restart
npm run dev
```

---

## 🧪 Verification Checklist

Use this to verify everything is working:

### Backend ✅
- [ ] `npm start` runs without errors
- [ ] Prints "Server is running at http://localhost:5000"
- [ ] No port conflicts
- [ ] Can access http://localhost:5000/api/products in browser

### Frontend ✅
- [ ] `npm run dev` runs without errors
- [ ] Browser opens to http://localhost:3000
- [ ] See page title "Product Management System"
- [ ] Dashboard loads with 5 cards
- [ ] Product table appears with 8 rows

### API Endpoints ✅
- [ ] `/api/products` - Returns all 8 products
- [ ] `/api/products/in-stock` - Returns 7 products (excludes Phone Stand)
- [ ] `/api/products/inventory-value` - Returns total value
- [ ] `/api/products/check-price` - Returns false
- [ ] `/api/products/check-accessories` - Returns false

### Data Display ✅
- [ ] All 8 products visible in table
- [ ] Prices formatted with commas
- [ ] Status badges show correct color (green/red)
- [ ] Dashboard cards show correct values

---

## 🆘 Getting Help

If you're still stuck:

1. **Check the exact error message**
   - Write it down or take a screenshot
   - Search error message in browser

2. **Check browser console**
   - Press F12 in browser
   - Look for error messages in Console tab
   - Screenshot and review

3. **Review the setup steps**
   - Follow [QUICKSTART.md](QUICKSTART.md) step by step
   - Don't skip any steps

4. **Test APIs manually**
   - Use [API_TESTING.md](API_TESTING.md)
   - Test each endpoint with curl
   - Verify responses match expected output

5. **Check file locations**
   - Verify all files are in correct folders
   - See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

6. **Review the code**
   - Look at `backend/server.js` - is it importing correctly?
   - Look at `frontend/src/App.jsx` - are API calls correct?
   - Check for typos in filenames and imports

---

## 🎯 Step-by-Step Debugging

### If backend won't start:
1. Check Node.js installed: `node --version`
2. Check you're in backend folder: `pwd` (or `cd` in Windows)
3. Check dependencies: `ls node_modules` (or `dir node_modules`)
4. Check for syntax errors in server.js
5. Try: `node server.js` instead of npm start

### If frontend won't load:
1. Check you're in frontend folder
2. Check dependencies: `npm install`
3. Check Vite started: "VITE v5.0.0 ready in XXX ms"
4. Check browser address: http://localhost:3000
5. Check browser console (F12) for errors

### If no data shows:
1. Test backend API directly: `curl http://localhost:5000/api/products`
2. Check browser Network tab (F12) for API calls
3. Verify API_BASE_URL in App.jsx
4. Check for CORS errors in browser console

---

## 💻 Debug Mode Commands

### View backend logs in detail:
```bash
node --trace-warnings server.js
```

### View what's in products array:
Add to backend/server.js before `app.listen`:
```javascript
console.log('Products loaded:', products);
console.log('Total products:', products.length);
```

### Test API response:
```bash
curl -X GET http://localhost:5000/api/products | jq '.'
```

### Check if port is in use:
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

---

## 📝 Common Typos to Check

| Issue | Look for |
|-------|----------|
| Wrong API URL | `API_BASE_URL` in App.jsx |
| Wrong port | `const PORT = 5000` in server.js |
| Missing imports | `import` statements at top of files |
| Wrong file names | Check capitalization (case-sensitive on Mac/Linux) |
| Missing dependencies | Run `npm install` |
| Wrong folder | `cd` to correct folder before running npm |

---

## ✨ Final Tips

🔄 **Try restarting both servers** - Often fixes temporary issues
🧹 **Clear cache** - Ctrl+Shift+Delete in browser
🌀 **Hard refresh** - Ctrl+Shift+R (not just Ctrl+R)
📱 **Check console** - F12 → Console tab - always check here first
🔌 **Check connections** - Both backend and frontend should be running
📄 **Check files exist** - Verify all files are created
✅ **Follow guide carefully** - Don't skip steps

---

## 🎉 When Everything Works

You should see:
- ✅ Terminal shows "Server is running at http://localhost:5000"
- ✅ Browser shows page title and dashboard
- ✅ 5 statistics cards with data
- ✅ Table with 8 products
- ✅ No errors in browser console (F12)

---

**Good luck! You've got this! 💪**

If you get stuck, re-read this guide and the main README.md - answers are there!
