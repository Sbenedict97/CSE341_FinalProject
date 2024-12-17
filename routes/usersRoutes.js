const express = require('express');
const { body, validationResult } = require('express-validator');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Middleware for validating request data
const validateUser = [
  body('name').isString().withMessage('Name must be a string'),
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// GET all users
router.get('/', usersController.getAllUsers);

// GET a single user by ID
router.get('/:id', usersController.getUserById);

// POST a new user
router.post('/', validateUser, usersController.createUser);

// PUT update an existing user by ID
router.put('/:id', validateUser, usersController.updateUser);

// DELETE a user by ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;
