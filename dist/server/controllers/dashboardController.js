"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const k8s = require('@kubernetes/client-node');
//prometheus client for node.js
const client = require('prom-client');
const start = new Date(Date.now() - 1440 * 60000).toISOString();
const end = new Date(Date.now()).toISOString();
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);
const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);
//to collect default metrics directly from prometheus client 
//https://github.com/siimon/prom-client
client.collectDefaultMetrics();
const dashboardController = {
    totalCpu: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            //error: The Fetch API is an experimental feature. This feature could change at any time
            //if i use axios to make a fetch request, I get the error cannot read 'get' ...
            // const res = await fetch(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=5m`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            // const json = await res.json();
            // console.log(json);
            const response = yield axios_1.default.get(`http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=5m`);
            res.locals.cpu = yield response.data;
            console.log(res.locals.cpu);
            return next();
        }
        catch (err) {
            return next({
                log: `Error in dashboardController.getTotalCpu: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard cpu data',
            });
        }
    }),
    totalMem: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            return next({
                log: `Error in dashboardController.getTotalCpu: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard mem data',
            });
        }
    }),
    totalPods: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            return next({
                log: `Error in dashboardController.getTotalCpu: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard pods data',
            });
        }
    }),
    totalReceive: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            return next({
                log: `Error in dashboardController.getTotalCpu: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard receive data',
            });
        }
    }),
    totalTransmit: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            return next({
                log: `Error in dashboardController.getTotalCpu: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard transmit data',
            });
        }
    })
};
exports.default = dashboardController;
