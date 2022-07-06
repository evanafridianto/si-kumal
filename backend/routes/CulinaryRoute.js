import express from "express";

import {
  getAllData,
  createData,
  getDataById,
  updateData,
  deleteData,
} from "../controllers/CulinaryController.js";

import { body, validationResult, check } from "express-validator";
const router = express.Router();
const msg = " field is required";

router.get("/culinary", getAllData);
router.get("/culinary/:id", getDataById);
router.post(
  "/culinary/create",
  [
    check("name").not().isEmpty().withMessage(msg),
    check("urban_village").not().isEmpty().withMessage(msg),
    check("address").not().isEmpty().withMessage(msg),
    check("lat").not().isEmpty().withMessage(msg),
    check("long").not().isEmpty().withMessage(msg),
    check("price_range").not().isEmpty().withMessage(msg),
    check("open_time").not().isEmpty().withMessage(msg),
    check("category").not().isEmpty().withMessage(msg),
    // body("photo").not().isEmpty().withMessage(msg),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array(),
      });
    }
    res.status(200).json({
      success: true,
      message: "Data created successfully",
    });
  },
  createData
);
router.patch("/culinary/:id", updateData);
router.delete("/culinary/:id", deleteData);

export default router;
