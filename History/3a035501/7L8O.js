import express from 'express';
import { createArticle } from '../controllers/Article.js';

const articleRouter = express.Router;

articleRouter.post('/article/create', createArticle);

export default articleRouter;
