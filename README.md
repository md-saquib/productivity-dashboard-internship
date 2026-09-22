# 🚀 AI-Powered Project & Task Management Platform (DevFlow)

> **Task 4 Capstone Deliverable** — A full-stack, real-time, AI-driven engineering productivity and project management platform.

---

## 🌟 Overview

**DevFlow** brings together full-stack authentication, dynamic dashboard analytics, full CRUD project and task management, real-time WebSocket communication, and Google Gemini AI features to help software engineering teams boost delivery velocity.

---

## 📸 Key Features & Architecture

### 1. 🔐 Authentication & Security
- User registration and login with bcrypt password hashing
- HttpOnly JWT cookie-based session management
- Protected and role-based client routing (`ProtectedRoute`, `RoleBasedRoute`)
- User profile management with department, role, and workspace details

### 2. 📊 Dynamic Real-Time Dashboard
- **Live Stat Cards**: Active Projects, Tasks Completed, Pending Reviews, and Weekly Productivity
- **Progress Tracking**: Real-time project progress bars and completion percentages
- **Active Projects Overview**: Status-aware badges, repo links, and tech stack tags
- **Priority Tasks List**: Filtered high-priority and critical items
- **Live Recent Activity Feed**: Unified activity stream tracking project & task creations, updates, and completions with relative timestamps (`2m ago`, `1h ago`)
- **WebSocket Real-Time Sync**: Instant UI updates powered by Socket.io across all tabs without manual refresh

### 3. 📁 Comprehensive Project Management (Full CRUD)
- **Create**: Add new projects with name, repo URL, team leads, visibility, status, and tech stack
- **View Details**: Interactive modal displaying owner, team leads, progress, repo, and all linked tasks
- **Edit**: Update project details, status, visibility, progress slider, and technologies
- **Delete**: Remove projects with safe confirmation dialogs
- **Search & Filter**: Filter projects by status, technology tags, and search query

### 4. ✅ Task Management & Kanban Flow
- **Create & Assign**: Launch tasks linked to specific projects with category, priority, and due date
- **Status Progression**: Quick dropdown status switcher across `todo`, `in-progress`, `review`, and `done`
- **Edit & Delete**: Instant in-place modals for task updates and deletions
- **Search & Filter**: Dynamic multi-criteria filtering by status, priority, and text search

### 5. 🧠 AI-Powered Capabilities (Google Gemini 2.5 Flash)
- **AI Productivity Suggestions**: Analyzes real-time project health, bottlenecks, and review queues, producing actionable recommendations displayed directly on the dashboard
- **AI-Assisted Task Generation**: Enter a brief idea (e.g., *"Setup Redis caching for user tasks"*), and Gemini automatically generates the technical title, comprehensive description with acceptance criteria, category, and priority

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS, Redux Toolkit, React Router v7, Lucide Icons |
| **Backend** | Node.js, Express.js v5, Socket.io, Mongoose (MongoDB Atlas), JWT, bcryptjs |
| **Real-Time** | Socket.io (bi-directional WebSocket events with room-targeted pushes) |
| **AI Engine** | Google Gemini API (`gemini-2.5-flash` via `@google/generative-ai`) |
| **Deployment** | Vercel / Netlify (Frontend), Render / Railway (Backend), MongoDB Atlas (Database) |

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- Google Gemini API key ([aistudio.google.com](https://aistudio.google.com))

---

### 1. Backend Setup

```bash
cd server
npm install

# Configure environment variables
cp .env.example .env
```

Edit `server/.env`:
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
ACCESS_TOKEN_SECERET_KEY=your_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key
CLIENT_ORIGIN=http://localhost:5173
```

Start the server:
```bash
npm run dev
# → Server + Socket.io live on port 3000
```

---

### 2. Frontend Setup

```bash
cd client
npm install

# Configure environment variables (optional for local dev)
cp .env.example .env
```

Start the Vite development server:
```bash
npm run dev
# → Local development server at http://localhost:5173
```

---

## 🌐 Production Deployment Guide

### Deploy Backend (Render / Railway)
1. Push this repository to GitHub.
2. Create a new **Web Service** on Render or Railway pointing to the `server/` directory.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add Environment Variables:
   - `MONGO_URI`
   - `PORT=3000`
   - `ACCESS_TOKEN_SECERET_KEY`
   - `GEMINI_API_KEY`
   - `CLIENT_ORIGIN=https://your-frontend-domain.vercel.app`

### Deploy Frontend (Vercel / Netlify)
1. Import the repository into Vercel or Netlify pointing to the `client/` root.
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add Environment Variables:
   - `VITE_API_BASE_URL=https://your-backend-domain.onrender.com`
   - `VITE_SOCKET_URL=https://your-backend-domain.onrender.com`

---

## 📝 Capstone Submission Checklist

- [x] **GitHub Repository**: Complete code with commit history and documentation
- [x] **Authentication**: Register, Login, Logout, Protected Routes
- [x] **Dashboard**: Overview, Statistics, Progress Tracking, Recent Activity Feed
- [x] **Project Management**: Create, Edit, Delete, View Project Details
- [x] **Task Management**: Create, Update Status, Priority, Due Date, Search & Filter
- [x] **AI Features**: Gemini Productivity Suggestions + AI-Assisted Task Generator
- [x] **Real-time Synchronization**: Socket.io push events on all data mutations
