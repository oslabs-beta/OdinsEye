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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var types_1 = require("../../types");
var DataObjectBuilder = function (obj) { return __awaiter(void 0, void 0, void 0, function () {
    var objectData, _a, _b, _c, _i, key, _d, _e, _f, _g, query, response, _h, _j, _k, _l, query, response, data, _m, _o, _p, _q, query, response, err_1;
    return __generator(this, function (_r) {
        switch (_r.label) {
            case 0:
                objectData = {};
                _r.label = 1;
            case 1:
                _r.trys.push([1, 16, , 17]);
                _a = obj;
                _b = [];
                for (_c in _a)
                    _b.push(_c);
                _i = 0;
                _r.label = 2;
            case 2:
                if (!(_i < _b.length)) return [3 /*break*/, 15];
                _c = _b[_i];
                if (!(_c in _a)) return [3 /*break*/, 14];
                key = _c;
                if (!(key === 'linegraph')) return [3 /*break*/, 6];
                _d = obj[key];
                _e = [];
                for (_f in _d)
                    _e.push(_f);
                _g = 0;
                _r.label = 3;
            case 3:
                if (!(_g < _e.length)) return [3 /*break*/, 6];
                _f = _e[_g];
                if (!(_f in _d)) return [3 /*break*/, 5];
                query = _f;
                return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=".concat(obj[key][query], "&start=").concat(types_1.start, "&end=").concat(types_1.end, "&step=5m"))];
            case 4:
                response = _r.sent();
                if (response.data.data.result.length === 0) {
                    objectData[query] = [];
                }
                else {
                    objectData[query] = [response.data.data.result[0].values];
                }
                _r.label = 5;
            case 5:
                _g++;
                return [3 /*break*/, 3];
            case 6:
                if (!(key === 'donutint')) return [3 /*break*/, 10];
                _h = obj[key];
                _j = [];
                for (_k in _h)
                    _j.push(_k);
                _l = 0;
                _r.label = 7;
            case 7:
                if (!(_l < _j.length)) return [3 /*break*/, 10];
                _k = _j[_l];
                if (!(_k in _h)) return [3 /*break*/, 9];
                query = _k;
                return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=".concat(obj[key][query], "&start=").concat(types_1.start, "&end=").concat(types_1.end, "&step=5m"))];
            case 8:
                response = _r.sent();
                data = parseInt(response.data.data.result[0].values[0][1]);
                objectData[query] = [data];
                _r.label = 9;
            case 9:
                _l++;
                return [3 /*break*/, 7];
            case 10:
                if (!(key === 'cpubarchart')) return [3 /*break*/, 14];
                _m = obj[key];
                _o = [];
                for (_p in _m)
                    _o.push(_p);
                _q = 0;
                _r.label = 11;
            case 11:
                if (!(_q < _o.length)) return [3 /*break*/, 14];
                _p = _o[_q];
                if (!(_p in _m)) return [3 /*break*/, 13];
                query = _p;
                return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=".concat(obj[key][query], "&start=").concat(types_1.start, "&end=").concat(types_1.end, "&step=5m"))];
            case 12:
                response = _r.sent();
                objectData[query] = [response.data.data.result[0].values[1][1]];
                _r.label = 13;
            case 13:
                _q++;
                return [3 /*break*/, 11];
            case 14:
                _i++;
                return [3 /*break*/, 2];
            case 15: return [3 /*break*/, 17];
            case 16:
                err_1 = _r.sent();
                return [2 /*return*/, err_1];
            case 17: return [2 /*return*/, objectData];
        }
    });
}); };
exports["default"] = DataObjectBuilder;
