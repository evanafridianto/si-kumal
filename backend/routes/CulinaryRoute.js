import express from "express";

import { validator, validateFile, result } from "../middleware/validation.js";
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
router.post("/culinary/create", validator, result, validateFile, createData);
router.patch("/culinary/:id", validator, result, validateFile, updateData);
router.delete("/culinary/:id", deleteData);

export default router;
