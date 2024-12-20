const Reminder = require('../models/reminder');

const getReminders = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const reminders = await Reminder.find({ userId: req.user._id });
    res.status(200).json(reminders);
  } catch (error) {
    next(error);
  }
};

const createReminder = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const { title, description, date } = req.body;
    const reminder = new Reminder({
      title,
      description,
      date,
      userId: req.user._id
    });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
};

const deleteReminder = async (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
    const reminder = await Reminder.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!reminder) return res.status(404).json({ error: 'Reminder not found' });
    res.status(200).json({ message: 'Reminder deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReminders,
  createReminder,
  deleteReminder
};
