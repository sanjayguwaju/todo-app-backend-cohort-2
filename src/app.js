const express = require('express');
const todoRouter = require('./routes/todo.routes');

const app = express(); // Aba ma yeha bata server banauna suru garxu

// Express le deko middleware jasle haamilai body bhitra bhako kura parse garna help garxa or json format ma dina help garxa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todoRouter);

// Health check chai server ma bhako api le kaam gareko xa ki nai bhanera check garna lai matrai ho
app.get('/api/health', (req, res) => {
    res.status(200).json(
        {
            status: "ok",
            message: " haamile health api banayeu",
            haveWelearnedApi: true
        }
    )
})

module.exports = app;