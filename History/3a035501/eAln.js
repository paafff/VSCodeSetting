import express from 'express';
import { createArticle, getArticleByTitle, updateArticle } from '../controllers/Article.js';
import { verifyUser } from '../middleware/Verify.js';

const articleRouter = express.Router();

articleRouter.post('/article/create', verifyUser, createArticle);
articleRouter.patch('/article/update/:title', verifyUser, updateArticle);
articleRouter.get('/article/:title', verifyUser, getArticleByTitle);

export default articleRouter;
