import React, { useState } from 'react'
import axios from 'axios'
import './PostTable.css'

const API_BASE_URL = 'http://localhost:5000/api'

function PostTable({ products, onRefresh, onSelectPost, selectedPostId }) {
  const [newTitle, setNewTitle] = useState('')
  const [newViews, setNewViews] = useState('')
  const [creating, setCreating] = useState(false)

  const handleCreatePost = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) {
      alert('Please enter a title')
      return
    }

    try {
      setCreating(true)
      await axios.post(`${API_BASE_URL}/posts`, {
        title: newTitle,
        views: parseInt(newViews) || 0
      })
      setNewTitle('')
      setNewViews('')
      onRefresh()
    } catch (err) {
      console.error('Error creating post:', err)
      alert('Failed to create post')
    } finally {
      setCreating(false)
    }
  }

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`)
      onRefresh()
    } catch (err) {
      console.error('Error deleting post:', err)
      alert('Failed to delete post')
    }
  }

  return (
    <div className="table-container">
      <h2>📋 All Posts</h2>

      {/* Create Post Form */}
      <form onSubmit={handleCreatePost} className="create-post-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Post title"
          disabled={creating}
        />
        <input
          type="number"
          value={newViews}
          onChange={(e) => setNewViews(e.target.value)}
          placeholder="Views (optional)"
          disabled={creating}
        />
        <button type="submit" disabled={creating}>
          {creating ? 'Creating...' : '➕ Create Post'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Views</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((post) => (
            <tr
              key={post.id}
              className={`${post.isDeleted ? 'deleted-row' : ''} ${selectedPostId === post.id ? 'selected-row' : ''}`}
              onClick={() => onSelectPost(post.id)}
              style={{ cursor: 'pointer' }}
            >
              <td>#{post.id}</td>

              <td className={post.isDeleted ? 'deleted-text' : ''}>
                {post.title}
              </td>

              <td>{post.views}</td>

              <td>
                {post.isDeleted ? (
                  <span className="deleted-badge">Deleted</span>
                ) : (
                  <span className="active-badge">Active</span>
                )}
              </td>

              <td>
                {!post.isDeleted && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeletePost(post.id)
                    }}
                    className="btn-delete-small"
                  >
                    🗑️ Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostTable
