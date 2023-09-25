import { Sequelize, UUIDV4 } from 'sequelize';
import dbSetting from '../config/Database.js';
import userDb from './UserModel.js';

const { DataTypes } = Sequelize;

const productDb = dbSetting.define('products',{

uuid : {
  type:DataTypes.STRING,
  defaultValue:DataTypes.UUIDV4
  ,allowNull:false,unique:true
}

,{name }

})