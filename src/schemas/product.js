import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string(),
    description: Joi.string(),
    categoryId: Joi.string().required()
});