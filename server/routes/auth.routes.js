import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', auth, isAdmin, register); // Only admin can register new users
router.post('/login', login);
router.get('/verify', auth, (req, res) => res.status(200).json({ valid: true }));

export default router;