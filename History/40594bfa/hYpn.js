import express from 'express';

import { verifyUser } from './../middleware/Verify.js';

const productRouter = express.Router();

productRouter.get('/products')
