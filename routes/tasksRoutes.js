import { Router } from 'express';
import { 
    getAllTasks,
    createTask,
    deleteTask,
    updateTask,
    getTask
 } from '../controllers/tasksController.js';

const router = Router();

router.route('/')
    .get(getAllTasks)
    .post(createTask)

router.route('/:id')
    .get(getTask)
    .delete(deleteTask)
    .put(updateTask)

export default router;