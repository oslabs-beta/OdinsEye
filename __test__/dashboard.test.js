import request from 'supertest';
import app from '../server/server'
const server = "http://localhost:3000";

jest.useFakeTimers();
jest.setTimeout(30000);

describe("Route integration", () => {
    describe("/", () => {
      it('/dashboard', () => {
        return request(server)
          .get('/dashboard')
          .expect('Content-Type', "text/html; charset=utf-8")
          .expect(200)
        })
    });
});

describe("controller route integration", () => {
  describe("/api/dashboard", () => {
    it('/totalCpu', async () => {
      const res = await request(app).get('/api/dashboard/totalCpu')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(typeof res).toBe('object');
        });
      })
  });
  