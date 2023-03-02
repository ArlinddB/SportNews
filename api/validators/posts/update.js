import Joi from 'joi';

const updatePostSchema = Joi.object({
    _id: Joi.string().allow(),
    title: Joi.string().required().min(5).max(250),
    content: Joi.string().required(),
    img: Joi.string().required(),
    category: Joi.string().required(),
    created_at: Joi.date().allow(),
    updated_at: Joi.date().allow(),
    __v: Joi.allow()
});

export default updatePostSchema;