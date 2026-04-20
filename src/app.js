const express = require('express');

const todoRouter = require('./routes/todo.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/api/todos', todoRouter);

// Health check



module.exports = app;