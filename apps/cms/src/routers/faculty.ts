import express from 'express';
import { listFaculty, createFaculty , updateFaculty ,removeFaculty ,findOneFaculty } from '../controllers/faculty.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// contribution routes
router.use('/listFac',verifyToken , listFaculty)
router.use('/createFaculty', verifyToken, createFaculty);
router.use('/fac/find/:fac',verifyToken,updateFaculty);
router.use('/fac/update/:facId', verifyToken, removeFaculty);
router.use('/fac/delete/:facId', verifyToken , findOneFaculty);

export default router;

