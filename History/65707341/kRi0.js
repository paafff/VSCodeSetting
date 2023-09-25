import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';

const { DataTypes } = Sequelize;

export const articleDb = dbSetting.define(
  'articles',
  {
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
    articleId: { type: DataTypes.INTEGER, allowNull: false },
    img1: {
      type: DataTypes.BLOB,
    },
    img2: {
      type: DataTypes.BLOB,
    },
    img3: {
      type: DataTypes.BLOB,
    },
  },
  { freezeTableName: true }
);

articleImgDb.belongsTo(articleDb, { foreignKey:"articleId", });
