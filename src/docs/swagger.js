const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Subscription Management API",
			version: "1.0.0",
			description:
				"API for managing categories, subscriptions, users, and reminders.",
		},
		servers: [
			{
				url: "https://subscription-manager-snvw.onrender.com/",
				description: "Deployed server",
			},
		],
		tags: [
			{
				name: "Categories",
				description: "Everything about categories",
			},
			{
				name: "Subscriptions",
				description: "Everything about subscriptions",
			},
			{
				name: "Users",
				description: "User profile operations",
			},
			{
				name: "Reminders",
				description: "Subscription reminder operations",
			},
		],
		components: {
			schemas: {
				Category: {
					type: "object",
					properties: {
						id: { type: "string" },
						name: { type: "string" },
						description: { type: "string" },
						createdAt: { type: "string", format: "date-time" },
					},
				},
				CategoryInput: {
					type: "object",
					properties: {
						name: { type: "string" },
						description: { type: "string" },
					},
					required: ["name", "description"],
				},
				Subscription: {
					type: "object",
					properties: {
						id: { type: "string" },
						name: { type: "string" },
						price: { type: "number" },
						duration: { type: "string" },
						category: { $ref: "#/components/schemas/Category" },
						description: { type: "string" },
						isActive: { type: "boolean" },
						createdAt: { type: "string", format: "date-time" },
					},
				},
				SubscriptionInput: {
					type: "object",
					properties: {
						name: { type: "string" },
						price: { type: "number" },
						duration: { type: "string" },
						category: { type: "string" },
						description: { type: "string" },
						isActive: { type: "boolean" },
					},
					required: ["name", "price", "duration", "category", "description"],
				},
				User: {
					type: "object",
					properties: {
						id: { type: "string" },
						name: { type: "string" },
						email: { type: "string" },
						githubId: { type: "string" },
						avatar: { type: "string" },
					},
				},
				Reminder: {
					type: "object",
					properties: {
						id: { type: "string" },
						title: { type: "string" },
						description: { type: "string" },
						dueDate: { type: "string", format: "date-time" },
						userId: { type: "string" },
						completed: { type: "boolean" },
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
