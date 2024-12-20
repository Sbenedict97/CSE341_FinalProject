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

const userCreationSchema = Joi.object({
    username: Joi.string().required(),
    displayName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    country: Joi.string()
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

function validateUserCreation(req, res, next) {
    const { error } = userCreationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}

module.exports = { validateUserCreation, validateProfileUpdate };
