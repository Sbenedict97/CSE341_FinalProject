const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  createdAt: Joi.date(),
});

function validateCategory(req, res, next) {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: `Validation Error: ${error.details[0].message}` });
  }
  next();
}

module.exports = { validateCategory };
