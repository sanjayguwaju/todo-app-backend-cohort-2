// controllers/todo.controller.js
const todoService = require('../services/todo.service');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos(req.query);
    res.status(200).json({ success: true, count: todos.length, data: todos });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

