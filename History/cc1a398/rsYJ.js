// import mongoose from "mongoose";

// const productSchema = mongoose.Schema({
//   uuid: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "users",
//     unique: false,
//   },
//   image: { type: Buffer, required: true },
// });

// const productDb = mongoose.model("products", productSchema);

// export default productDb;

import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';
import userDb from './UserModel.js';

const { DataTypes } = Sequelize;

const productDb = dbSetting.define(
  'products',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
      },
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
      type: DataTypes.BLOB,
    },

    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

userDb.hasMany(productDb);
productDb.belongsTo(userDb, { foreignKey: 'userId', as: 'userDB' });

export default productDb;
