import express from 'express';

import { verifyUser } from './../middleware/Verify.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByUUID,
  updateProduct,
} from '../controllers/Product.js';

const productRouter = express.Router();

productRouter.get('/products', verifyUser, getAllProducts);
productRouter.get('/product/:uuid', verifyUser, getProductByUUID);
productRouter.post('/product/create', verifyUser, createProduct);
productRouter.patch('/product/:uuid', verifyUser, updateProduct);
productRouter.delete('/product/:uuid', verifyUser, deleteProduct);

//public non auth required (tanpa perlu auth)
productRouter.get('/publicproducts')
