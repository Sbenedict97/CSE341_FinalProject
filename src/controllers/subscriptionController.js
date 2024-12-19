const Subscription = require('../models/subscription');

// Get all subscriptions
const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().populate('category');
    res.status(200).json(subscriptions);
  } catch (error) {
    next(error);
  }
};

// Create a new subscription
const createSubscription = async (req, res, next) => {
  try {
    const { name, price, duration, category, description, isActive } = req.body;
    const subscription = new Subscription({ name, price, duration, category, description, isActive });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

// Update a subscription
const updateSubscription = async (req, res, next) => {
  try {
    const options = { new: true };
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, options);
    if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
    res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};

// Delete a subscription
const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
    res.status(200).json({ message: 'Subscription deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription
};
