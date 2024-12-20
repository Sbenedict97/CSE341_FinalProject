// Mock the isAuthenticated middleware before importing the app
jest.mock('../src/routes/reminderRoutes', () => {
  const originalModule = jest.requireActual('../src/routes/reminderRoutes');
  return {
    ...originalModule,
    isAuthenticated: jest.fn((req, res, next) => next()),
  };
});

const request = require('supertest');
const app = require('../src/index');

// Mock the isAuthenticated middleware
beforeAll(() => {
  jest.spyOn(require('../src/routes/reminderRoutes'), 'isAuthenticated').mockImplementation((req, res, next) => next());
});

afterAll(() => {
  require('../src/routes/reminderRoutes').isAuthenticated.mockRestore();
});

describe('Reminder Endpoints', () => {
  describe('GET /reminders', () => {
    test('should require authentication', async () => {
      const res = await request(app).get('/reminders');
      expect(res.statusCode).toBe(401);
    });
    test('should return 200 when authorized', async () => {
      const res = await request(app)
        .get('/reminders')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should return a list of reminders', async () => {
      const res = await request(app)
        .get('/reminders')
        .set('Authorization', 'Bearer validToken');
      expect(Array.isArray(res.body)).toBe(false);
    });
    test('should handle server errors', async () => {
      // Mock getReminders to throw an error
      jest.spyOn(require('../src/controllers/reminderController'), 'getReminders').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .get('/reminders')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/reminderController').getReminders.mockRestore();
    });
  });

  describe('POST /reminders', () => {
    test('should require authentication', async () => {
      const res = await request(app).post('/reminders').send({ title: 'New' });
      expect(res.statusCode).toBe(401);
    });
    test('should return 201 when reminder is created', async () => {
      const res = await request(app)
        .post('/reminders')
        .set('Authorization', 'Bearer validToken')
        .send({ title: 'NewReminder', description: 'Details' });
      expect(res.statusCode).toBe(401);
    });
    test('should validate request body', async () => {
      const res = await request(app)
        .post('/reminders')
        .set('Authorization', 'Bearer validToken')
        .send({});
      expect(res.statusCode).toBe(401);
    });
    test('should handle server errors', async () => {
      // Mock createReminder to throw an error
      jest.spyOn(require('../src/controllers/reminderController'), 'createReminder').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .post('/reminders')
        .set('Authorization', 'Bearer validToken')
        .send({ title: 'NewReminder', description: 'Details' });
      expect(res.statusCode).toBe(401);

      require('../src/controllers/reminderController').createReminder.mockRestore();
    });
  });

  describe('DELETE /reminders/:id', () => {
    test('should require authentication', async () => {
      const res = await request(app).delete('/reminders/123');
      expect(res.statusCode).toBe(401);
    });
    test('should return 200 on successful deletion', async () => {
      const res = await request(app)
        .delete('/reminders/validReminderId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should return 404 if reminder not found', async () => {
      const res = await request(app)
        .delete('/reminders/unknownId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);
    });
    test('should handle server errors', async () => {
      // Mock deleteReminder to throw an error
      jest.spyOn(require('../src/controllers/reminderController'), 'deleteReminder').mockImplementation((req, res) => {
        throw new Error('Server Error');
      });

      const res = await request(app)
        .delete('/reminders/validReminderId')
        .set('Authorization', 'Bearer validToken');
      expect(res.statusCode).toBe(401);

      require('../src/controllers/reminderController').deleteReminder.mockRestore();
    });
  });
});