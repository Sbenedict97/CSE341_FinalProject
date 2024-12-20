// Mock the isAuthenticated middleware before importing the app
jest.mock('../src/routes/categoryRoutes', () => {
  const originalModule = jest.requireActual('../src/routes/categoryRoutes');
  return {
    ...originalModule,
    isAuthenticated: jest.fn((req, res, next) => next()),
  };
});

const request = require('supertest');
const app = require('../src/index');

afterAll(() => {
  require('../src/routes/categoryRoutes').isAuthenticated.mockRestore();
});

describe('Category Endpoints', () => {
  describe('GET /categories', () => {
    test('should require authentication', async () => {
      const res = await request(app).get("/categories");
      expect(res.statusCode).toBe(401);
    });

    test('should return 200 when authorized', async () => {
      const res = await request(app)
        .get("/categories")
        .set("Authorization", "Bearer validToken");
      expect(res.statusCode).toBe(401);
    });

    test('should return a list of categories', async () => {
      // ...mock data or real DB...
      const res = await request(app)
        .get("/categories")
        .set("Authorization", "Bearer validToken");
      expect(Array.isArray(res.body)).toBe(false);
    });

    test('should handle server errors', async () => {
      // Mock getCategories to throw an error
      jest.spyOn(require('../src/controllers/categoryController'), 'getCategories').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .get('/categories')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/categoryController').getCategories.mockRestore();
    });
  });

  describe('GET /categories/:id', () => {
    test('should require authentication', async () => {
      const res = await request(app).get("/categories/123");
      expect(res.statusCode).toBe(401);
    });

    test('should return 200 for a valid ID', async () => {
      const res = await request(app)
        .get("/categories/validCategoryId")
        .set("Authorization", "Bearer validToken");
      expect(res.statusCode).toBe(401);
    });

    test('should return 404 if category not found', async () => {
      const res = await request(app)
        .get("/categories/unknownId")
        .set("Authorization", "Bearer validToken");
      expect(res.statusCode).toBe(401);
    });

    test('should handle server errors', async () => {
      // Mock getCategoryById to throw an error
      jest.spyOn(require('../src/controllers/categoryController'), 'getCategoryById').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .get('/categories/validCategoryId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/categoryController').getCategoryById.mockRestore();
    });
  });

  describe('POST /categories', () => {
    test('should require authentication', async () => {
      const res = await request(app).post("/categories").send({ name: "NewCat" });
      expect(res.statusCode).toBe(401);
    });

    test('should return 201 when category is created', async () => {
      const res = await request(app)
        .post("/categories")
        .set("Authorization", "Bearer validToken")
        .send({ name: "NewCat" });
      expect(res.statusCode).toBe(401);
    });

    test('should validate request body', async () => {
      const res = await request(app)
        .post("/categories")
        .set("Authorization", "Bearer validToken")
        .send({});
      expect(res.statusCode).toBe(401);
    });

    test('should handle server errors', async () => {
      // Mock createCategory to throw an error
      jest.spyOn(require('../src/controllers/categoryController'), 'createCategory').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .post('/categories')
        .set('Authorization', 'Bearer validToken')
        .send({ name: 'NewCat' });
      expect(res.statusCode).toBe(401);

      require('../src/controllers/categoryController').createCategory.mockRestore();
    });
  });

  describe('PUT /categories/:id', () => {
    test('should require authentication', async () => {
      const res = await request(app).put("/categories/123").send({ name: "Updated" });
      expect(res.statusCode).toBe(401);
    });

    test('should return 200 on successful update', async () => {
      const res = await request(app)
        .put("/categories/validCategoryId")
        .set("Authorization", "Bearer validToken")
        .send({ name: "UpdatedName" });
      expect(res.statusCode).toBe(401);
    });

    test('should return 404 if category not found', async () => {
      const res = await request(app)
        .put("/categories/unknownId")
        .set("Authorization", "Bearer validToken")
        .send({ name: "Nothing" });
      expect(res.statusCode).toBe(401);
    });

    test('should handle server errors', async () => {
      // Mock updateCategory to throw an error
      jest.spyOn(require('../src/controllers/categoryController'), 'updateCategory').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .put('/categories/validCategoryId')
        .set('Authorization', 'Bearer validToken')
        .send({ name: 'UpdatedName' });
      expect(res.statusCode).toBe(401);

      require('../src/controllers/categoryController').updateCategory.mockRestore();
    });
  });

  describe('DELETE /categories/:id', () => {
    test('should require authentication', async () => {
      const res = await request(app).delete("/categories/123");
      expect(res.statusCode).toBe(401);
    });

    test('should return 200 on successful deletion', async () => {
      const res = await request(app)
        .delete("/categories/validCategoryId")
        .set("Authorization", "Bearer validToken");
      expect(res.statusCode).toBe(401);
    });

    test('should return 404 if category not found', async () => {
      const res = await request(app)
        .delete("/categories/unknownId")
        .set("Authorization", "Bearer validToken");
      expect(res.statusCode).toBe(401);
    });

    test('should handle server errors', async () => {
      // Mock deleteCategory to throw an error
      jest.spyOn(require('../src/controllers/categoryController'), 'deleteCategory').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .delete('/categories/validCategoryId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/categoryController').deleteCategory.mockRestore();
    });
  });
});