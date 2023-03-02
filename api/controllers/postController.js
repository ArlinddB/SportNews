import postModel from "../models/postModel";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import createPostSchema from "../validators/posts/create";
import updatePostSchema from "../validators/posts/update";

const controller = {
  list: async (req, res) => {
    try {
      let page = req.query.page || 1;

      const limitValue = req.query.limit || 10;
      const skipValue = (page - 1) * limitValue || 0;

      const list = await postModel.find().skip(skipValue).limit(limitValue);

      return res.json({ page: page, list: list.reverse() });

    } catch (error) {
      console.error("Error while getting posts: " + error.message);
      res.json("Error while getting posts: " + error.message)
    }
  },
  getByCategory: async (req, res) => {
    try { 
      const category = new RegExp(req.params.category, 'i');
      
      const list = await postModel.find({ category: category})

      return res.json(list.reverse())

    } catch (error) {
      res.json("Error while getting posts: " + error.message)
    }
  },
  find: async (req, res) => {
    try {
      const post = await postModel.findOne({
        _id: req.params.postId,
      });

      if (post == null) return res.json(ReasonPhrases.NOT_FOUND);
      return res.json(post);
    } catch (error) {
      console.error(ReasonPhrases.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  },
  create: async (req, res) => {
    const validationResult = createPostSchema.validate(req.body);
    
    if (validationResult.error) {
      return res.status(StatusCodes.LENGTH_REQUIRED).json({
        message: ReasonPhrases.LENGTH_REQUIRED,
        error: validationResult.error.message,
      });
    }

    const newPost = new postModel(validationResult.value);

    try {
      await newPost.save();

      return res.json(newPost);
    } catch (err) {
      return res.json(StatusCodes.UNAUTHORIZED).json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: err.message,
      });
    }
  },
  edit: async (req, res) => {
    const validationResult = updatePostSchema.validate(req.body);

    if (validationResult.error) {
      return res.status(StatusCodes.LENGTH_REQUIRED).json({
        message: ReasonPhrases.LENGTH_REQUIRED,
        error: validationResult.error.message,
      });
    }

    try {
      await postModel.updateOne({ _id: req.params.postId }, req.body);

      const updatedPost = await postModel.find({
        _id: req.params.postId,
      });

      if(updatedPost == null){
        console.log("null");
      }

      return res.json(updatedPost);
    } catch (err) {
      console.error(ReasonPhrases.NOT_FOUND);
      return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    }
  },
  delete: async (req, res) => {
    const postId = req.params.postId;

    try {
      await postModel.deleteOne({ _id: postId });
      res.json({ deleted: true });
    } catch (err) {
      return res.status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
  },
};

export default controller;
