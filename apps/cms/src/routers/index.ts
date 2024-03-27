import express from 'express';
import {
  createUser,
  updateUser,
  removeAccount,
  listAccount,
  findAccount,
  listRole,
} from '../controllers/account.controller';
import { login } from '../controllers/auth.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';

const router = express.Router();
// auth routes
router.post('/auth', login);

// user routes
router.get('/listAcc', verifyToken, listAccount);
router.get('/listRole', verifyToken, authorization([RoleName.ADMIN]), listRole);
router.post('/user/create', createUser);
router.get('/user/find/:userId', verifyToken, findAccount);
router.put('/user/update/:userId', verifyToken, updateUser);
router.delete('/user/delete/:userId', verifyToken, removeAccount);

export default router;
