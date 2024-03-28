import express from 'express';
import { uploadFile , createBlob} from '../controllers/fileUpload.controller'
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';

const router = express.Router();

router.get('/con/createBlob', createBlob )   
router.post('/con/updateFile/', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN,
                                                             RoleName.MARKETING_COORDINATOR, RoleName.STUDENT]), uploadFile )   
export default router;