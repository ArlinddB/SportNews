import Joi from 'joi';

const updateCategorySchema = Joi.object({
    title: Joi.string().required().min(3).max(250),
});

export default updateCategorySchema;