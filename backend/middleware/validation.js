import { check, validationResult } from "express-validator";
import path from "path";

const msg = "field is required";
export const validator = [
  check("name")
    .notEmpty()
    .withMessage("The name " + msg),
  check("urban_village")
    .notEmpty()
    .withMessage("The urban village " + msg),
  check("address")
    .notEmpty()
    .withMessage("The address " + msg),
  check("lat")
    .notEmpty()
    .withMessage("The latitude " + msg)
    .isNumeric()
    .withMessage("The latitude must contain numeric"),
  check("long")
    .notEmpty()
    .withMessage("The longitude " + msg)
    .isNumeric()
    .withMessage("The longitude must contain numeric"),
  check("price_range")
    .notEmpty()
    .withMessage("The price range " + msg),
  check("open_time")
    .notEmpty()
    .withMessage("The open time " + msg),
  check("category")
    .notEmpty()
    .withMessage("The category " + msg),
];

export const validateFile = (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({
      success: false,
      message: "No Image selected",
    });
  }

  const image = req.files.photo;
  const fileSize = image.data.length;
  const allowedType = [".png", ".jpg", ".jpeg"];
  const ext = path.extname(image.name);

  if (!allowedType.includes(ext)) {
    return res.json({
      success: false,
      message: "Image ext is not valid",
    });
  }
  if (fileSize > 5000000) {
    return res.json({
      success: false,
      message: "Image must be less than 5 MB",
    });
  }
  next();
};

export const result = (req, res, next) => {
  const errors = validationResult(req);
  const hasError = !errors.isEmpty();

  if (hasError) {
    return res.status(422).json({
      success: false,
      errors: errors.array()[0].msg,
    });
  }
  next();
};
