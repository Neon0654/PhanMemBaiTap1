import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './CommentSection.css'

const API_BASE_URL = 'http://localhost:5000/api'

function CommentSection({ postId }) {
    const [comments, setComments] = useState([])
    const [newCommentText, setNewCommentText] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editText, setEditText] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (postId) {
            fetchComments()
        }
    }, [postId])

    const fetchComments = async () => {
        try {
            setLoading(true)
            const res = await axios.get(`${API_BASE_URL}/posts/${postId}/comments`)
            setComments(res.data)
        } catch (err) {
            console.error('Error fetching comments:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateComment = async (e) => {
        e.preventDefault()
        if (!newCommentText.trim()) return

        try {
            const res = await axios.post(`${API_BASE_URL}/comments`, {
                text: newCommentText,
                postId: postId
            })
            setComments([...comments, res.data])
            setNewCommentText('')
        } catch (err) {
            console.error('Error creating comment:', err)
            alert('Failed to create comment')
        }
    }

    const handleUpdateComment = async (commentId) => {
        if (!editText.trim()) return

        try {
            const res = await axios.put(`${API_BASE_URL}/comments/${commentId}`, {
                text: editText
            })
            setComments(comments.map(c => c.id === commentId ? res.data : c))
            setEditingId(null)
            setEditText('')
        } catch (err) {
            console.error('Error updating comment:', err)
            alert('Failed to update comment')
        }
    }

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('Are you sure you want to delete this comment?')) return

        try {
            await axios.delete(`${API_BASE_URL}/comments/${commentId}`)
            setComments(comments.filter(c => c.id !== commentId))
        } catch (err) {
            console.error('Error deleting comment:', err)
            alert('Failed to delete comment')
        }
    }

    const startEdit = (comment) => {
        setEditingId(comment.id)
        setEditText(comment.text)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditText('')
    }

    if (!postId) {
        return <div className="comment-section">
            <p className="no-post-selected">Select a post to view comments</p>
        </div>
    }

    return (
        <div className="comment-section">
            <h3>💬 Comments for Post #{postId}</h3>

            {/* Create Comment Form */}
            <form onSubmit={handleCreateComment} className="comment-form">
                <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    rows="3"
                />
                <button type="submit" className="btn-primary">Add Comment</button>
            </form>

            {/* Comments List */}
            {loading ? (
                <p>Loading comments...</p>
            ) : comments.length === 0 ? (
                <p className="no-comments">No comments yet. Be the first to comment!</p>
            ) : (
                <div className="comments-list">
                    {comments.map(comment => (
                        <div key={comment.id} className="comment-item">
                            {editingId === comment.id ? (
                                <div className="edit-form">
                                    <textarea
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        rows="2"
                                    />
                                    <div className="edit-actions">
                                        <button onClick={() => handleUpdateComment(comment.id)} className="btn-save">
                                            Save
                                        </button>
                                        <button onClick={cancelEdit} className="btn-cancel">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p className="comment-text">{comment.text}</p>
                                    <div className="comment-actions">
                                        <button onClick={() => startEdit(comment)} className="btn-edit">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteComment(comment.id)} className="btn-delete">
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CommentSection
