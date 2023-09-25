import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';
import userDb from './UserModel.js';

const { DataTypes } = Sequelize;

export const productDb = dbSetting.define(
  'products',
  {
    uuid: {
      type: DataTypes.STRING,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    productImgId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3 - 100] },
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { freezeTableName: true }
);

userDb.hasMany(productDb);
productDb.belongsTo(userDb, { foreignKey: 'userId', as: 'userDb' });

export const productImgDb = dbSetting.define(
  'products_img',

  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [3 - 100] },
    },
    uuid: {
      type: DataTypes.STRING,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    img1: {
      type: DataTypes.BLOB('long'),
    },
    img2: {
      type: DataTypes.BLOB('long'),
    },
    img3: {
      type: DataTypes.BLOB('long'),
    },
  }
);

productDb.belongsTo(productImgDb, {
  foreignKey: 'productImgId',
  as: 'productImgDb',
});
