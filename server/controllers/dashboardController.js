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
    getAllMetrics: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var cpuResponse, memResponse, podsResponse, notReadyPodsResponse, transmitResponse, receiveData, namespacesResponse, _a, _b, _c, _d, err_1;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 15, , 16]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 1:
                    cpuResponse = _f.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 2:
                    memResponse = _f.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=count(kube_pod_info)&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 3:
                    podsResponse = _f.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(kube_pod_status_ready{condition=\"false\"})&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 4:
                    notReadyPodsResponse = _f.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[10m]))&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 5:
                    transmitResponse = _f.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total[10m]))&start=".concat(start, "&end=").concat(end, "&step=10m"))];
                case 6:
                    receiveData = _f.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=count(kube_namespace_created)&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 7:
                    namespacesResponse = _f.sent();
                    _a = res.locals;
                    _e = {};
                    return [4 /*yield*/, cpuResponse.data.data.result[0].values];
                case 8:
                    _e.totalCpu = [_f.sent()];
                    return [4 /*yield*/, memResponse.data.data.result[0].values];
                case 9:
                    _e.totalMem = [_f.sent()];
                    _b = parseInt;
                    return [4 /*yield*/, podsResponse.data.data.result[0].values[0][1]];
                case 10:
                    _e.totalPods = [_b.apply(void 0, [_f.sent()])];
                    _c = parseInt;
                    return [4 /*yield*/, notReadyPodsResponse.data.data.result[0].values[0][1]];
                case 11:
                    _e.notReadyPods = [_c.apply(void 0, [_f.sent()])];
                    return [4 /*yield*/, transmitResponse.data.data.result[0].values];
                case 12:
                    _e.totalTransmit = [_f.sent()];
                    return [4 /*yield*/, receiveData.data.data.result[0].values];
                case 13:
                    _e.totalReceive = [_f.sent()];
                    _d = parseInt;
                    return [4 /*yield*/, namespacesResponse.data.data.result[0].values[0][1]];
                case 14:
                    _a.dashboard = (_e.totalNamespaces = [_d.apply(void 0, [_f.sent()])],
                        _e);
                    return [2 /*return*/, next()];
                case 15:
                    err_1 = _f.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getAllMetrics: ".concat(err_1),
                            status: 500,
                            message: 'Error occured while retrieving dashboard all metrics data'
                        })];
                case 16: return [2 /*return*/];
            }
        });
    }); },
    // totalCpu: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=5m`
    //     );
    //     const totalCpu = await response.data;
    //     res.locals.dashboard = totalCpu.data.result[0].values
    //     // console.log(res.locals.cpu);
    //     return next();
    //   } catch (err) {
    //     return next({
    //       log: `Error in dashboardController.getTotalCpu: ${err}`,
    //       status: 500,
    //       message: 'Error occured while retrieving dashboard cpu data',
    //     });
    //   }
    // },
    // totalMem: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=${start}&end=${end}&step=5m`
    //     );
    //     const totalMem = await response.data;
    //     res.locals.dashboard = totalMem.data.result[0].values
    //     return next();
    //   } catch (err) {
    //     return next({
    //       log: `Error in dashboardController.getTotalCpu: ${err}`,
    //       status: 500,
    //       message: 'Error occured while retrieving dashboard mem data',
    //     });
    //   }
    // },
    // totalPods: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:9090/api/v1/query_range?query=count(kube_pod_info)&start=${start}&end=${end}&step=5m`
    //     );
    //     // console.log(response.data.data.result[0].values[0]);
    //     const totalPods = await response.data;
    //     res.locals.dashboard.totalPods = totalPods.data.result[0].values[0][1]
    //     return next();
    //   } catch (err) {
    //     return next({
    //       log: `Error in dashboardController.getTotalCpu: ${err}`,
    //       status: 500,
    //       message: 'Error occured while retrieving dashboard pods data',
    //     });
    //   }
    // },
    // totalReceive: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const data = await axios.get(
    //       `http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total[10m]))&start=${start}&end=${end}&step=10m`
    //     );
    //     const totalReceive = await data.data;
    //     res.locals.dashboard.totalReceive = totalReceive.data.result[0].values
    //     return next();
    //   } catch (err) {
    //     return next({
    //       log: `Error in dashboardController.getTotalCpu: ${err}`,
    //       status: 500,
    //       message: 'Error occured while retrieving dashboard receive data',
    //     });
    //   }
    // },
    // totalTransmit: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[10m]))&start=${start}&end=${end}&step=5m`
    //     );
    //     const totalTransmit = await response.data;
    //     res.locals.dashboard.totalTransmit = totalTransmit.data.result[0].values
    //     return next();
    //   } catch (err) {
    //     return next({
    //       log: `Error in dashboardController.getTotalCpu: ${err}`,
    //       status: 500,
    //       message: 'Error occured while retrieving dashboard transmit data',
    //     });
    //   }
    // },
    // totalNamespaces: async (req: Request, res: Response, next: NextFunction) => {
    //   try {
    //     const response = await axios.get(
    //       `http://localhost:9090/api/v1/query_range?query=count(kube_namespace_created)&start=${start}&end=${end}&step=5m`
    //     );
    //     const totalNamespaces = await response.data;
    //     res.locals.dashboard.totalNamespaces = totalNamespaces.data.result[0].values[0][1]
    //     return next();
    //   } catch (err) {
    //     return next({
    //       log: `Error in dashboardController.getTotalCpu: ${err}`,
    //       status: 500,
    //       message: 'Error occured while retrieving dashboard transmit data',
    //     });
    //   }
    // },
    cpuUsageOverTotalCpu: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var totalCpuUage, totalCore, percentageOfCore, cpuUsageOverTotalCpu, totalCoreInCluster, percent, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[5m]))&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 1:
                    totalCpuUage = _a.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(machine_cpu_cores)&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 2:
                    totalCore = _a.sent();
                    return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[5m]))/sum(machine_cpu_cores)*100&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                case 3:
                    percentageOfCore = _a.sent();
                    return [4 /*yield*/, totalCpuUage];
                case 4:
                    cpuUsageOverTotalCpu = _a.sent();
                    return [4 /*yield*/, totalCore];
                case 5:
                    totalCoreInCluster = _a.sent();
                    return [4 /*yield*/, percentageOfCore];
                case 6:
                    percent = _a.sent();
                    res.locals.cpuUsageOverTotalCpu = {
                        cpu: cpuUsageOverTotalCpu.data.data.result[0].values[1][1],
                        core: totalCoreInCluster.data.data.result[0].values[1][1],
                        percent: percent.data.data.result[0].values[1][1]
                    };
                    return [2 /*return*/, next()];
                case 7:
                    err_2 = _a.sent();
                    return [2 /*return*/, next({
                            log: "Error in dashboardController.getTotalCpu: ".concat(err_2),
                            status: 500,
                            message: 'Error occured while retrieving dashboard transmit data'
                        })];
                case 8: return [2 /*return*/];
            }
        });
    }); }
};
exports["default"] = dashboardController;
