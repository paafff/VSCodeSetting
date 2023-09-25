import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import dbSetting from './config/Database.js';
import AuthRoute from './routes/AuthRoute.js';
import ArticleRoute from './routes/ArticleRoute.js';
import productRoute from './routes/ProductRoute.js';

dotenv.config();

const app = express();

(async () => {
  await dbSetting.sync();
})();

const sessionStore = SequelizeStore(session.Store);

const Store = new sessionStore({
  db: dbSetting,
});

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
app.use(ArticleRoute);
app.use(productRoute);

app.listen(process.env.APP_PORT, () => {
  console.log('server jalan bang...');
});
