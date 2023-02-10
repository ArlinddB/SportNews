import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: String,
});

const model = mongoose.model("categories", schema);

export default model;