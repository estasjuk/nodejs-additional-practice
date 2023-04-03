const { getTasksService, getTaskByIdService, addTaskService, updateTaskService, deleteTaskService } = require('../services/taskServices');

const getTasks = async (req, res, next) => {
    try {
    const tasks = await getTasksService();
    res.json({
    status: 'success',
    code: 200,
    data: {
      result: tasks,
    },
  });
  }
  catch(error) {
    next(error);
  }
}

const getTaskById = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const task = await getTaskByIdService(taskId);
        res.json({
        status: 'success',
        code: 200,
        data: {
         result: task,
        },
    });
    }
    catch(error) {
     next(error);
    }
    
}

const addTask = async (req, res, next) => {
     try {
        const addedTask = await addTaskService(req.body);
        res.json({
        status: 'success',
        code: 201,
        data: {
         data: addedTask,
        },
    });
    }
    catch(error) {
     next(error);
    }
}

const updateTask = async (req,res,next) => {
    try {
        const {taskId} = req.params;
        const updatedTask = await updateTaskService(taskId, req.body);
        res.json({
        status: 'success',
        code: 200,
        data: {
         data: updatedTask,
        },
    });
    }
    catch(error) {
     next(error);
    }
}

const deleteTask = async (req,res,next) => {
    try {
        const {taskId} = req.params;
        const deletedTask = await deleteTaskService(taskId);
        res.json({
        status: 'success',
        code: 200,
        data: {
         id: taskId,
        },
    });
    }
    catch(error) {
     next(error);
    }
}

module.exports = {
    getTasks,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
}