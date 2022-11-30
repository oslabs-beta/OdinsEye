import request from 'supertest';
import app from '../server/server';
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', 'text/html; charset=UTF-8')
          .expect(200);
      });
    });
  });
});

describe('dashboard route to return hi', () => {
  describe('/', () => {
    it('/dashboard', () => {
      return request(app)
        .get('/dashboard')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200);
    });
  });
});

describe('dashboard controller route integration', () => {
  it('/getAllMetrics', async () => {
    const res = await request(app).get('/api/dashboard/getAllMetrics');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    expect(typeof res).toBe('object');
  }),
    it('/cpuUsage', async () => {
      const res = await request(app).get('/api/dashboard/cpuUsage');
      expect(res.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(res.statusCode).toBe(200);
      expect(typeof res).toBe('object');
    });
});
