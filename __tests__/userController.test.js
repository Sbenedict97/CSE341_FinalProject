const request = require("supertest");
const app = require("../src/index.js");
const User = require("../src/models/user");

jest.mock("../src/models/user");

describe("User Handlers", () => {
	test("should return 401 if unauthorized", async () => {
		const response = await request(app).get("/profile");
		expect(response.status).toBe(401);
		// Match whatever your controller sends
		expect(response.body).toEqual({ error: "Unauthorized" });
	});

	test("should handle valid user profile", async () => {
		User.findById.mockResolvedValue({ _id: "123", name: "John" });
		const response = await request(app)
			.get("/profile")
			// In real tests, you'd mock passport or session to set req.user
			.set("Authorization", "Bearer faketoken");
		expect(response.status).toBe(200);
		expect(response.body).toEqual({ _id: "123", name: "John" });
	});

	test("should handle user not found", async () => {
		User.findById.mockResolvedValue(null);
		const response = await request(app)
			.get("/profile")
			.set("Authorization", "Bearer faketoken");
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ error: "User not found" });
	});

	test("should return 500 on server error", async () => {
		User.findById.mockRejectedValue(new Error("Server error"));
		const response = await request(app)
			.get("/profile")
			.set("Authorization", "Bearer faketoken");
		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Server error" });
	});
});
