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
articleRouter.patch('/articles/edit/:title', verifyUser, updateArticle);
articleRouter.get('/articles/:paramsTitle', getArticleByTitle);
// articleRouter.get('/articlesimg/:title', getArticleImgByTitle);
articleRouter.get('/articles', getArticles);

export default articleRouter;
