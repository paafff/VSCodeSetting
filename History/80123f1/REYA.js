import { Sequelize } from 'sequelize';

const dbSetting = new Sequelize('dbpaafff_danangr', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default dbSetting;
