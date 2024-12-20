const Joi = require('joi');

const reminderSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  userId: Joi.string().required(),
  completed: Joi.boolean(),
});

function validateReminder(req, res, next) {
  const { error } = reminderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = { validateReminder };
