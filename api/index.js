import express from "express";
import mongoose from "mongoose";
import {
  MONGO_CONNECTION_URI,
  MONGO_DB_NAME,
  API_PORT,
  MONGO_DB_PORT,
} from "./config";
import cors from'cors';
import categoryRouter from "./routes/categoryRoute";
import postRouter from "./routes/postRoute";
import dashboardRouter from "./routes/dashboardRoute";


mongoose.connect(`${MONGO_CONNECTION_URI}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`).then(() => {
    console.log(`Connected to mongo on port: ${MONGO_DB_PORT}`);
    
    const app = express();
    
    app.use(cors({
        origin: '*'
    }));

    app.use(express.urlencoded({ extended: true }))

    app.use(express.json());

    app.use('/categories', categoryRouter);

    app.use('/posts', postRouter)

    app.use('/dashboard', dashboardRouter)
    
    app.listen(API_PORT, () => {
      console.log(`Server Started at: ${API_PORT}`);
    });
});

