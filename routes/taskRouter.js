const express = require('express');
const {getTasks, getTaskById, addTask, updateTask, deleteTask} = require('../controllers/taskControllers');

const router = express.Router();
router.route('/').get(getTasks).post(addTask);
router.route('/:taskId').get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = {
    taskRouter: router,
}