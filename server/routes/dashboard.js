"use strict";
exports.__esModule = true;
var express = require('express');
var dashboardController_1 = require("../controllers/dashboardController");
var dashboardRouter = express.Router();
dashboardRouter.get('/totalMem', dashboardController_1["default"].totalMem, function (req, res) {
    return res.status(200).json(res.locals.totalMem.data);
});
dashboardRouter.get('/totalCpu', dashboardController_1["default"].totalCpu, function (req, res) {
    return res.status(200).json(res.locals.totalCpu.data);
});
dashboardRouter.get('/totalTransmit', dashboardController_1["default"].totalTransmit, function (req, res) {
    return res.status(200).json(res.locals.totalTransmit.data);
});
dashboardRouter.get('/totalReceive', dashboardController_1["default"].totalReceive, function (req, res) {
    return res.status(200).json(res.locals.totalReceive.data);
});
dashboardRouter.get('/totalPods', dashboardController_1["default"].totalPods, function (req, res) {
    //pods metric/value will return multiple of the same values with different time stamp, just need the first one
    return res.status(200).json(res.locals.totalPods.data);
});
dashboardRouter.get('/totalNamespaces', dashboardController_1["default"].totalNamespaces, function (req, res) {
    //namespace metric/value will return multiple of the same values with different time stamp, just need the first one
    return res.status(200).json(res.locals.totalNamespaces.data);
});
exports["default"] = dashboardRouter;
