import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';

const { DataTypes } = Sequelize;

const articleDb = dbSetting.define('articles');
