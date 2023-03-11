import Joi from 'joi';

const schema = Joi.object({
    _id: Joi.string().allow(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(10).max(30).required(),
    password: Joi.string().alphanum().min(6).max(30).required(),
});

export default schema;