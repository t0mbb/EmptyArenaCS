import express from 'express';
import { uploadFile, createBlob } from '../controllers/fileUpload.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.get('/con/createBlob', createBlob);
router.post(
  '/con/updateFile',
  verifyToken,
  authorization([
    RoleName.MARKETING_MANAGER,
    RoleName.ADMIN,
    RoleName.MARKETING_COORDINATOR,
    RoleName.STUDENT,
  ]),
  upload.single('file'),
  uploadFile
);
export default router;
