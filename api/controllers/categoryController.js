import categoryModel from "../models/categoryModel";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createCategorySchema from "../validators/categories/create";
import updateCategorySchema from "../validators/categories/update";

const controller = {
  list: async (req, res) => {
    try {
      let page = req.query.page || 1;

      const limitValue = req.query.limit || 10;
      const skipValue = (page - 1) * limitValue || 0;

      const list = await categoryModel.find().skip(skipValue).limit(limitValue);

      return res.json({ page: page, list: list.reverse() });

    } catch (error) {
      console.error("Error while getting categories: " + error.message);
      res.json("Error while getting categories: " + error.message)
    }
  },
  find: async (req, res) => {
    try {
      const category = await categoryModel.findOne({
        _id: req.params.categoryId,
      });

      if (category == null) return res.json(ReasonPhrases.NOT_FOUND);
      return res.json(category);
    } catch (error) {
      console.error(ReasonPhrases.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  },
  create: async (req, res) => {
    const validationResult = createCategorySchema.validate(req.body);
    
    if (validationResult.error) {
      return res.status(StatusCodes.LENGTH_REQUIRED).json({
        message: ReasonPhrases.LENGTH_REQUIRED,
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
      return res.status(StatusCodes.LENGTH_REQUIRED).json({
        message: ReasonPhrases.LENGTH_REQUIRED,
        error: validationResult.error.message,
      });
    }

    try {
      await categoryModel.updateOne({ _id: req.params.categoryId }, req.body);

      const updatedCategory = await categoryModel.find({
        _id: req.params.categoryId,
      });

      if(updatedCategory == null){
        console.log("null");
      }

      return res.json(updatedCategory);
    } catch (err) {
      console.error(ReasonPhrases.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  },
  delete: async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
      await categoryModel.deleteOne({ _id: categoryId });
      res.json({ deleted: true });
    } catch (err) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
  },
};

export default controller;
