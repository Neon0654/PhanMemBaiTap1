import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PostTable from './components/ProductTable'
import CommentSection from './components/CommentSection'

const API_BASE_URL = 'http://localhost:5000/api'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedPostId, setSelectedPostId] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch all posts (including soft-deleted ones)
      const postsRes = await axios.get(`${API_BASE_URL}/posts`)
      setProducts(postsRes.data)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to fetch data from the server. Make sure the backend is running on http://localhost:5000')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectPost = (postId) => {
    setSelectedPostId(postId)
  }

  return (
    <div className="container">
      <h1>📝 Blog Post Management System</h1>

      {error && <div className="error">⚠️ {error}</div>}

      {loading ? (
        <div className="loading">⏳ Loading data from backend...</div>
      ) : (
        <>
          <PostTable
            products={products}
            onRefresh={fetchData}
            onSelectPost={handleSelectPost}
            selectedPostId={selectedPostId}
          />
          <CommentSection postId={selectedPostId} />
        </>
      )}
    </div>
  )
}

export default App
