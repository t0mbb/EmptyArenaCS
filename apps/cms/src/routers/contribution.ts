import express from 'express';
import { listContribution,
     createContribution , 
     updateContribution
      ,removeContribution 
      ,findContribution } from '../controllers/contribution.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/role.model';

const router = express.Router();

// contribution routes
router.get('/listCon',verifyToken ,authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                       ,RoleName.MARKETING_COORDINATOR]),listContribution)

router.post('/createCon', verifyToken,authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                       ,RoleName.MARKETING_COORDINATOR ,RoleName.STUDENT]), createContribution);
                                                      
router.get('/con/find/:conId',verifyToken , authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                            ,RoleName.MARKETING_COORDINATOR,RoleName.STUDENT]), findContribution);

router.post('/con/update/:conId', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                            ,RoleName.MARKETING_COORDINATOR,RoleName.STUDENT]), updateContribution);

router.delete('/con/delete/:conId', verifyToken, authorization([RoleName.MARKETING_MANAGER,RoleName.ADMIN
                                                            ,RoleName.MARKETING_COORDINATOR,RoleName.STUDENT]) , removeContribution);

export default router;

