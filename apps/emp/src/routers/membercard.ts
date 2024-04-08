import express from 'express';
import {
  listMemberCard,
  createMemberCard,
updateMemberCard,
removeMemberCard,
findMemberCard} from '../controllers/membershipCards.controller';

import {
    listMemberType,
    createMemberType,
  updateMemberType,
  removeMemberType,
  findMemberType} from '../controllers/membershipTypes.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/account.model';

const router = express.Router();

// MemberCard routes
router.get('/listMemberCard/:memTypeId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), listMemberCard);

router.post('/createMemberCard', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), createMemberCard);

router.delete('/removeMemberCard/:cardId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), removeMemberCard);

router.get('/findMemberCard/:cardId', verifyToken, findMemberCard);
router.put('/updateMemberCard/:cardId', verifyToken,authorization([RoleName.ADMIN,RoleName.STAFF,]), updateMemberCard);

// MembershipTypes routes

router.get('/listMemberType', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), listMemberType);

router.post('/createMemberType', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), createMemberType);

router.delete('/removeMemberType/:memTypeId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), removeMemberType);

router.get('/findMemberType/:memTypeId', verifyToken, findMemberType);
router.put('/updateMemberType/:memTypeId', verifyToken,authorization([RoleName.ADMIN,RoleName.STAFF,]), updateMemberType);






export default router;
