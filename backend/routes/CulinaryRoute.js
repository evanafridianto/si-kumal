import express from "express";

import {
  getAllData,
  createData,
  getDataById,
  updateData,
  deleteData,
} from "../controllers/CulinaryController.js";

const router = express.Router();

router.get("/culinary", getAllData);
router.get("/culinary/:id", getDataById);
router.post("/culinary/create", createData);
router.patch("/culinary/:id", updateData);
router.delete("/culinary/:id", deleteData);

export default router;
