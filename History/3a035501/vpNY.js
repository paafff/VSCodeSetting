import express from 'express';
import {
  createArticle,
  getArticleByTitle,
  // getArticleImgByTitle,
  getArticles,
  updateArticle,
} from '../controllers/Article.js';
import { verifyUser } from '../middleware/Verify.js';

const articleRouter = express.Router();

articleRouter.post('/article/create', verifyUser, createArticle);
articleRouter.patch('/article/edit/:paramsTitle', verifyUser, updateArticle);
articleRouter.get('/article/:paramsTitle', getArticleByTitle);
// articleRouter.get('/articlesimg/:title', getArticleImgByTitle);
articleRouter.get('/articles', getArticles);

export default articleRouter;
