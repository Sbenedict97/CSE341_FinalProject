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
    res.status(201).json(subscription);
  } catch (error) {
    next(error);
  }
};

// Update a subscription
exports.updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, duration, category, description, isActive } = req.body;
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { name, price, duration, category, description, isActive },
      { new: true }
    );
    if (!subscription) throw new Error('Subscription not found');
    res.status(200).json(subscription);
  } catch (error) {
    next(error);
  }
};

// Delete a subscription
exports.deleteSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndDelete(id);
    if (!subscription) throw new Error('Subscription not found');
    res.status(200).json({ message: 'Subscription deleted' });
  } catch (error) {
    next(error);
  }
};
