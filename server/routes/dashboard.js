"use strict";
exports.__esModule = true;
var express = require('express');
var dashboardController_1 = require("../controllers/dashboardController");
var dataObjectBuilder_1 = require("../controllers/dataObjectBuilder");
var dashboardRouter = express.Router();
dashboardRouter.get('/cpuUsage', dashboardController_1["default"].cpuUsageOverTotalCpu, dataObjectBuilder_1["default"].dataObjectBuilder, function (req, res) {
    return res.status(200).json(req.app.locals.data);
});
dashboardRouter.get('/getAllMetrics', dashboardController_1["default"].getAllMetrics, dataObjectBuilder_1["default"].dataObjectBuilder, function (req, res) {
    return res.status(200).json(req.app.locals.data);
});
exports["default"] = dashboardRouter;
