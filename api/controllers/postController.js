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
      res.json("Error while getting posts: " + error.message);
    }
  },
  getByCategory: async (req, res) => {
    try {
      const category = new RegExp(req.params.category, "i");

      const list = await postModel.find({ category: category });

      return res.json(list.reverse());
    } catch (error) {
      res.json("Error while getting posts: " + error.message);
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
  incrementClicks: async (req, res) => {
    try {
      const post = await postModel.findById(req.params.postId);

      if (!post) {
        return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
      }

      post.clicks += 1;
      await post.save();

      return res.json(post);
    } catch (error) {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
  mostClicked: async (req, res) => {
    try {
      const topPosts = await postModel.aggregate([
        { $sort: { clicks: -1 } }, // sort posts by clicks in descending order
        { $limit: 3 }, // limit the results to the top 3 posts
      ]);

      return res.json(topPosts);
    } catch (error) {
      return res.json(error.message);
    }
  },
  similarPosts: async (req, res) => {
    try {
      const currentPost = await postModel.findOne({ _id: req.params.postId });
      const recommendedPosts = await postModel
        .find({ category: currentPost.category, _id: { $ne: currentPost._id } })
        .limit(3);

      return res.json(recommendedPosts);
    } catch (err) {
      console.error(err.message);
      return [];
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
    newPost.created_at = new Date();

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
      const post = await postModel.find({
        _id: req.params.postId,
      });

      if (post == null) {
        console.error("null");
        return;
      }

      const a = post.created_at;

      const update = {
        ...req.body,
        updated_at: new Date(),
        created_at: a,
      };

      await postModel.updateOne({ _id: req.params.postId }, { $set: update });

      const updatedPost = await postModel.find({
        _id: req.params.postId,
      });

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
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND });
    }
  },
};

export default controller;
