const Joi = require("joi");

const productSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	price: Joi.number().required(),
	category: Joi.string().required(),
	inStock: Joi.boolean().required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date(),
});

function validateProduct(req, res, next) {
	const { error } = productSchema.validate(req.body);
	if (error) {
		return next(
			createError(400, `Validation Error: ${error.details[0].message}`)
		);
	}
	next();
}

module.exports = { validateProduct };
