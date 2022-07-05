import express from "express";
import cors from "cors";

import db from "./config/Db.js";
import CulinaryRoute from "./routes/CulinaryRoute.js";
import FileUpload from "express-fileupload";
const app = express();

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Connection error:", error);
}

app.use(cors());
app.use(express.json());

app.use(FileUpload());
app.use(express.static("public"));

app.use(CulinaryRoute);
// app.use("/culinary", CulinaryRoute);

app.listen(2000, () => {
  console.log("server up and running at port 2000");
});
