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

router.get('/',        todoController.getAllTodos);
router.post('/',       todoController.createTodo);
router.get('/:id',     todoController.getTodoById);
router.put('/:id',     todoController.updateTodo);
router.patch('/:id',   todoController.patchTodo);
router.delete('/:id',  todoController.deleteTodo);

module.exports = router;