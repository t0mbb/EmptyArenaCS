import express from 'express';

import { login } from '../controllers/account/auth.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/account/account.model';
import { listOppoments} from '../controllers/match/schedule.controller';


const router = express.Router();


router.get('/match/listOppo/:accId', verifyToken, authorization([RoleName.GUEST ,RoleName.ADMIN]), listOppoments);


export default router;
