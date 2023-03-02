import Joi from 'joi';

const createPostSchema = Joi.object({
    title: Joi.string().required().min(5).max(250),
    content: Joi.string().required(),
    img: Joi.string().required(),
    category: Joi.string().required(),
    created_at: Joi.date().allow(),
    updated_at: Joi.date().allow(),
});

export default createPostSchema;