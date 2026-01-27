import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import ProductTable from './components/ProductTable'

const API_BASE_URL = 'http://localhost:5000/api'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all products
      const productsRes = await axios.get(`${API_BASE_URL}/products`)
      setProducts(productsRes.data)

      // Fetch statistics
      const statsData = {}

      // Get inventory value
      const inventoryRes = await axios.get(`${API_BASE_URL}/products/inventory-value`)
      statsData.inventoryValue = inventoryRes.data.totalInventoryValue
      statsData.inventoryValueFormatted = inventoryRes.data.formattedValue

      // Check if any product > 30,000,000
      const priceCheckRes = await axios.get(`${API_BASE_URL}/products/check-price`)
      statsData.hasPriceGreater = priceCheckRes.data.hasPriceGreater

      // Check if all accessories available
      const accessoriesRes = await axios.get(`${API_BASE_URL}/products/check-accessories`)
      statsData.allAccessoriesAvailable = accessoriesRes.data.allAccessoriesAvailable

      // Get available and in-stock products
      const availableRes = await axios.get(`${API_BASE_URL}/products/available-in-stock`)
      statsData.availableInStockCount = availableRes.data.count

      // Get in-stock products count
      const inStockRes = await axios.get(`${API_BASE_URL}/products/in-stock`)
      statsData.inStockCount = inStockRes.data.length

      setStats(statsData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch data from the server. Make sure the backend is running on http://localhost:5000')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>📦 Product Management System</h1>

      {error && <div className="error">⚠️ {error}</div>}

      {loading ? (
        <div className="loading">⏳ Loading data from backend...</div>
      ) : (
        <>
          <Dashboard stats={stats} />
          <ProductTable products={products} />
        </>
      )}
    </div>
  )
}

export default App
