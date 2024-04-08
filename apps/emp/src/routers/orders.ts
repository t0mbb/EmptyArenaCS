import express from 'express';
import {
  listOrder,
  createOrder,
  updateOrder,
removeOrder,
findOrder} from '../controllers/orders.controller';

import {
  listOrderItem,
  createOrderItem,
  updateOrderItem,
removeOrderItem,
findOrderItem} from '../controllers/orders.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/account.model';

const router = express.Router();

// Order routes
router.get('/listOrder', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), listOrder);

router.post('/createOrder', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), createOrder);

router.delete('/removeOrder/:orderId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), removeOrder);

router.get('/findOrder/:orderId', verifyToken, findOrder);
router.put('/updateOrder/:orderId', verifyToken,authorization([RoleName.ADMIN,RoleName.STAFF,]), updateOrder);

//Order Item Routes
router.get('/listOrderItem', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), listOrderItem);

router.post('/createOrderItem', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), createOrderItem);

router.delete('/removeOrderItem/:orderItemId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), removeOrderItem);

router.get('/findOrderItem/:orderItemId', verifyToken, findOrderItem);
router.put('/updateOrderItem/:orderItemId', verifyToken,authorization([RoleName.ADMIN,RoleName.STAFF,]), updateOrderItem);


export default router;
