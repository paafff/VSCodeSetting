import { Sequelize } from 'sequelize';

const dbSetting = new Sequelize('paafffstore', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default dbSetting;
