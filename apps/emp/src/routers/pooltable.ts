import express from 'express';
import {
      listPoolTable,
      createPoolTable,
      updatePoolTable,
      removePoolTable,
      findPoolTable} from '../controllers/pool_table.controller';


import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/account.model';

const router = express.Router();

// PoolTable routes
router.get('/listPoolTable', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), listPoolTable);

router.post('/createPoolTable', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), createPoolTable);

router.delete('/removePoolTable/:pool_TableId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), removePoolTable);

router.get('/findPoolTable/:pool_TableId', verifyToken, findPoolTable);
router.put('/updatePoolTable/:pool_TableId', verifyToken,authorization([RoleName.ADMIN,RoleName.STAFF,]), updatePoolTable);




export default router;
