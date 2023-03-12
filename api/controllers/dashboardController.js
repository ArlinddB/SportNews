import { MONGO_CONNECTION_URI, MONGO_DB_NAME, MONGO_DB_PORT } from "../config";
import postModel from "../models/postModel";
import categoryModel from "../models/categoryModel";
import admin from "../services/firebase";


const controller = {
  index: async (req, res) => {
    try {
      let postsCount = await postModel.countDocuments({});

      let categoriesCount = await categoryModel.countDocuments({});

      const listUsersResult = await admin.auth().listUsers();
      const users = listUsersResult.users;

      return res.json({ posts: postsCount, categories: categoriesCount, users: users.length });
    
    } catch (error) {
      return res.json("Error: " + error.message);
    }
  },
};

export default controller;
