import { Sequelize } from "sequelize";

const db = new Sequelize("sikumal", "root", "admin", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
