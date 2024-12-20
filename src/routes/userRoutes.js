const express = require("express");
const { validateProfileUpdate } = require("../validators/userValidator");
const { getProfile, updateProfile } = require("../controllers/userController");
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

router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, validateProfileUpdate, updateProfile);

module.exports = router;
