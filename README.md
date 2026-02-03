# Trần Thanh Hoài - 2280601015

# 📝 Blog Post Management System with JSON-Server

A full-stack blog management application with soft delete, auto-increment IDs, and complete CRUD operations for posts and comments.

---

## 👨‍🎓 Student Information

- **Full Name:** Trần Thanh Hoài
- **Student ID (MSSV):** 2280601015

---

## 🏗️ Project Structure

```
PhanMemBaiTap1/
├── backend/
│   ├── server.js             # Express server with custom middleware
│   ├── package.json          # Backend dependencies
│   └── data/
│       └── db.json           # Database file (posts, comments, profile)
│
└── frontend/
    ├── package.json          # Frontend dependencies
    ├── index.html            # HTML entry point
    └── src/
        ├── main.jsx          # React entry point
        ├── App.jsx           # Main application component
        ├── index.css         # Global styles
        └── components/
            ├── ProductTable.jsx    # Post list with CRUD
            ├── PostTable.css       # Post table styles
            ├── CommentSection.jsx  # Comment management
            └── CommentSection.css  # Comment styles
```

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Start the Backend Server

```bash
npm run dev
```

The backend server will start at: **http://localhost:5000**

### 3. Install Frontend Dependencies (in a new terminal)

```bash
cd frontend
npm install
```

### 4. Start the Frontend Development Server

```bash
npm run dev
```

The frontend will open at: **http://localhost:5173** (or the port shown in terminal)

---

## ✨ Implemented Features

### 1️⃣ Soft Delete for Posts

- Posts are **NOT removed** from `db.json` when deleted
- Instead, the `isDeleted` field is set to `true`
- Default value for new posts: `isDeleted: false`
- Soft-deleted posts are still returned by the API

**Implementation:**
```javascript
// DELETE /api/posts/:id
app.delete('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  post.isDeleted = true;  // Soft delete
  res.json({ message: 'Post soft deleted', post });
});
```

### 2️⃣ Display Soft-Deleted Posts

- Soft-deleted posts are displayed with **strikethrough text**
- Background color changes to indicate deleted status
- Badge shows "Deleted" status
- Visual distinction makes it clear which posts are deleted

**CSS Styling:**
```css
.deleted-text {
  text-decoration: line-through;
  color: #999;
}

.deleted-row {
  background-color: #fafafa;
}
```

### 3️⃣ Auto-Increment ID (String)

- IDs are stored as **strings** in `db.json`
- Client does **NOT** send ID when creating posts/comments
- Server automatically generates the next ID
- ID generation logic:
  1. Convert all existing IDs to numbers
  2. Find the maximum ID
  3. New ID = max ID + 1
  4. Store as string

**Implementation:**
```javascript
const generateId = (collection) => {
  const ids = collection.map(item => Number(item.id));
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return String(maxId + 1);
};

// Example: Existing IDs: ["1", "2", "5"] → New ID: "6"
```

### 4️⃣ Full CRUD for Comments

All CRUD operations are implemented for comments:

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| **Create** | POST | `/api/comments` | Create new comment (auto-ID) |
| **Read** | GET | `/api/posts/:postId/comments` | Get comments by postId |
| **Update** | PUT | `/api/comments/:id` | Update comment text |
| **Delete** | DELETE | `/api/comments/:id` | Delete comment (hard delete) |

**Comment Structure:**
```json
{
  "id": "1",
  "text": "This is a comment",
  "postId": "1"
}
```

---

## 📡 API Endpoints

### Posts API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts (including soft-deleted) |
| POST | `/api/posts` | Create new post (auto-generates ID) |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Soft delete post (sets isDeleted: true) |

### Comments API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts/:postId/comments` | Get all comments for a post |
| POST | `/api/comments` | Create new comment (auto-generates ID) |
| PUT | `/api/comments/:id` | Update comment |
| DELETE | `/api/comments/:id` | Delete comment (hard delete) |

---

## 🧪 Testing the Features

### Test Soft Delete

1. Open the frontend in browser
2. Click the "🗑️ Delete" button on any post
3. Confirm deletion
4. The post will show with strikethrough and "Deleted" badge
5. Check `backend/data/db.json` - the post still exists with `isDeleted: true`

### Test Auto-Increment ID

1. Create a new post using the form at the top
2. Check the console or `db.json` - the new post has ID = max(existing IDs) + 1
3. Create another post - ID increments correctly

### Test Comment CRUD

1. Click on any post in the table (row becomes highlighted)
2. The comment section appears below
3. **Create:** Type a comment and click "Add Comment"
4. **Read:** All comments for the selected post are displayed
5. **Update:** Click "Edit" on a comment, modify text, click "Save"
6. **Delete:** Click "Delete" on a comment, confirm deletion

---

## 📊 Database Structure (db.json)

```json
{
  "posts": [
    {
      "id": "1",
      "title": "First Post",
      "views": 100,
      "isDeleted": false
    },
    {
      "id": "2",
      "title": "Deleted Post",
      "views": 200,
      "isDeleted": true
    }
  ],
  "comments": [
    {
      "id": "1",
      "text": "Great post!",
      "postId": "1"
    },
    {
      "id": "2",
      "text": "Thanks for sharing",
      "postId": "1"
    }
  ],
  "profile": {
    "name": "typicode"
  }
}
```

---

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API requests
- **CSS3** - Styling

---

## 📝 Implementation Summary

### Requirement 1: Soft Delete ✅
- Implemented soft delete by setting `isDeleted: true`
- Posts remain in database
- DELETE endpoint updated to modify instead of remove

### Requirement 2: Display Soft-Deleted Posts ✅
- Soft-deleted posts shown with strikethrough
- Different background color and badge
- Clear visual distinction

### Requirement 3: Auto-Increment String IDs ✅
- Server generates IDs automatically
- IDs stored as strings
- Logic: find max ID, increment by 1

### Requirement 4: Full CRUD for Comments ✅
- Create: POST with auto-ID generation
- Read: GET by postId
- Update: PUT to modify text
- Delete: DELETE to remove comment

### Requirement 5: Documentation ✅
- README with student name and ID
- Instructions for running the project
- API endpoint documentation
- Feature explanations

---

## 🎯 Key Features

✅ Soft delete for posts (no data loss)  
✅ Visual distinction for deleted posts  
✅ Auto-increment string IDs  
✅ Full CRUD operations for posts  
✅ Full CRUD operations for comments  
✅ Interactive UI with post selection  
✅ Real-time updates after operations  
✅ Clean and responsive design  
✅ Error handling and user feedback  

---

## 📸 Usage Guide

1. **View Posts:** All posts are displayed in the table
2. **Create Post:** Use the form at the top to add new posts
3. **Delete Post:** Click the delete button (post becomes strikethrough)
4. **Select Post:** Click on any row to view its comments
5. **Manage Comments:** Add, edit, or delete comments in the comment section

---

## 🔧 Troubleshooting

**Backend won't start:**
- Make sure you're in the `backend` directory
- Run `npm install` first
- Check if port 5000 is available

**Frontend can't connect:**
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled in backend

**Changes not persisting:**
- Check `backend/data/db.json` file permissions
- Ensure server has write access

---

## 📚 Learning Outcomes

This project demonstrates:
- RESTful API design principles
- Soft delete pattern implementation
- Auto-increment ID generation
- Full CRUD operations
- Frontend-backend integration
- React state management
- Express middleware usage

---

**Project completed by:** Trần Thanh Hoài (2280601015)  
**Date:** January 2026

---

**Happy Coding! 🎉**
