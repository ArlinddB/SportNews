import categoryModel from "../models/categoryModel";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createCategorySchema from "../validators/categories/create";
import updateCategorySchema from "../validators/categories/update";

const controller = {
  list: async (req, res) => {
    const list = await categoryModel.find();
    return res.json(list);
  },
  find: async (req, res) => {
    try {
      const category = await categoryModel.findOne({
        _id: req.params.categoryId,
      });

      if (!category) throw Error("Category not found");
      return res.json(category);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  create: async (req, res) => {
    console.log("req.body - ", req.body);
    const validationResult = createCategorySchema.validate(req.body);

    if (validationResult.error) {
      console.log(validationResult.value);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: validationResult.error.message,
      });
    }

    const newCategory = new categoryModel(validationResult.value);

    try {
      await newCategory.save();

      return res.json(newCategory);
    } catch (err) {
      return res.json(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: err.message,
      });
    }
  },
  edit: async (req, res) => {
    const validationResult = updateCategorySchema.validate(req.body);
    if (validationResult.error) {
      console.log(validationResult.value);

      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: validationResult.error.message,
      });
    }

    try {
      await categoryModel.updateOne({ _id: req.params.categoryId }, req.body);

      const updatedCategory = await categoryModel.find({
        _id: req.params.categoryId,
      });

      return res.json(updatedCategory);
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: validationResult.error.message,
      });
    }
  },
  delete: async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
      await categoryModel.deleteOne({ _id: categoryId });
      res.json({ deleted: true });
    } catch (err) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
  },
};

export default controller;
