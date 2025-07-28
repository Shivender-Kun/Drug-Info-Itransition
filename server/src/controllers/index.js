const { drugData } = require("../data");
const { drugDataModel } = require("../models/drugsData.model");

const getDrugData = async (req, res, next) => {
  const { order = "descending", company } = req.query;

  try {
    const data = await drugDataModel
      .find({ ...(company && { company }) })
      .sort({ launchDate: order === "descending" ? -1 : 1 });

    return res.status(200).json({
      data,
      message: "Drug data fetched successfully",
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

const getDistinctCompanies = async (req, res, next) => {
  try {
    const data = await drugDataModel.distinct("company");

    return res.status(200).json({
      data,
      message: "Drug companies fetched successfully",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const addDrugData = async (req, res, next) => {
  const { code, genericName, company, brandName, launchDate } = req.body;

  try {
    const addedData = await drugDataModel.create({
      code,
      genericName,
      company,
      brandName,
      launchDate: new Date(launchDate),
    });

    if (addedData) {
      return res.status(201).json({
        message: "Data added successfully",
        success: true,
        data: addedData,
      });
    } else throw new Error();
  } catch (error) {
    next(error);
  }
};

const addStoredDrugData = async (req, res, next) => {
  try {
    const formattedDrugData = drugData.map((data) => {
      const newData = { ...data, launchDate: new Date(data.launchDate) };
      return newData;
    });

    const added = await drugDataModel.insertMany(formattedDrugData);
    console.log({ added });

    if (added) {
      return res
        .status(201)
        .json({ message: "Data added successfully", success: true });
    } else throw new Error();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDrugData,
  getDistinctCompanies,
  addDrugData,
  addStoredDrugData,
};
