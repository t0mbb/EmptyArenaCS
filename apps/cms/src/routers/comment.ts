import express from 'express';
import {
  listComment,
  createComment,
  removeComment
} from '../controllers/comment.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';

const router = express.Router();

// contribution routes
router.use('/listComment', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN,
                                                      RoleName.MARKETING_COORDINATOR, RoleName.STUDENT]), listComment);

router.use('/createComment', verifyToken, authorization([RoleName.MARKETING_MANAGER, RoleName.ADMIN
                                                      , RoleName.MARKETING_COORDINATOR, RoleName.STUDENT]), createComment);

router.use('/removeComment/comId', verifyToken, authorization([RoleName.MARKETING_MANAGER, RoleName.ADMIN
                                                            , RoleName.MARKETING_COORDINATOR, RoleName.STUDENT]), removeComment);
export default router;

