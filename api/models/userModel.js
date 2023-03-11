import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const model = mongoose.model("users", schema);

export default model;