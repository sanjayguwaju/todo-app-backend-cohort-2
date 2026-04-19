const express = require('express');

const todoRouter = require('./routes/todo.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json(
    { 
      status: 'ok', 
      message: 'Server is running yyyyyy' 
    }
  );
});


module.exports = app;