const Joi = require('joi');

const subscriptionSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  duration: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  isActive: Joi.boolean(),
  createdAt: Joi.date(),
});

function validateSubscription(req, res, next) {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: `Validation Error: ${error.details[0].message}` });
  }
  next();
}

module.exports = { validateSubscription };
