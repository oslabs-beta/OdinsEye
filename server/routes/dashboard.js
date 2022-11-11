"use strict";
exports.__esModule = true;
var express = require('express');
var dashboardController_1 = require("../controllers/dashboardController");
var dashboardRouter = express.Router();
dashboardRouter.get('/totalMem', dashboardController_1["default"].totalMem, function (req, res) {
    return res.status(200).send('hi');
});
dashboardRouter.get('/totalCpu', dashboardController_1["default"].totalCpu, function (req, res) {
    return res.status(200).send('hi');
});
dashboardRouter.get('/totalTransmit', dashboardController_1["default"].totalTransmit, function (req, res) {
    return res.status(200).send('hi');
});
dashboardRouter.get('/totalReceive', dashboardController_1["default"].totalReceive, function (req, res) {
    return res.status(200).send('hi');
});
dashboardRouter.get('/totalPods', dashboardController_1["default"].totalPods, function (req, res) {
    return res.status(200).send('hi');
});
exports["default"] = dashboardRouter;
