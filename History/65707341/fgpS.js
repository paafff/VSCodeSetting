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
      type: DataTypes.STRING,
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
      type: DataTypes.LONGBLOB,
    },
    img2: {
      type: DataTypes.LONGBLOB,
    },
    img3: {
      type: DataTypes.LONGBLOB,
    },
  },
  { freezeTableName: true }
);

// articleDb.belongsTo(articleImgDb, { foreignKey: 'imgId', as: 'image' });
