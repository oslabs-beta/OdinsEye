import request from 'supertest';
import app from '../server/server'
const server = "http://localhost:3000";


describe("Route integration", () => {
  describe("/", () => {
    describe("GET", () => {
      it("responds with 200 status and text/html content type", () => {
        return request(server)
          .get("/")
          .expect("Content-Type", 'text/html; charset=UTF-8')
          .expect(200);
      });
    });
  });
});


describe("dashboard route to return hi", () => {
    describe("/", () => {
      it('/dashboard', () => {
        return request(app)
          .get('/dashboard')
          .expect('Content-Type', "text/html; charset=utf-8")
          .expect(200)
        })
    });
});

describe("dashboard controller route integration", () => {
  describe("/api/dashboard", () => {
    it('/totalCpu', async () => {
      const res = await request(app).get('/api/dashboard/totalCpu')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(typeof res).toBe('object');
    }),
    it('/totalMem', async () => {
      const res = await request(app).get('/api/dashboard/totalMem')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(typeof res).toBe('object');
    }),
    it('/totalPods', async () => {
      const res = await request(app).get('/api/dashboard/totalPods')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(typeof res).toBe('object');
    }),
    it('/totalReceive', async () => {
      const res = await request(app).get('/api/dashboard/totalReceive')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(typeof res).toBe('object');
    }),
    it('/totalTransmit', async () => {
      const res = await request(app).get('/api/dashboard/totalTransmit')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(typeof res).toBe('object');
    }),
    it('/totalNamespaces', async () => {
      const res = await request(app).get('/api/dashboard/totalNamespaces')
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(typeof res).toBe('object');
    });
  })
});
  