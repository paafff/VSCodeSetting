import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';
import userDb from './UserModel.js';

const { DataTypes } = Sequelize;

export const articleDb = dbSetting.define(
  'articles',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 20],
      },
    },

    email: {
      type: DataTypes.STRING,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.T,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

export const articleImgDb = dbSetting.define(
  'articles_img',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: { type: DataTypes.INTEGER, allowNull: false },

    img1: {
      type: DataTypes.BLOB('long'),
    },
    img2: {
      type: DataTypes.BLOB('long'),
    },
    img3: {
      type: DataTypes.BLOB('long'),
    },
  },
  { freezeTableName: true }
);

// articleDb.belongsTo(articleImgDb, { foreignKey: 'imgId', as: 'image' });
