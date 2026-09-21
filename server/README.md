# 🚀 Productivity Dashboard — Backend API

A RESTful API built with **Node.js**, **Express.js**, and **MongoDB (Mongoose)** powering user management, project organisation, and task tracking for the Productivity Dashboard platform.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Documentation (Swagger UI)](#-api-documentation-swagger-ui)
- [API Reference](#-api-reference)
  - [Authentication](#authentication-apiauthbase)
  - [Projects](#projects-apiprojectbase)
  - [Tasks](#tasks-apitaskbase)
- [Data Models](#-data-models)
- [Error Handling](#-error-handling)
- [HTTP Status Codes](#-http-status-codes)
- [Authentication Flow](#-authentication-flow)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB Atlas via Mongoose |
| Authentication | JWT (cookie-based) |
| Password Hashing | bcryptjs |
| API Docs | Swagger UI (swagger-jsdoc + swagger-ui-express) |
| Config | dotenv |

---

## ⚡ Getting Started

### 1. Clone & Install

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server/` directory (see [Environment Variables](#-environment-variables) below).

### 3. Run the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

The server starts on **`http://localhost:3000`** by default.


## 🔐 Environment Variables

Create `server/.env` with the following keys:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
PORT=3000
ACCESS_TOKEN_SECERET_KEY=your_super_secret_jwt_key_here
```

| Variable | Description | Required |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | ✅ |
| `PORT` | Port the server listens on | ✅ |
| `ACCESS_TOKEN_SECERET_KEY` | Secret key for signing JWT tokens | ✅ |

> ⚠️ **Never commit `.env` to version control.** It is already listed in `.gitignore`.

---

## 📁 Project Structure

```
server/
├── server.js                  # Entry point — connects DB and starts server
└── src/
    ├── app.js                 # Express app setup, middleware, routes, error handler
    ├── config/
    │   ├── config.js          # Reads env variables into a config object
    │   ├── db.js              # Mongoose connection
    │   └── swagger.js         # OpenAPI 3.0 spec (used by Swagger UI)
    ├── Routes/
    │   ├── authRoutes.js      # POST /register, POST /login, GET /logout, GET /me
    │   ├── projectRoutes.js   # POST /createProject, GET /getAllprojects, GET /:id
    │   └── taskRoutes.js      # POST /createTask, GET /getAllTask, PATCH, DELETE
    ├── controller/
    │   ├── AuthController.js
    │   ├── ProjectController.js
    │   └── TaskController.js
    ├── middleware/
    │   └── authenticate.me.js # JWT cookie verification middleware
    └── model/
        ├── register.model.js  # User schema
        ├── project.model.js   # Project schema
        └── task.model.js      # Task schema
```

---



## 📡 API Reference

> **Base URL:** `http://localhost:3000`  
> **Auth:** Protected routes require a valid `token` cookie. Set via `POST /api/auth/login`.

---

### Authentication (`/api/auth` base)

#### `POST /api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "role": "Developer",
  "password": "securePass123",
  "department": "Engineering"
}
```

**Response `201 Created`:**
```json
{
  "message": "Register Successfull",
  "user": { "id": "...", "fullName": "John Doe", "email": "john@example.com", "role": "Developer", "department": "Engineering" },
  "token": "<jwt>"
}
```

| Error | Code |
|---|---|
| Email already in use | `400` |
| Invalid email format | `400` |
| Server error | `500` |

---

#### `POST /api/auth/login`
Authenticate with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePass123",
  "rememberMe": true
}
```

**Response `200 OK`:**
```json
{
  "message": "Login Successfull",
  "user": { "id": "...", "fullName": "John Doe", "email": "john@example.com", "role": "Developer", "department": "Engineering" }
}
```

> When `rememberMe: true`, a `token` cookie is set.

| Error | Code |
|---|---|
| User not found | `401` |
| Wrong password | `401` |

---

#### `GET /api/auth/logout`
Clear the session cookie.

**Response `200 OK`:**
```json
{ "message": "Logout Successfull", "user": null }
```

---

#### `GET /api/auth/me` 🔒
Get the currently authenticated user's profile.

**Response `200 OK`:**
```json
{
  "message": "Hydrate Successfull",
  "user": { "id": "...", "fullName": "John Doe", "email": "john@example.com", "role": "Developer", "department": "Engineering" }
}
```

| Error | Code |
|---|---|
| No / invalid token | `401` |

---

### Projects (`/api/project` base)

#### `POST /api/project/createProject` 🔒
Create a new project. The authenticated user becomes the owner.

**Request Body:**
```json
{
  "projectName": "Productivity Dashboard",
  "repoUrl": "https://github.com/user/project",
  "teamLeads": ["Alice", "Bob"],
  "techStack": ["React", "Node.js", "MongoDB"],
  "visibility": "public"
}
```

| Field | Type | Rules |
|---|---|---|
| `projectName` | String | required, 2–100 chars |
| `repoUrl` | String | required, valid `http(s)://` URL |
| `teamLeads` | String[] | required |
| `techStack` | String[] | required, min 1 item |
| `visibility` | String | required, `"public"` or `"private"` |

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Project created successfully",
  "data": { "_id": "...", "projectName": "Productivity Dashboard", "status": "Active", ... }
}
```

---

#### `GET /api/project/getAllprojects`
List all projects (public endpoint).

**Response `200 OK`:**
```json
{
  "success": true,
  "count": 3,
  "data": [ { "_id": "...", "projectName": "...", "userId": { "fullName": "...", "email": "..." }, ... } ]
}
```

---

#### `GET /api/project/userRelatedProjects` 🔒
List only the projects owned by the authenticated user.

**Response `200 OK`:**
```json
{ "success": true, "count": 1, "data": [ { ... } ] }
```

---

#### `GET /api/project/:projectId`
Get a single project by its MongoDB ID.

**Response `200 OK`:**
```json
{ "success": true, "data": { "_id": "...", "projectName": "...", ... } }
```

| Error | Code |
|---|---|
| Project not found | `404` |

---

### Tasks (`/api/task` base)

#### `POST /api/task/createTask` 🔒
Create a task under a specific project.

**Request Body:**
```json
{
  "title": "Build login page",
  "description": "Create a responsive login page with form validation",
  "category": "Frontend Development",
  "priority": "High",
  "dueDate": "2026-10-01",
  "projectId": "<project_id>",
  "status": "todo"
}
```

| Field | Type | Rules |
|---|---|---|
| `title` | String | required |
| `description` | String | required |
| `category` | String | required |
| `priority` | String | required |
| `dueDate` | String | required |
| `projectId` | ObjectId | required, must reference a valid project |
| `status` | String | required, enum: `todo \| in-progress \| review \| done` |

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "successfully created Task",
  "data": { "_id": "...", "title": "Build login page", "status": "todo", ... }
}
```

---

#### `GET /api/task/getAllTask` 🔒
Get all tasks owned by the authenticated user (project and user info populated).

**Response `200 OK`:**
```json
{
  "success": true,
  "message": "Task fetched successfully...",
  "data": [
    {
      "_id": "...",
      "title": "Build login page",
      "projectId": { "_id": "...", "projectName": "Productivity Dashboard" },
      "userId": { "_id": "...", "fullName": "John Doe" },
      "status": "todo"
    }
  ]
}
```

---

#### `PATCH /api/task/updateTask/:taskId/status` 🔒
Update the status of a task. Only the task owner can update.

**Request Body:**
```json
{ "status": "in-progress" }
```

**Valid Status Lifecycle:**
```
todo  →  in-progress  →  review  →  done
```

**Response `200 OK`:**
```json
{ "success": true, "message": "Status update successfully..", "data": { ... } }
```

| Error | Code |
|---|---|
| Missing `status` field | `400` |
| Task not found / not owner | `404` |

---

#### `PATCH /api/task/updateTask/:taskId` 🔒
Update any task fields (title, description, category, priority, dueDate).

**Request Body** *(all fields optional, send only what you want to change)*:
```json
{
  "title": "Updated title",
  "priority": "Low"
}
```

**Response `200 OK`:**
```json
{ "success": true, "message": "Successfully Update Task", "data": { ... } }
```

---

#### `DELETE /api/task/deleteTask/:taskId` 🔒
Permanently delete a task.

**Response `200 OK`:**
```json
{ "success": true, "message": "Task deleted successfully", "deletedTaskId": "..." }
```

| Error | Code |
|---|---|
| Task not found | `404` |

---

## 🗃 Data Models

### User

| Field | Type | Constraints |
|---|---|---|
| `fullName` | String | required |
| `email` | String | required, unique, valid email format |
| `role` | String | required |
| `password` | String | required, bcrypt-hashed |
| `department` | String | required |

### Project

| Field | Type | Constraints |
|---|---|---|
| `projectName` | String | required, 2–100 chars |
| `repoUrl` | String | required, valid URL |
| `teamLeads` | String[] | required |
| `techStack` | String[] | required, min 1 item |
| `visibility` | String | enum: `public` \| `private` |
| `status` | String | enum: `Not Started` \| `Active` \| `Pending` \| `On Hold` \| `Completed` |
| `userId` | ObjectId | ref: `User`, required |
| `createdAt` | Date | auto |
| `updatedAt` | Date | auto |

### Task

| Field | Type | Constraints |
|---|---|---|
| `title` | String | required |
| `description` | String | required |
| `category` | String | required |
| `priority` | String | required |
| `dueDate` | String | required |
| `projectId` | ObjectId | ref: `Project`, required |
| `userId` | ObjectId | ref: `User`, required |
| `status` | String | enum: `todo` \| `in-progress` \| `review` \| `done` |

---

## ⚠️ Error Handling

All errors return a consistent JSON structure:

```json
{
  "success": false,
  "message": "Human-readable error description",
  "error": "Technical detail (development only)"
}
```

A **centralized error-handling middleware** in `app.js` catches any unhandled exceptions not caught by individual controllers, ensuring no request ever returns an empty response or an HTML stack trace.

---

## 📊 HTTP Status Codes

| Code | Meaning | When Used |
|---|---|---|
| `200 OK` | Success | Read and update operations |
| `201 Created` | Resource created | Successful POST (user, project, task) |
| `400 Bad Request` | Validation failure | Missing fields, invalid email, duplicate user |
| `401 Unauthorized` | Auth failure | Missing/invalid token, wrong credentials |
| `404 Not Found` | Resource missing | Task or project ID doesn't exist |
| `500 Internal Server Error` | Server-side failure | Caught by centralized error middleware |

---

## 🔑 Authentication Flow

```
Client                         Server
  │                               │
  │── POST /api/auth/register ──▶ │  Creates user, hashes password
  │◀─ 201 + token cookie ──────── │  Sets JWT in HTTP cookie
  │                               │
  │── POST /api/auth/login ─────▶ │  Verifies credentials
  │◀─ 200 + token cookie ──────── │  Sets JWT cookie (if rememberMe)
  │                               │
  │── GET /api/project/... ─────▶ │  Cookie sent automatically
  │   (cookie: token=<jwt>)       │  authenticateMe middleware verifies
  │◀─ 200 + data ──────────────── │  req.user populated, controller runs
  │                               │
  │── GET /api/auth/logout ─────▶ │  Clears cookie
  │◀─ 200 ──────────────────────  │
```

> 🔒 = Endpoint requires a valid `token` cookie (set via login or register).
#   p r o d u c t i v i t y - d a s h b o a r d - R e s t - A p i - T a s k - 2  
 