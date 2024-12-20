const request = require("supertest");
const app = require("../src/index.js");

const Reminder = require("../src/models/reminder");

jest.mock("../src/models/reminder");

describe("GET /reminders", () => {
	test("should return reminders for authenticated user", async () => {
		const mockReminders = [
			{ _id: "1", title: "Reminder 1", userId: "123" },
			{ _id: "2", title: "Reminder 2", userId: "123" },
		];
		Reminder.find.mockResolvedValue(mockReminders);

		const response = await request(app)
			.get("/reminders")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual(mockReminders);
	});

	test("should return empty array if no reminders found", async () => {
		Reminder.find.mockResolvedValue([]);

		const response = await request(app)
			.get("/reminders")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(200);
		expect(response.body).toEqual([]);
	});

	test("should return 401 if not authenticated", async () => {
		const response = await request(app).get("/reminders");

		expect(response.status).toBe(401);
		expect(response.body).toEqual({ error: "Unauthorized" });
	});

	test("should handle server errors", async () => {
		Reminder.find.mockRejectedValue(new Error("Server error"));

		const response = await request(app)
			.get("/reminders")
			.set("Authorization", "Bearer validtoken");

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Server error" });
	});
});
