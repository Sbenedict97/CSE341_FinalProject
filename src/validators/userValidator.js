const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  githubId: Joi.string().required(),
  avatar: Joi.string().uri(),
});

const profileUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  avatar: Joi.string().uri(),
});

function validateUser(req, res, next) {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

function validateProfileUpdate(req, res, next) {
  const { error } = profileUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = { validateUser, validateProfileUpdate };
