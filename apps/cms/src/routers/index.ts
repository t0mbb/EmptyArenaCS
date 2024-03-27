import express from 'express';
import { createUser, updateUser , removeAccount ,listAccount ,findOneAccount , listRole } from '../controllers/account.controller';
import { login } from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();
// auth routes
router.use('/auth', login);

// user routes
router.use('/listAcc',verifyToken , listAccount);
router.use('/listRole',verifyToken, listRole);
router.use('/user/create', createUser);
router.use('/user/find/:userId',verifyToken,findOneAccount);
router.use('/user/update/:userId', verifyToken, updateUser);
router.use('/user/delete/:userId', verifyToken , removeAccount);




export default router;

