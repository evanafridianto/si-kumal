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
    res.json(data[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createData = async (req, res) => {
  const name = req.body.name;
  const urban_village = req.body.urban_village;
  const address = req.body.address;
  const lat = req.body.lat;
  const long = req.body.long;
  const price_range = req.body.price_range;
  const open_time = req.body.open_time;
  const category = req.body.category;
  let fileName = "";

  if (req.files === null) {
    fileName = null;
  } else {
    const photo = req.files.photo;
    const fileSize = photo.data.length;
    const ext = path.extname(photo.name);
    fileName = photo.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    photo.mv(`./public/images/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

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
    res.json({
      message: "Data updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateData = async (req, res) => {
  const culinary = await Culinary.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!culinary) return res.status(404).json({ msg: "No Data Found" });

  let fileName = "";
  if (req.files === null) {
    fileName = culinary.photo;
  } else {
    const photo = req.files.photo;
    const fileSize = photo.data.length;
    const ext = path.extname(photo.name);
    const allowedType = [".png", ".jpg", ".jpeg"];

    fileName = photo.md5 + ext;

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${culinary.photo}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    photo.mv(`./public/images/${fileName}`, (err) => {
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
    res.json({
      message: "Data updated successfully!",
    });
  } catch (error) {
    // res.json({ message: error.message });
    console.log(error.message);
  }
};

export const deleteData = async (req, res) => {
  const culinary = await Culinary.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!culinary) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${culinary.photo}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    await Culinary.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Data deleted successfully!",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
