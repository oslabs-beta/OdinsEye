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
var start = new Date(Date.now() - 1440 * 60000).toISOString();
var end = new Date(Date.now()).toISOString();
var mongoController = {
    mongoMetrics: function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var queryObject, _a, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    queryObject = {
                        opcounter: 'sum(rate(mongodb_ss_opcounters[5m]))',
                        connections: 'mongodb_ss_connections{conn_type="active"}',
                        queues: 'sum(mongodb_ss_globalLock_currentQueue)',
                        latency: 'rate(mongodb_ss_opLatencies_latency[5m])',
                        uptime: 'mongodb_ss_uptime',
                        memory: 'mongodb_sys_memory_MemAvailable_kb',
                        processes: 'mongodb_sys_cpu_procs_running'
                    };
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    _a = res.locals;
                    return [4 /*yield*/, DataObjectBuilder(queryObject)];
                case 2:
                    _a.mongoData = _b.sent();
                    return [2 /*return*/, next()];
                case 3:
                    err_1 = _b.sent();
                    return [2 /*return*/, next({
                            log: "Error in mongoController.mongoMetrics: ".concat(err_1),
                            status: 500,
                            message: 'Error occured while retrieving mongo metric data'
                        })];
                case 4: return [2 /*return*/];
            }
        });
    }); }
};
var DataObjectBuilder = function (obj) { return __awaiter(void 0, void 0, void 0, function () {
    var objectData, _a, _b, _i, key, response, err_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                objectData = {};
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                _a = [];
                for (_b in obj)
                    _a.push(_b);
                _i = 0;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                key = _a[_i];
                return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=".concat(obj[key], "&start=").concat(start, "&end=").concat(end, "&step=5m"))];
            case 3:
                response = _c.sent();
                objectData[key] = [response.data.data.result[0].values];
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_2 = _c.sent();
                return [2 /*return*/, err_2];
            case 7: return [2 /*return*/, objectData];
        }
    });
}); };
exports["default"] = mongoController;
