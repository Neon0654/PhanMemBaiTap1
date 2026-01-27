import React from 'react'

function Dashboard({ stats }) {
  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h3>📊 Total Inventory Value</h3>
        <div className="dashboard-value">
          {stats.inventoryValueFormatted || 'Loading...'}
        </div>
        <p>Total value of all products in stock</p>
      </div>

      <div className="dashboard-card">
        <h3>📦 Products in Stock</h3>
        <div className="dashboard-value">{stats.inStockCount || 0}</div>
        <p>Products with quantity greater than 0</p>
      </div>

      <div className="dashboard-card">
        <h3>💰 Premium Products</h3>
        <div className="dashboard-status">
          <span className={`status-badge ${stats.hasPriceGreater ? 'status-success' : 'status-danger'}`}>
            {stats.hasPriceGreater ? '✓ Found' : '✗ Not Found'}
          </span>
        </div>
        <p>Products with price &gt; 30,000,000 VND</p>
      </div>

      <div className="dashboard-card">
        <h3>🏷️ Accessories Status</h3>
        <div className="dashboard-status">
          <span className={`status-badge ${stats.allAccessoriesAvailable ? 'status-success' : 'status-danger'}`}>
            {stats.allAccessoriesAvailable ? '✓ All Available' : '✗ Not All Available'}
          </span>
        </div>
        <p>All accessories available for sale</p>
      </div>

      <div className="dashboard-card">
        <h3>🛒 Available & In Stock</h3>
        <div className="dashboard-value">{stats.availableInStockCount || 0}</div>
        <p>Products available for sale AND in stock</p>
      </div>
    </div>
  )
}

export default Dashboard
