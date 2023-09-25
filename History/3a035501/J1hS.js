import express from 'express';
import { createArticle, updateArticle } from '../controllers/Article.js';
import { verifyUser } from '../middleware/Verify.js';

const articleRouter = express.Router();

articleRouter.post('/article/create', verifyUser, createArticle);
articleRouter.patch('/article/:tittle', verifyUser, updateArticle);

export default articleRouter;
