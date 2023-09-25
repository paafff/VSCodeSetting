import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';
import userDb from './UserModel.js';

const { DataTypes } = Sequelize;

const productDb = dbSetting.define('products',)