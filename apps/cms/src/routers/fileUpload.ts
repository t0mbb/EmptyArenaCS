import express from 'express';
import { uploadFile, downloadFile } from '../controllers/fileUpload.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';
import multer from 'multer';

const router = express.Router();
const upload = multer();


router.post(
  '/con/updateFile',
  upload.single('file'),
  uploadFile
);

router.post('/con/downloadFile' ,downloadFile)
export default router;
