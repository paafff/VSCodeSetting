import { Sequelize } from "sequelize";
import dbSetting from "../config/Database.js";

const {DataTypes} = Sequelize

const userDb = dbSetting.define("users", {
  uuid : {
    type : DataTypes.STRING, defaultValue:DataTypes
  }
})