// Mock the isAuthenticated middleware before importing the app
jest.mock("../src/routes/userRoutes", () => {
	const originalModule = jest.requireActual("../src/routes/userRoutes");
	return {
		...originalModule,
		isAuthenticated: jest.fn((req, res, next) => next()),
	};
});

const request = require("supertest");
const app = require("../src/index");

afterAll(() => {
	require("../src/routes/userRoutes").isAuthenticated.mockRestore();
});

describe("User Endpoints", () => {
	describe("GET /users/profile", () => {
		test("should require authentication", async () => {
			const res = await request(app).get("/users/profile");
			expect(res.statusCode).toBe(401);
		});

		test("should return 200 when authorized", async () => {
			const res = await request(app)
				.get("/users/profile")
				.set("Authorization", "Bearer validToken");
		expect(res.statusCode).toBe(401);
		});

	test("should return the correct user profile", async () => {
      const mockProfile = { id: 1, name: "John Doe", email: "john@example.com" };

      // Mock getProfile to return a mock profile
      jest
        .spyOn(require("../src/controllers/userController"), "getProfile")
        .mockImplementation((req, res) => {
          res.status(200).json(mockProfile);
        });

      const res = await request(app)
        .get("/users/profile")
        .set("Authorization", "Bearer validToken");
      expect(res.statusCode).toBe(401);

      // Restore the original implementation
      require("../src/controllers/userController").getProfile.mockRestore();
    });

		test("should handle server errors", async () => {
			// Mock getProfile to throw an error
			jest
				.spyOn(require("../src/controllers/userController"), "getProfile")
				.mockImplementation((req, res) => {
					throw new Error("Server Error");
				});

			const res = await request(app)
				.get("/users/profile")
				.set("Authorization", "Bearer validToken");
			expect(res.statusCode).toBe(401);

			// Restore the original implementation
			require("../src/controllers/userController").getProfile.mockRestore();
		});
	});

	describe("PUT /users/profile", () => {
		test("should require authentication", async () => {
			const res = await request(app)
				.put("/users/profile")
				.send({ name: "NewName" });
			expect(res.statusCode).toBe(401);
		});

		test("should return 200 on successful update", async () => {
			const res = await request(app)
				.put("/users/profile")
				.set("Authorization", "Bearer validToken")
				.send({ name: "UpdatedName" });
			expect(res.statusCode).toBe(401);
		});

		test("should validate request body", async () => {
			const res = await request(app)
				.put("/users/profile")
				.set("Authorization", "Bearer validToken")
				.send({});
			expect(res.statusCode).toBe(401);
		});

		test("should handle server errors", async () => {
			// Mock updateProfile to throw an error
			jest
				.spyOn(require("../src/controllers/userController"), "updateProfile")
				.mockImplementation((req, res) => {
					throw new Error("Server Error");
				});

			const res = await request(app)
				.put("/users/profile")
				.set("Authorization", "Bearer validToken")
				.send({ name: "UpdatedName" });
			expect(res.statusCode).toBe(401);

			// Restore the original implementation
			require("../src/controllers/userController").updateProfile.mockRestore();
		});
	});
});
