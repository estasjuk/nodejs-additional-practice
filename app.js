const express = require('express');
const {taskRouter} = require('./routes/taskRouter');
const { errorHandler } = require('./middlewares/ErrorHandler');

const app = express();

app.use(express.json());

app.use('/tasks', taskRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use(errorHandler);

module.exports = {
    app,
}