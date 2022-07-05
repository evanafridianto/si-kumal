import Culinary from "../models/CulinaryModel.js";

export const getAllData = async (req, res) => {
  try {
    const data = await Culinary.findAll();
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
  try {
    await Culinary.create(req.body);
    res.json({
      message: "Data Created",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateData = async (req, res) => {
  try {
    await Culinary.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Data Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteData = async (req, res) => {
  try {
    await Culinary.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Data Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
