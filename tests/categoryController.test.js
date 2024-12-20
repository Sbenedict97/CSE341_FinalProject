const request = require("supertest");
const app = require("../server.js");
const Category = require("../src/models/category");

jest.mock("../../models/category");

describe("GET /categories", () => {
	test("should return all categories when authenticated", async () => {
		const mockCategories = [
			{ _id: "1", name: "Category 1", description: "Description 1" },
			{ _id: "2", name: "Category 2", description: "Description 2" },
		];
		Category.find.mockResolvedValue(mockCategories);

		const response = await request(app)
			.get("/categories")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockCategories);
	});

	test("should return empty array if no categories exist", async () => {
		Category.find.mockResolvedValue([]);

		const response = await request(app)
			.get("/categories")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	test("should return 401 if not authenticated", async () => {
		const response = await request(app).get("/categories");

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: "Unauthorized" });
	});

	test("should handle server errors", async () => {
		Category.find.mockRejectedValue(new Error("Server error"));

		const response = await request(app)
			.get("/categories")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Server error" });
	});
});

describe("GET /categories/:id", () => {
	test("should return category by ID when authenticated", async () => {
		const mockCategory = {
			_id: "1",
			name: "Category 1",
			description: "Description 1",
		};
		Category.findById.mockResolvedValue(mockCategory);

		const response = await request(app)
			.get("/categories/1")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockCategory);
	});

	test("should return 404 if category not found", async () => {
		Category.findById.mockResolvedValue(null);

		const response = await request(app)
			.get("/categories/1")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: "Category not found" });
	});

	test("should return 400 for invalid category ID", async () => {
		const response = await request(app)
			.get("/categories/invalidid")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(400);
		expect(response.body).toEqual({ error: "Invalid category ID" });
	});

	test("should return 401 if not authenticated", async () => {
		const response = await request(app).get("/categories/1");

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: "Unauthorized" });
	});

	test("should handle server errors", async () => {
		Category.findById.mockRejectedValue(new Error("Server error"));

		const response = await request(app)
			.get("/categories/1")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Server error" });
	});
});
