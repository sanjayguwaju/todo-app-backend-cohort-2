// services/todo.service.js
const Todo = require('../models/todo.model');

exports.getAllTodos = async (query) => {
  const filter = {};
  if (query.completed) filter.completed = query.completed === 'true';
  if (query.priority)  filter.priority  = query.priority;
  if (query.status)    filter.status     = query.status;

  return await Todo.find(filter).sort({ createdAt: -1 });
};

exports.createTodo = async (data) => {
  return await Todo.create(data);
};

exports.getTodoById = async (id) => {
  return await Todo.findById(id);
};

exports.updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
};

exports.patchTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, { $set: data }, {
    new: true,
    runValidators: true,
  });
};

exports.deleteTodo = async (id) => {
  return await Todo.findByIdAndDelete(id);
};