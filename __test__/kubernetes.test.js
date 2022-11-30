// import kubernetesRouter from "../dist/server/routes/kubernetes"
// import express from "express"
// import request from 'supertest';

const request = require("supertest");
const app = require('../server/server');


describe('testing for kubernete pod metrics', function () {
    describe('/api/kubernetesMetrics', function(){
        it('/totalRestarts', async () =>{
            const res = await (request(app).get('/api/kubernetesMetrics/totalRestarts'))
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
            expect(typeof res).toBe('object');
        }),
        it('/namespaceNames', async () =>{
            const res = await (request(app).get('/api/kubernetesMetrics/namespaceNames'))
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
            expect(typeof res).toBe('object');
        }),
        it('/podNames', async () =>{
            const res = await (request(app).get('/api/kubernetesMetrics/podNames'))
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
            expect(typeof res).toBe('object');
        }),
        it('/podsNotReady', async () =>{
            const res = await (request(app).get('/api/kubernetesMetrics/podsNotReady'))
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
            expect(typeof res).toBe('object');
        }),
        it('/namespaceMetrics/:namespaceName', async () =>{
            const res = await (request(app).get('/api/kubernetesMetrics/namespaceMetrics/prometheus'))
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
            expect(typeof res).toBe('object');
        }),
        it('//podMetrics/:podName', async () =>{
            const res = await (request(app).get('/api/kubernetesMetrics//podMetrics/mongodb-0'))
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
            expect(typeof res).toBe('object');
        }),
        it('/podsNotReadyNames', async () =>{
            const res = await (request(app).get('/api/kubernetesMetrics/podsNotReadyNames'))
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.statusCode).toBe(200);
            expect(typeof res).toBe('object');
        })
    })
});