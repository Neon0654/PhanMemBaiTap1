import React from 'react'

function ProductTable({ products }) {
  return (
    <div className="table-container">
      <h2>📋 All Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price (VND)</th>
            <th>Quantity</th>
            <th>Selling Status</th>
          </tr>
        </thead>
        <tbody>
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

export default ProductTable
