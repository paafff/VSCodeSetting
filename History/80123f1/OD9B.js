import { Sequelize } from "sequelize";

const dbSetting = new Sequelize("dbpaafff_", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default dbSetting;
