import { Sequelize } from "sequelize";
import db from "../config/Db.js";
const { DataTypes } = Sequelize;

const Culinary = db.define(
  "culinaries",
  {
    name: {
      type: DataTypes.STRING,
    },
    urban_village: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.TEXT,
    },
    long: {
      type: DataTypes.TEXT,
    },
    price_range: {
      type: DataTypes.STRING,
    },
    open_time: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Culinary;

(async () => {
  await db.sync();
})();
