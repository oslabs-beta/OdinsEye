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
//const k8s = require('@kubernetes/client-node');
//prometheus client for node.js
//const client = require('prom-client');
var start = new Date(Date.now() - 1440 * 60000).toISOString();
var end = new Date(Date.now()).toISOString();
// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();
// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// const k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);
// const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);
//to collect default metrics directly from prometheus client 
//https://github.com/siimon/prom-client
// client.collectDefaultMetrics();
var kubernetesController = {
    totalRestarts: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var restartQuery, response, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    restartQuery = 'sum+by+(namespace)(changes(kube_pod_status_ready{condition="true"}[5m]))';
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    console.log('into try block');
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum+by(namespace)(changes(kube_pod_status_ready{condition=\"true\"}[5m]))&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 2:
                    response = _b.sent();
                    console.log(response.data);
                    _a = res.locals;
                    return [4 /*yield*/, response.data];
                case 3:
                    _a.restarts = _b.sent();
                    console.log(res.locals.restarts);
                    return [2 /*return*/, next()];
                case 4:
                    err_1 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in kuberenetesController.getTotalRestarts: ".concat(err_1),
                            status: 500,
                            message: 'Error occured while retrieving dashboard cpu data'
                        })];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    namespaceNames: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var namespaceQuery, response, array, namespaceArray_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    namespaceQuery = 'sum+by+(namespace)+(kube_pod_info)';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log('into try block');
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=".concat(namespaceQuery, "&start=").concat(start, "&end=").concat(end, "&step=5m"))];
                case 2:
                    response = _a.sent();
                    array = response.data.data.result;
                    namespaceArray_1 = [];
                    array.forEach(function (element) {
                        namespaceArray_1.push(element.metric.namespace);
                    });
                    res.locals.namespaceNames = namespaceArray_1;
                    console.log(res.locals.namespaceNames);
                    // res.locals.restarts = await response.data;
                    // console.log(res.locals.restarts);
                    return [2 /*return*/, next()];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error in kuberenetesController.getTotalRestarts: ".concat(err_2),
                            status: 500,
                            message: 'Error occured while retrieving dashboard cpu data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); },
    podNames: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var podNameQuery, response, array, podNameArray_1, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    podNameQuery = 'sum+by+(pod)+(kube_pod_info)';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log('into try block');
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=".concat(podNameQuery, "&start=").concat(start, "&end=").concat(end, "&step=5m"))];
                case 2:
                    response = _a.sent();
                    console.log(response.data.data.result);
                    array = response.data.data.result;
                    podNameArray_1 = [];
                    array.forEach(function (element) {
                        podNameArray_1.push(element.metric.pod);
                    });
                    res.locals.names = podNameArray_1;
                    console.log(res.locals.names);
                    // res.locals.restarts = await response.data;
                    // console.log(res.locals.restarts);
                    return [2 /*return*/, next()];
                case 3:
                    err_3 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error in kuberenetesController.getTotalRestarts: ".concat(err_3),
                            status: 500,
                            message: 'Error occured while retrieving dashboard cpu data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = kubernetesController;