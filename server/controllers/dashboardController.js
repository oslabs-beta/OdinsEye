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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var k8s = require('@kubernetes/client-node');
//prometheus client for node.js
var client = require('prom-client');
var start = new Date(Date.now() - 1440 * 60000).toISOString();
var end = new Date(Date.now()).toISOString();
var kc = new k8s.KubeConfig();
kc.loadFromDefault();
//CoreV1Api: it allows access to core k8 resources such as services
var k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//AppsV1Api: it allows access to app/v1 resources such as deployments and k8s
var k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);
//NetworkV1Api: (ingress) - Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
//https://docs.okd.io/latest/rest_api/network_apis/ingress-networking-k8s-io-v1.html
var k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);
//to collect default metrics directly from prometheus client 
//https://github.com/siimon/prom-client
client.collectDefaultMetrics();
var dashboardController = {
    totalCpu: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 1:
                    response = _b.sent();
                    _a = res.locals;
                    return [4 /*yield*/, response.data];
                case 2:
                    _a.totalCpu = _b.sent();
                    // console.log(res.locals.cpu);
                    return [2 /*return*/, next()];
                case 3:
                    err_1 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getTotalCpu: ".concat(err_1),
                            status: 500,
                            message: 'Error occured while retrieving dashboard cpu data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    totalMem: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 1:
                    response = _b.sent();
                    _a = res.locals;
                    return [4 /*yield*/, response.data];
                case 2:
                    _a.totalMem = _b.sent();
                    return [2 /*return*/, next()];
                case 3:
                    err_2 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getTotalCpu: ".concat(err_2),
                            status: 500,
                            message: 'Error occured while retrieving dashboard mem data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    totalPods: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=count(kube_pod_info)&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 1:
                    response = _b.sent();
                    _a = res.locals;
                    return [4 /*yield*/, response];
                case 2:
                    _a.totalPods = _b.sent();
                    // console.log(res.locals.totalPods);
                    return [2 /*return*/, next()];
                case 3:
                    err_3 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getTotalCpu: ".concat(err_3),
                            status: 500,
                            message: 'Error occured while retrieving dashboard pods data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    totalReceive: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a, err_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total[10m]))&start=".concat(start, "&end=").concat(end, "&step=10m"))];
                case 1:
                    data = _b.sent();
                    _a = res.locals;
                    return [4 /*yield*/, data];
                case 2:
                    _a.totalReceive = _b.sent();
                    return [2 /*return*/, next()];
                case 3:
                    err_4 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getTotalCpu: ".concat(err_4),
                            status: 500,
                            message: 'Error occured while retrieving dashboard receive data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    totalTransmit: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, err_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[10m]))&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 1:
                    response = _b.sent();
                    _a = res.locals;
                    return [4 /*yield*/, response];
                case 2:
                    _a.totalTransmit = _b.sent();
                    return [2 /*return*/, next()];
                case 3:
                    err_5 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getTotalCpu: ".concat(err_5),
                            status: 500,
                            message: 'Error occured while retrieving dashboard transmit data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    totalNamespaces: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var response, _a, err_6;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=count(kube_namespace_created)&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 1:
                    response = _b.sent();
                    _a = res.locals;
                    return [4 /*yield*/, response];
                case 2:
                    _a.totalNamespaces = _b.sent();
                    return [2 /*return*/, next()];
                case 3:
                    err_6 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getTotalCpu: ".concat(err_6),
                            status: 500,
                            message: 'Error occured while retrieving dashboard transmit data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = dashboardController;
