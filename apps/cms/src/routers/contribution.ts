import express from 'express';
import { listContribution, createContribution , updateContribution ,removeContribution ,findOneContribution } from '../controllers/contribution.controller';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// contribution routes
router.use('/listCon',verifyToken , listContribution)
router.use('/createCon', verifyToken, createContribution);
router.use('/con/find/:conId',verifyToken,updateContribution);
router.use('/con/update/:conId', verifyToken, removeContribution);
router.use('/con/delete/:conId', verifyToken , findOneContribution);

export default router;

