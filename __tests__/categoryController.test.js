const request = require("supertest");
const app = require("../src/index.js");
const Category = require("../src/models/category");

jest.mock("../src/models/category");

describe("Category Handlers", () => {
	test("GET /categories - success", async () => {
		Category.find.mockResolvedValue([{ _id: "1", name: "Cat1" }]);
		const response = await request(app).get("/categories");
		// If your real code requires auth, either mock it or expect 401
		expect(response.status).toBe(200);
		expect(response.body).toEqual([{ _id: "1", name: "Cat1" }]);
	});

	test("GET /categories - empty array", async () => {
		Category.find.mockResolvedValue([]);
		const response = await request(app).get("/categories");
		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	test("GET /categories/:id - category found", async () => {
		Category.findById.mockResolvedValue({ _id: "1", name: "Cat1" });
		const response = await request(app).get("/categories/1");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ _id: "1", name: "Cat1" });
	});

	test("GET /categories/:id - not found", async () => {
		Category.findById.mockResolvedValue(null);
		const response = await request(app).get("/categories/1");
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: "Category not found" });
	});
});
