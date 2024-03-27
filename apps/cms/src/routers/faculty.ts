import express from 'express';
import { listFaculty, createFaculty , updateFaculty ,removeFaculty ,findFaculty } from '../controllers/faculty.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';

const router = express.Router();

// contribution routes
router.use('/listFac',verifyToken ,authorization([RoleName.MARKETING_MANAGER, RoleName.ADMIN , RoleName.MARKETING_COORDINATOR]) ,listFaculty)
router.use('/createFaculty', verifyToken,authorization([ RoleName.ADMIN , RoleName.MARKETING_COORDINATOR]), createFaculty);
router.use('/fac/find/:fac',verifyToken,authorization([ RoleName.ADMIN , RoleName.MARKETING_COORDINATOR]),findFaculty);
router.use('/fac/update/:facId', verifyToken,authorization([ RoleName.ADMIN , RoleName.MARKETING_COORDINATOR]), updateFaculty);
router.use('/fac/delete/:facId', verifyToken , authorization([ RoleName.ADMIN , RoleName.MARKETING_COORDINATOR]),removeFaculty);

export default router;

