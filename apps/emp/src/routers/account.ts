import express from 'express';
import {
  createUser,
  updateUser,
  removeAccount,
  listAccount,
  findAccount,
  checkToken,
  rePassUser,
} from '../controllers/account/account.controller';
import { googleAuthCallback, googleAuth, login } from '../controllers/account/auth.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/account/account.model';


const router = express.Router();
// auth routes
router.post('/auth/login', login);
router.post('/register', createUser);

//
router.get('/getaccessToken' ,verifyToken, checkToken)

// user routes

router.get('/user/listAcc', verifyToken, authorization([RoleName.ADMIN]), listAccount);
router.post('/repass/:userId', verifyToken, authorization([RoleName.ADMIN]) ,rePassUser);
router.get('/user/find/:userId',verifyToken,authorization([RoleName.GUEST , RoleName.ADMIN]),findAccount)
router.put('/user/update/:userId', verifyToken,authorization([RoleName.GUEST , RoleName.ADMIN]), updateUser);
router.delete('/user/delete/:userId', verifyToken,authorization([RoleName.ADMIN]), removeAccount);
router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);

export default router;
