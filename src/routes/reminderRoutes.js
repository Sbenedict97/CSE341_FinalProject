const express = require("express");
const { validateReminder } = require("../validators/reminderValidator");
const {
	getReminders,
	createReminder,
	deleteReminder,
} = require("../controllers/reminderController");
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
 * /reminders:
 *   get:
 *     tags: [Reminders]
 *     summary: Get all reminders for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of reminders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reminder'
 *   post:
 *     tags: [Reminders]
 *     summary: Create a new reminder
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reminder'
 *     responses:
 *       201:
 *         description: Reminder created successfully
 *
 * /reminders/{id}:
 *   delete:
 *     tags: [Reminders]
 *     summary: Delete a reminder
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminder deleted successfully
 */

router.get("/", isAuthenticated, getReminders);
router.post("/", isAuthenticated, validateReminder, createReminder);
router.delete("/:id", isAuthenticated, deleteReminder);

// Export isAuthenticated for testing
module.exports = { router, isAuthenticated };
