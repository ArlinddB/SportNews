import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: String,
    content: String,
    img: String,
    clicks: {
        type: Number,
        default: 0
    },
    category: String,
    created_at: Date,
    updated_at: Date
});

const model = mongoose.model("posts", schema);

export default model;