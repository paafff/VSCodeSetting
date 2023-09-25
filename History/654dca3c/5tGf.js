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
      len: [3, 20],
    },
  },
  address: {
    type: DataTypes.STRING,
  },

  occupation: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
});

export default userDb;
