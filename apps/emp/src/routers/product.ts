import express from 'express';
import {
  listProduct,
  createProduct,
  updateProduct,
  removeProduct,
  findProduct} from '../controllers/product.controller';

  import {
    listCategory,
    createCategory,
    updateCategory,
    findCategory,
    removeCategory} from '../controllers/product.controller';
import { authorization, verifyToken } from '../middlewares/auth';
import { RoleName } from '../models/account.model';

const router = express.Router();

// product routes
router.get('/listProduct/:categoryId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), listProduct);

router.post('/createProduct', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), createProduct);

router.delete('/removeProduct/:productId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), removeProduct);

router.get('/findProduct/:productId', verifyToken, findProduct);
router.put('/updateProduct/:productId', verifyToken,authorization([RoleName.ADMIN]), updateProduct);


// Category routes

router.get('/listCategory', verifyToken,  listCategory);

router.post('/createCategory', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), createCategory);

router.delete('/removeCategory/:categoryId', verifyToken, authorization([RoleName.ADMIN,RoleName.STAFF,]), removeCategory);

router.get('/findCategory/:categoryId', verifyToken, findCategory);
router.put('/updateCategory/:categoryId', verifyToken,authorization([RoleName.ADMIN]), updateCategory);

export default router;

