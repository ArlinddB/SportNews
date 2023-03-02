import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: String,
    content: String,
    img: String,
    category: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

const model = mongoose.model("posts", schema);

export default model;