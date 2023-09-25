import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';

const { DataTypes } = Sequelize;

const articleDb = dbSetting.define('articles', {
  title : {
    type : DataTypes.STRING,
    allowNull:false
  }
  content : {
    type : DataTypes.STRING,
    allowNull:false
  }
  summary : {
    type : DataTypes.STRING,
    allowNull:false
  }
});


const articleImgDb = dbSetting.define("articles_img")