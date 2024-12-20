const express = require("express");
const {
	getSubscriptions,
	getSubscriptionById,
	createSubscription,
	updateSubscription,
	deleteSubscription,
} = require("../controllers/subscriptionController");
const { validateSubscription } = require("../validators/subscriptionValidator");
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
 * /subscriptions:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get all subscriptions
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all subscriptions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscription'
 *   post:
 *     tags: [Subscriptions]
 *     summary: Create a new subscription
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionInput'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Invalid input
 *
 * /subscriptions/{id}:
 *   get:
 *     tags: [Subscriptions]
 *     summary: Get a subscription by ID
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
 *         description: Subscription retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subscription'
 *       404:
 *         description: Subscription not found
 *   put:
 *     tags: [Subscriptions]
 *     summary: Update a subscription by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionInput'
 *     responses:
 *       200:
 *         description: Subscription updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Subscription not found
 *   delete:
 *     tags: [Subscriptions]
 *     summary: Delete a subscription by ID
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
 *         description: Subscription deleted successfully
 *       404:
 *         description: Subscription not found
 */

router.get("/", isAuthenticated, getSubscriptions);
router.get("/:id", isAuthenticated, getSubscriptionById);
router.post("/", isAuthenticated, validateSubscription, createSubscription);
router.put("/:id", isAuthenticated, validateSubscription, updateSubscription);
router.delete("/:id", isAuthenticated, deleteSubscription);

// Export isAuthenticated for testing
module.exports = { router, isAuthenticated };
