import express from 'express';
import { testing } from '../controllers/tournaments/testing.controller';

const router = express.Router();

router.post('/testing/:accId', testing);

export default router;
