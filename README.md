# ✅ Todo App — REST API

A clean, minimal REST API for managing todos, built with **Express.js** and **Mongoose**. Follows a layered architecture (routes → controllers → services → models) with no authentication or authorization — pure CRUD, done right.

---

## 📁 Folder Structure

```
todo-app/
│
├── server.js                        # Entry point — starts server and connects DB
├── package.json
├── .env.example
├── .gitignore
│
└── src/
    ├── app.js                       # Express app setup — middleware and route mounting
    │
    ├── config/
    │   ├── db.js                    # Mongoose connection logic
    │   ├── env.js                   # Centralised environment variable access
    │   └── constants.js             # Shared enums: PRIORITY, STATUS
    │
    ├── models/
    │   └── todo.model.js            # Todo schema — title, description, priority, status, dueDate
    │
    ├── routes/
    │   └── todo.routes.js           # Maps HTTP methods + paths to controller functions
    │
    ├── controllers/
    │   └── todo.controller.js       # Reads req → calls service → sends res
    │
    ├── services/
    │   └── todo.service.js          # Business logic and all Mongoose DB operations
    │
    ├── middlewares/
    │   ├── errorHandler.js          # Global error handler — catches next(error) calls
    │   └── notFound.js              # 404 fallback for unmatched routes
    │
    └── utils/
        ├── response.util.js         # Standardised sendSuccess / sendError helpers
        └── error.util.js            # createError(statusCode, message) factory
```

---

## 🗂️ Folder Responsibilities

### `server.js`
The single entry point. Calls `connectDB()` and starts the HTTP server on the configured port. Contains no business logic — just bootstrapping.

### `src/app.js`
Configures the Express application instance. Registers global middleware (helmet, cors, morgan, body parsers), mounts the todo routes, and registers the 404 and error handler middleware last.

### `src/config/`
The single source of truth for configuration. `env.js` centralises all `process.env` reads so no other file reaches into `process.env` directly. `constants.js` holds shared enums (`PRIORITY`, `STATUS`) used by both the model and the service.

### `src/models/`
Mongoose schema and compiled model for the `Todo` document. Defines field types, validation rules, enum constraints, and enables automatic `createdAt`/`updatedAt` timestamps. Models are intentionally "dumb" — no business logic lives here.

### `src/routes/`
Maps HTTP method + URL path combinations to their controller functions. Routes are thin by design — the only logic here is applying route-level middleware (none currently) and calling the correct controller method.

### `src/controllers/`
The layer between the route and the service. Each controller method reads from `req` (body, params, query), delegates all real work to the service layer, and sends back a standardised HTTP response via `sendSuccess`. All errors are forwarded to the global error handler via `next(error)`.

### `src/services/`
The brain of the application. Contains all business logic and every Mongoose database call. The service layer knows about models but knows nothing about `req` or `res` — it is completely decoupled from HTTP concerns, making it easy to test in isolation.

### `src/middlewares/`
Functions that intercept the request/response cycle at the Express level. `errorHandler.js` is the global catch-all for any error passed to `next(error)` — it handles Mongoose validation errors, bad ObjectId errors, and custom application errors. `notFound.js` returns a `404` for any unmatched route.

### `src/utils/`
Small, pure helper functions with no side effects. `response.util.js` provides `sendSuccess` and `sendError` to keep response shapes consistent across all controllers. `error.util.js` provides `createError` to build HTTP-aware errors that the global error handler understands.

---

## 🔌 API Endpoints

Base URL: `/api/todos`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos` | Fetch all todos |
| `POST` | `/api/todos` | Create a new todo |
| `GET` | `/api/todos/:id` | Fetch a single todo by ID |
| `PUT` | `/api/todos/:id` | Fully replace a todo |
| `PATCH` | `/api/todos/:id` | Partially update a todo |
| `DELETE` | `/api/todos/:id` | Delete a todo |
| `GET` | `/api/health` | Health check |

### Query Parameters (GET /api/todos)

| Param | Type | Example | Description |
|---|---|---|---|
| `completed` | Boolean | `?completed=true` | Filter by completion status |
| `priority` | String | `?priority=high` | Filter by priority (`low`, `medium`, `high`) |
| `status` | String | `?status=pending` | Filter by status (`pending`, `in_progress`, `completed`) |
| `sort` | String | `?sort=-createdAt` | Sort field (prefix `-` for descending) |

---

## 📄 Todo Schema

```js
{
  title:       String,   // required, max 100 chars
  description: String,   // optional, max 500 chars
  completed:   Boolean,  // default: false
  priority:    String,   // 'low' | 'medium' | 'high' — default: 'medium'
  status:      String,   // 'pending' | 'in_progress' | 'completed' — default: 'pending'
  dueDate:     Date,     // optional
  createdAt:   Date,     // auto-generated
  updatedAt:   Date,     // auto-generated
}
```

---

## 📡 Sample Requests & Responses

### Create a todo — `POST /api/todos`

**Request body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "high",
  "dueDate": "2025-12-31"
}
```

**Response `201`:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false,
    "priority": "high",
    "status": "pending",
    "dueDate": "2025-12-31T00:00:00.000Z",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Fetch all todos — `GET /api/todos?priority=high&completed=false`

**Response `200`:**
```json
{
  "success": true,
  "message": "Todos fetched successfully",
  "data": [ ...todos ]
}
```

### Error response (not found)

```json
{
  "success": false,
  "message": "Todo not found"
}
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/todo-app.git
cd todo-app

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
```

### Run the server

```bash
# Development (hot reload)
npm run dev

# Production
npm start
```

---

## 🔄 Request Lifecycle

```
HTTP Request
     │
     ▼
Middlewares (helmet, cors, morgan, body-parser)
     │
     ▼
Routes  →  todo.routes.js
     │
     ▼
Controllers  →  todo.controller.js   (reads req, sends res)
     │
     ▼
Services  →  todo.service.js         (business logic + DB calls)
     │
     ▼
Models  →  todo.model.js             (Mongoose + MongoDB)
     │
     ▼
HTTP Response
```

---

## 🧪 Scripts

```bash
npm run dev    # Start with nodemon (auto-restarts on file changes)
npm start      # Start in production mode
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `dotenv` | `.env` file loader |
| `cors` | Cross-origin resource sharing |
| `helmet` | Sets secure HTTP headers |
| `morgan` | HTTP request logger |
| `nodemon` *(dev)* | Auto-restart on file changes |

---

## 📄 License

MIT