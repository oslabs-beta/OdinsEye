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
var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var dashboard_1 = require("./routes/dashboard");
var kubernetes_1 = require("./routes/kubernetes");
var mongo_1 = require("./routes/mongo");
var axios_1 = require("axios");
var cors = require('cors');
var app = express();
var PORT = 3000;
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    var cookie = req.cookies.cookieName;
    if (cookie == undefined) {
        var randomNum = Math.random().toString();
        randomNum = randomNum.substring(2, randomNum.length);
        res.cookie('cookieName', randomNum, { maxAge: 90000, httpOnly: true });
    }
    return next();
});
if (process.env.NODE_ENV) {
    app.use('/', express.static(path.join(__dirname, '../dist')));
}
app.use('/kubernetes', function (req, res) {
    express.static(path.join(__dirname, '../client/index.html'));
});
app.use('/mongo', function (req, res) {
    express.static(path.join(__dirname, '../client/index.html'));
});
app.use('/api/dashboard', dashboard_1["default"]);
app.use('/api/kubernetesMetrics', kubernetes_1["default"]);
app.use('/api/mongodb', mongo_1["default"]);
app.get('/dashboard', function (req, res) {
    return res.status(200).send('hi');
});
//network received/transmitted
app.use('/live/received', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, timer;
    return __generator(this, function (_a) {
        headers = {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache'
        };
        res.writeHead(200, headers);
        timer = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            var start, end, response, data, newData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = new Date(Date.now() - 10000).toISOString();
                        end = new Date(Date.now() - 5000).toISOString();
                        return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total[10m]))&start=".concat(start, "&end=").concat(end, "&step=10m"))];
                    case 1:
                        response = _a.sent();
                        data = response.data.data.result[0].values[0];
                        newData = "data: ".concat(JSON.stringify(data), "\n\n");
                        res.write(newData);
                        return [2 /*return*/];
                }
            });
        }); }, 1500);
        res.on('close', function () {
            res.end();
            clearInterval(timer);
            console.log('Connection closed');
        });
        return [2 /*return*/];
    });
}); });
app.use('/live/transmit', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var headers, timer;
    return __generator(this, function (_a) {
        headers = {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache'
        };
        res.writeHead(200, headers);
        timer = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
            var start, end, response, data, newData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = new Date(Date.now() - 10000).toISOString();
                        end = new Date(Date.now() - 5000).toISOString();
                        return [4 /*yield*/, axios_1["default"].get("http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[10m]))&start=".concat(start, "&end=").concat(end, "&step=5m"))];
                    case 1:
                        response = _a.sent();
                        data = response.data.data.result[0].values[0];
                        newData = "data: ".concat(JSON.stringify(data), "\n\n");
                        res.write(newData);
                        return [2 /*return*/];
                }
            });
        }); }, 1500);
        res.on('close', function () {
            res.end();
            clearInterval(timer);
            console.log('Connection closed');
        });
        return [2 /*return*/];
    });
}); });
//redirect to page 404 when endpoint does not exist
app.use('*', function (req, res) {
    return res.status(404).send('404 Page Not Found');
});
//global error handling
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' }
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
//start app on port
app.listen(PORT, function () {
    console.log("Server listening on port: ".concat(PORT, "..."));
});
setTimeout;
module.exports = app;
