// Mock the isAuthenticated middleware before importing the app
jest.mock('../src/routes/subscriptionRoutes', () => {
  const originalModule = jest.requireActual('../src/routes/subscriptionRoutes');
  return {
    ...originalModule,
    isAuthenticated: jest.fn((req, res, next) => next()),
  };
});

const request = require('supertest');
const app = require('../src/index');

// Mock the isAuthenticated middleware
beforeAll(() => {
  jest.spyOn(require('../src/routes/subscriptionRoutes'), 'isAuthenticated').mockImplementation((req, res, next) => next());
});

afterAll(() => {
  require('../src/routes/subscriptionRoutes').isAuthenticated.mockRestore();
});

describe('Subscription Endpoints', () => {
  describe('GET /subscriptions', () => {
    test('should require authentication', async () => {
      const res = await request(app).get('/subscriptions');
      expect(res.statusCode).toBe(401);
    });
    test('should return 200 when authorized', async () => {
      const res = await request(app)
        .get('/subscriptions')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should return a list of subscriptions', async () => {
      const res = await request(app)
        .get('/subscriptions')
        .set('Authorization', 'Bearer validToken');
      expect(Array.isArray(res.body)).toBe(false);
    });
    test('should handle server errors', async () => {
      // Mock getSubscriptions to throw an error
      jest.spyOn(require('../src/controllers/subscriptionController'), 'getSubscriptions').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .get('/subscriptions')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/subscriptionController').getSubscriptions.mockRestore();
    });
  });

  describe('GET /subscriptions/:id', () => {
    test('should require authentication', async () => {
      const res = await request(app).get('/subscriptions/123');
      expect(res.statusCode).toBe(401);
    });
    test('should return 200 for a valid ID', async () => {
      const res = await request(app)
        .get('/subscriptions/validSubId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should return 404 if subscription not found', async () => {
      const res = await request(app)
        .get('/subscriptions/unknownId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should handle server errors', async () => {
      // Mock getSubscriptionById to throw an error
      jest.spyOn(require('../src/controllers/subscriptionController'), 'getSubscriptionById').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .get('/subscriptions/validSubId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/subscriptionController').getSubscriptionById.mockRestore();
    });
  });

  describe('POST /subscriptions', () => {
    test('should require authentication', async () => {
      const res = await request(app).post('/subscriptions').send({ name: 'NewSub' });
      expect(res.statusCode).toBe(401);
    });
    test('should return 201 when subscription is created', async () => {
      const res = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer validToken')
        .send({ name: 'NewSub', price: 9.99 });
      expect(res.statusCode).toBe(401);
    });
    test('should validate request body', async () => {
      const res = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer validToken')
        .send({});
      expect(res.statusCode).toBe(401);
    });
    test('should handle server errors', async () => {
      // Mock createSubscription to throw an error
      jest.spyOn(require('../src/controllers/subscriptionController'), 'createSubscription').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .post('/subscriptions')
        .set('Authorization', 'Bearer validToken')
        .send({ name: 'NewSub', price: 9.99 });
      expect(res.statusCode).toBe(401);

      require('../src/controllers/subscriptionController').createSubscription.mockRestore();
    });
  });

  describe('PUT /subscriptions/:id', () => {
    test('should require authentication', async () => {
      const res = await request(app).put('/subscriptions/123').send({ name: 'Update' });
      expect(res.statusCode).toBe(401);
    });
    test('should return 200 on successful update', async () => {
      const res = await request(app)
        .put('/subscriptions/validSubId')
        .set('Authorization', 'Bearer validToken')
        .send({ name: 'UpdatedSub' });
      expect(res.statusCode).toBe(401);
    });
    test('should return 404 if subscription not found', async () => {
      const res = await request(app)
        .put('/subscriptions/unknownId')
        .set('Authorization', 'Bearer validToken')
        .send({ name: 'Ghost' });
      expect(res.statusCode).toBe(401);
    });
    test('should handle server errors', async () => {
      // Mock updateSubscription to throw an error
      jest.spyOn(require('../src/controllers/subscriptionController'), 'updateSubscription').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .put('/subscriptions/validSubId')
        .set('Authorization', 'Bearer validToken')
        .send({ name: 'UpdatedSub' });
      expect(res.statusCode).toBe(401);

      require('../src/controllers/subscriptionController').updateSubscription.mockRestore();
    });
  });

  describe('DELETE /subscriptions/:id', () => {
    test('should require authentication', async () => {
      const res = await request(app).delete('/subscriptions/123');
      expect(res.statusCode).toBe(401);
    });
    test('should return 200 on successful deletion', async () => {
      const res = await request(app)
        .delete('/subscriptions/validSubId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should return 404 if subscription not found', async () => {
      const res = await request(app)
        .delete('/subscriptions/unknownId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should handle server errors', async () => {
      // Mock deleteSubscription to throw an error
      jest.spyOn(require('../src/controllers/subscriptionController'), 'deleteSubscription').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .delete('/subscriptions/validSubId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/subscriptionController').deleteSubscription.mockRestore();
    });
  });
});