import Culinary from "../models/CulinaryModel.js";
import path from "path";
import fs from "fs";

export const getAllData = async (req, res) => {
  try {
    const data = await Culinary.findAll({
      order: [["id", "DESC"]],
    });
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getDataById = async (req, res) => {
  try {
    const data = await Culinary.findAll({
      where: {
        id: req.params.id,
      },
    });
    return res.json(data[0]);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const createData = async (req, res) => {
  let fileName = "";
  if (req.files !== null) {
    const image = req.files.photo;
    const ext = path.extname(image.name);
    fileName = image.md5 + ext;
    image.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }
  const name = req.body.name;
  const urban_village = req.body.urban_village;
  const address = req.body.address;
  const lat = req.body.lat;
  const long = req.body.long;
  const price_range = req.body.price_range;
  const open_time = req.body.open_time;
  const category = req.body.category;

  try {
    await Culinary.create({
      name: name,
      urban_village: urban_village,
      address: address,
      lat: lat,
      long: long,
      price_range: price_range,
      open_time: open_time,
      category: category,
      photo: fileName,
    });
    return res.status(200).json({
      message: "Data created successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateData = async (req, res) => {
  const culinary = await Culinary.findOne({
    where: {
      id: req.params.id,
    },
  });

  let fileName = "";
  if (req.files !== null) {
    const image = req.files.photo;
    const ext = path.extname(image.name);
    fileName = image.md5 + ext;

    image.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });

    const filepath = `./public/images/${culinary.photo}`;
    if (culinary.photo !== "" && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  const name = req.body.name;
  const urban_village = req.body.urban_village;
  const address = req.body.address;
  const lat = req.body.lat;
  const long = req.body.long;
  const price_range = req.body.price_range;
  const open_time = req.body.open_time;
  const category = req.body.category;

  try {
    await Culinary.update(
      {
        name: name,
        urban_village: urban_village,
        address: address,
        lat: lat,
        long: long,
        price_range: price_range,
        open_time: open_time,
        category: category,
        photo: fileName,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json({
      message: "Data updated successfully!",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
};

export const deleteData = async (req, res) => {
  const culinary = await Culinary.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (culinary) {
    try {
      const filepath = `./public/images/${culinary.photo}`;
      if (culinary.photo !== "" && fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      await Culinary.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.json({
        message: "Data deleted successfully!",
      });
    } catch (error) {
      return res.json({ message: error.message });
    }
  }
};
