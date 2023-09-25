import { Sequelize } from 'sequelize';

const dbSetting = new Sequelize('paafffStore', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default dbSetting;
