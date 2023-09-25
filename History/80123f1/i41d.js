import { Sequelize } from "sequelize";

const dbSetting = new Sequelize("mypersonal", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default dbSetting;
