import express from 'express';
import {
  createArticle,
  getArticleByTitle,
  getArticles,
  updateArticle,
} from '../controllers/Article.js';
import { verifyUser } from '../middleware/Verify.js';

const articleRouter = express.Router();

articleRouter.post('/article/create', verifyUser, createArticle);
articleRouter.patch('/article/update/:title', verifyUser, updateArticle);
articleRouter.get('/:title', verifyUser, getArticleByTitle);
articleRouter.get('/articles', verifyUser, getArticles);

export default articleRouter;
