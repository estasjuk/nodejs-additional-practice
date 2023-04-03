const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const { HttpError } = require('../utils/HttpError');

const db = path.join(process.cwd(), 'db', 'task.json');

const getTasksService = async () => { 
    const rawData = await fs.readFile(db);
    const parsedData = JSON.parse(rawData);
    return parsedData;
}

const getTaskByIdService = async (taskId) => {
    const tasks = await getTasksService();
    const task = tasks.find(task => task.id === taskId);
    if (!task) { 
        throw new HttpError(404, 'This task does not exist');
    }
    return task;
}

const addTaskService = async (body) => { 
    const tasks = await getTasksService();
    const newTask = {
        id: crypto.randomUUID(),
        title: body.title,
        completed: body.completed,
    }
    tasks.push(newTask);
    await fs.writeFile(db, JSON.stringify(tasks, null, 2))
    return newTask;
}

const updateTaskService = async (taskId, body) => { 
    const tasks = await getTasksService();
    const index = tasks.findIndex(task => task.id === taskId);
    if(index === -1) {
        throw new HttpError(404, 'This task does not exist');
    }
    tasks[index] = {id: taskId, ...body};
    await fs.writeFile(db, JSON.stringify(tasks, null, 2));
    return tasks[index];
}

const deleteTaskService = async (taskId) => { 
    const tasks = await getTasksService();
    const filteredTasks = tasks.filter(task => task.id !== taskId);
    if (tasks.length === filteredTasks.length) { 
        throw new HttpError(404, 'This task does not exist')
    }
    await fs.writeFile(db, JSON.stringify(filteredTasks, null, 2));
    return taskId;
}

module.exports = {
    getTasksService,
    getTaskByIdService,
    addTaskService,
    updateTaskService,
    deleteTaskService,
}