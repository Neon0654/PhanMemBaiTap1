import React from 'react'

function ProductTable({ products }) {
  return (
    <div className="table-container">
      <h2>📋 All Products</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Category</th>
            <th>Category Slug</th>
            <th>Price (VND)</th>
            <th>Description</th>
            <th>Images</th>
            <th>Created At</th>
            <th>Update At</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>#{product.id}</td>

              <td>{product.title}</td>

              <td>{product.slug}</td>

              <td>{product.category?.name}</td>

              <td>{product.category?.slug}</td>

              <td>{product.price?.toLocaleString('vi-VN')}</td>

              <td>{product.description}</td>


              <td>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    width="60"
                  />
                ) : (
                  'No image'
                )}
              </td>

              <td>
                {product.creationAt
                  ? new Date(product.category.creationAt).toLocaleDateString('vi-VN')
                  : 'N/A'}
              </td>
              <td>
                {product.creationAt
                  ? new Date(product.category.updatedAt).toLocaleDateString('vi-VN')
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
