import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import dbSetting from './config/Database.js';

dotenv.config();

const app = express();

async () => {
  await dbSetting.sync();
};
