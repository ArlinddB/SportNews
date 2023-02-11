import Joi from 'joi';

const updateCategorySchema = Joi.object({
    _id: Joi.string().allow(),
    title: Joi.string().required().min(3).max(250),
    __v: Joi.allow()
});

export default updateCategorySchema;