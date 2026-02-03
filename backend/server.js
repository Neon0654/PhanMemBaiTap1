import express from 'express';
import cors from 'cors';
import db from './data/db.json' with { type: 'json' };

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const posts = db.posts;
const comments = db.comments;

// ==============================
// HELPER: AUTO INCREMENT ID (STRING)
// ==============================
const generateId = (collection) => {
  const ids = collection.map(item => Number(item.id));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return String(maxId + 1);
};

// ==============================
// POSTS CRUD
// ==============================

// GET ALL POSTS (INCLUDE SOFT DELETED)
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// CREATE POST
app.post('/api/posts', (req, res) => {
  const { title, views } = req.body;

  const newPost = {
    id: generateId(posts),
    title,
    views,
    isDeleted: false
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// UPDATE POST
app.put('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  Object.assign(post, req.body);
  res.json(post);
});

// SOFT DELETE POST
app.delete('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  post.isDeleted = true;
  res.json({ message: 'Post soft deleted', post });
});

// ==============================
// COMMENTS CRUD
// ==============================

// GET COMMENTS BY POST ID
app.get('/api/posts/:postId/comments', (req, res) => {
  const postComments = comments.filter(
    c => c.postId === req.params.postId
  );
  res.json(postComments);
});

// CREATE COMMENT
app.post('/api/comments', (req, res) => {
  const { text, postId } = req.body;

  const newComment = {
    id: generateId(comments),
    text,
    postId
  };

  comments.push(newComment);
  res.status(201).json(newComment);
});

// UPDATE COMMENT
app.put('/api/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === req.params.id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  Object.assign(comment, req.body);
  res.json(comment);
});

// DELETE COMMENT (HARD DELETE – OK THEO BÀI)
app.delete('/api/comments/:id', (req, res) => {
  const index = comments.findIndex(c => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  comments.splice(index, 1);
  res.json({ message: 'Comment deleted' });
});

// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
