// services/todo.service.js
const Todo = require('../models/todo.model');

exports.getAllTodos = async (query) => {
    return await Todo.find().sort({ createdAt: -1 });
};;
