const express = require('express');
const {taskRouter} = require('./routes/taskRouter')

const app = express();

app.use('/tasks', taskRouter);

module.exports = {
    app,
}