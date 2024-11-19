import express from 'express';

import { login } from '../controllers/account/auth.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/account/account.model';
import { createRank, findRank, listRank, updateRank } from '../controllers/account/rank.controller';


const router = express.Router();


router.get('/rank/listRank', verifyToken, authorization([RoleName.ADMIN]), listRank);
router.post('/rank/create',verifyToken,authorization([RoleName.ADMIN]),createRank)
router.get('/rank/find/:rankId',verifyToken,authorization([RoleName.ADMIN]),findRank)
router.put('/rank/update/:rankId', verifyToken,authorization([RoleName.ADMIN]), updateRank);

export default router;
