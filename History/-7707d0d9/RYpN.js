import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import dbSetting from './config/Database.js';
import AuthRoute from './routes/AuthRoute.js';
import articleRouter from './routes/ArticleRoute.js';

dotenv.config();

const app = express();

(async () => {
  await dbSetting.sync();
})();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto', maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use(express.json());
app.use(AuthRoute);
app.use(articleRouter)

app.listen(process.env.APP_PORT, () => {
  console.log('server jalan bang...');
});
