const express = require("express");
const { validateProfileUpdate, validateUserCreation } = require("../validators/userValidator");
const { getProfile, updateProfile, createUser, getAllUsers, getUserById } = require("../controllers/userController");
const router = express.Router();

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(401).json({ error: "Unauthorized access" });
}

// Swagger documentation

/**
 * @swagger
 * /users/profile:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   put:
 *     tags: [Users]
 *     summary: Update user profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               avatar: { type: string }
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - displayName
 *             properties:
 *               username: { type: string }
 *               email: { type: string }
 *               displayName: { type: string }
 *               phone: { type: string }
 *               country: { type: string }
 *     responses:
 *       201:
 *         description: User created successfully
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */

router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, validateProfileUpdate, updateProfile);
router.post("/", validateUserCreation, createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// Export isAuthenticated for testing
module.exports = { router, isAuthenticated };
