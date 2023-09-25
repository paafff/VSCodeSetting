import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import dbSetting from './config/Database.js';

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
