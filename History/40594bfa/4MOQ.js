import express from 'express';

import { verifyUser } from './../middleware/Verify.js';
import { getAllProducts, getProductByUUID } from '../controllers/Product.js';

const productRouter = express.Router();

productRouter.get('/products', verifyUser, getAllProducts)
productRouter.get('/product/:uuid',verifyUser,getProductByUUID)
productRouter.post('')
