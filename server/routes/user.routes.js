import express from 'express';
import { getAllUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, isAdmin, getAllUsers);
router.patch('/:id', auth, updateUser);
router.delete('/:id', auth, isAdmin, deleteUser);

export default router;