const request = require("supertest");
const app = require("../server.js");
const Subscription = require("../src/models/subscription");

jest.mock("../../models/subscription");

describe("GET /subscriptions", () => {
	test("should return all subscriptions when authenticated", async () => {
		const mockSubscriptions = [
			{
				_id: "1",
				name: "Subscription 1",
				price: 10,
				duration: "Monthly",
				category: "Cat1",
				description: "Desc1",
				isActive: true,
			},
			{
				_id: "2",
				name: "Subscription 2",
				price: 20,
				duration: "Yearly",
				category: "Cat2",
				description: "Desc2",
				isActive: false,
			},
		];
		Subscription.find.mockResolvedValue(mockSubscriptions);

		const response = await request(app)
			.get("/subscriptions")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockSubscriptions);
	});

	test("should return empty array if no subscriptions exist", async () => {
		Subscription.find.mockResolvedValue([]);

		const response = await request(app)
			.get("/subscriptions")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	test("should return 401 if not authenticated", async () => {
		const response = await request(app).get("/subscriptions");

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: "Unauthorized" });
	});

	test("should handle server errors", async () => {
		Subscription.find.mockRejectedValue(new Error("Server error"));

		const response = await request(app)
			.get("/subscriptions")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Server error" });
	});
});

describe("GET /subscriptions/:id", () => {
	test("should return subscription by ID when authenticated", async () => {
		const mockSubscription = {
			_id: "1",
			name: "Subscription 1",
			price: 10,
			duration: "Monthly",
			category: "Cat1",
			description: "Desc1",
			isActive: true,
		};
		Subscription.findById.mockResolvedValue(mockSubscription);

		const response = await request(app)
			.get("/subscriptions/1")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockSubscription);
	});

	test("should return 404 if subscription not found", async () => {
		Subscription.findById.mockResolvedValue(null);

		const response = await request(app)
			.get("/subscriptions/1")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: "Subscription not found" });
	});

	test("should return 400 for invalid subscription ID", async () => {
		const response = await request(app)
			.get("/subscriptions/invalidid")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: "Invalid subscription ID" });
	});

	test("should return 401 if not authenticated", async () => {
		const response = await request(app).get("/subscriptions/1");

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: "Unauthorized" });
	});

	test("should handle server errors", async () => {
		Subscription.findById.mockRejectedValue(new Error("Server error"));

		const response = await request(app)
			.get("/subscriptions/1")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Server error" });
	});
});
