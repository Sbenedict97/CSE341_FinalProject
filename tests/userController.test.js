const request = require("supertest");
const app = require("../server.js");
const User = require("../src/models/user");

jest.mock("../../models/user");

describe("GET /profile", () => {
	test("should return user profile when authenticated", async () => {
		const mockUser = {
			_id: "123",
			name: "John Doe",
			email: "john@example.com",
		};
		User.findById.mockResolvedValue(mockUser);

		const response = await request(app)
			.get("/profile")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockUser);
	});

	test("should return 401 if not authenticated", async () => {
		const response = await request(app).get("/profile");

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: "Unauthorized" });
	});

	test("should return 404 if user not found", async () => {
		User.findById.mockResolvedValue(null);

		const response = await request(app)
			.get("/profile")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: "User not found" });
	});

	test("should handle server errors", async () => {
		User.findById.mockRejectedValue(new Error("Server error"));

		const response = await request(app)
			.get("/profile")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Server error" });
	});
});
