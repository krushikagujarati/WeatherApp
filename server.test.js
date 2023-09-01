const request = require('supertest');
const app = require('./server'); // Assuming the server file is named 'server.js'

describe('API Endpoints', () => {
  // Test the '/cities' endpoint
  describe('GET /cities', () => {
    it('should return a list of cities', async () => {
      const response = await request(app).get('/cities');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        "New York",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
      ]);
    });
  });

  // Test the '/weather/:city' endpoint
  describe('GET /weather/:city', () => {
    it('should return weather data for a valid city', async () => {
      const response = await request(app).get('/weather/New York');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'New York');
      expect(response.body).toHaveProperty('main');
      expect(response.body).toHaveProperty('weather');
    });

    it('should return an error for an invalid city', async () => {
      const response = await request(app).get('/weather/InvalidCity');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  // Test error handling
  describe('Error Handling', () => {
    it('should return a 404 error for a non-existing endpoint', async () => {
      const response = await request(app).get('/non-existing-endpoint');
      expect(response.status).toBe(404);
    });

    it('should return a 404 error when city is not specified', async () => {
      const response = await request(app).get('/weather');
      expect(response.status).toBe(404);
    });
  });
});