import { Sequelize } from "sequelize";

const dbSetting = new Sequelize("", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default dbSetting;
