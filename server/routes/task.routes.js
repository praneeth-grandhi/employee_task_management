import express from 'express';
import { createTask, getTasks, updateTaskStatus, deleteTask } from '../controllers/task.controller.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, isAdmin, createTask);
router.get('/', auth, getTasks);
router.patch('/:id/status', auth, updateTaskStatus);
router.delete('/:id', auth, isAdmin, deleteTask);

export default router;