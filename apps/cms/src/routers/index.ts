import express from 'express';
import { createUser, updateUser } from '../controllers/account.controller';
import { login } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// user routes
router.use('/user/create', verifyToken, createUser);
router.use('/user/update/:userId', verifyToken, updateUser);

// auth routes
router.use('/auth', login);

export default router;

