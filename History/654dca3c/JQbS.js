import { Sequelize } from 'sequelize';
import dbSetting from '../config/Database.js';

const { DataTypes } = Sequelize;

const userDb = dbSetting.define('users', {
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 25],
    },
  about: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 150],
    },
  },
  address: {
    type: DataTypes.STRING,
  },

  occupation: {
    type: DataTypes.STRING,
    validate: {
      len: [5, 20],
    },
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  gender: {
    type: DataTypes.STRING,
  },
});

export default userDb;
