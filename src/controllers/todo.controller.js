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

exports.createTodo = async (req, res) => {
  try {
    const todo = await todoService.createTodo(req.body);
    res.status(201).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid data', error: err.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await todoService.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid data', error: err.message });
  }
};

exports.patchTodo = async (req, res) => {
  try {
    const todo = await todoService.patchTodo(req.params.id, req.body);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid data', error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await todoService.deleteTodo(req.params.id);
    if (!todo) return res.status(404).json({ success: false, message: 'Todo not found' });
    res.status(200).json({ success: true, message: 'Todo deleted', data: {} });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};