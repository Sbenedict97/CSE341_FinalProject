const Category = require('../models/category');

// Get all categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// Update a category
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!category) throw new Error('Category not found');
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// Delete a category
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new Error('Category not found');
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    next(error);
  }
};
