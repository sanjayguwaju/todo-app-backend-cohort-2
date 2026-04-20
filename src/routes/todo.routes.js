// routes/todo.routes.js
const express = require('express');

const todoController = require('../controllers/todo.controller');
const router = express.Router();

// GET    http://localhost:8081/api/todos       — fetch all todos (supports ?completed=true, ?priority=high, ?status=pending)
// POST   http://localhost:8081/api/todos       — create a new todo
// GET    http://localhost:8081/api/todos/:id   — fetch a single todo by ID
// PUT    http://localhost:8081/api/todos/:id   — fully replace a todo
// PATCH  http://localhost:8081/api/todos/:id   — partially update a todo
// DELETE http://localhost:8081/api/todos/:id   — delete a todo

// GET getAllTodos
router.get('/', todoController.getAllTodos);

// POST createTodo

// GET getTodoById

// PUT updateTodo

// PATCH patchTodo

// DELETE deleteTodo


module.exports = router;