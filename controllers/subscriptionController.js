const Subscription = require('../models/subscription');

// Get all subscriptions
exports.getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().populate('category');
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

// Create a new subscription
exports.createSubscription = async (req, res, next) => {
  try {
    const { name, price, duration, category, description, isActive } = req.body;
    const subscription = new Subscription({ name, price, duration, category, description, isActive });
    await subscription.save();
    res
