const express = require('express');
const {
  getSubscriptions,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} = require('../controllers/subscriptionController');
const { validateSubscription } = require('../validators/subscriptionValidator');

/**
 * @swagger
 * /subscriptions:
 *   get:
 *     summary: Get all subscriptions
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
 *     summary: Create a new subscription
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
 *     summary: Get a subscription by ID
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
 *     summary: Update a subscription by ID
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
 *     summary: Delete a subscription by ID
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

const router = express.Router();

router.get('/', getSubscriptions);
router.post('/', validateSubscription, createSubscription);
router.put('/:id', validateSubscription, updateSubscription);
router.delete('/:id', deleteSubscription);

module.exports = router;
