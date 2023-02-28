import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: String,
    content: String,
    img: String
});

const model = mongoose.model("posts", schema);

export default model;