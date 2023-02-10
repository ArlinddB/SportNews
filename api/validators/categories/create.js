import Joi from 'joi';

const createCategorySchema = Joi.object({
    title: Joi.string().required().min(3).max(250),
});

export default createCategorySchema;