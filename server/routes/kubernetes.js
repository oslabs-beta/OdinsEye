"use strict";
exports.__esModule = true;
var express = require('express');
var kubernetesController_1 = require("../controllers/kubernetesController");
var kubernetesRouter = express.Router();
kubernetesRouter.get('/totalMem', kubernetesController_1["default"].totalMem, function (req, res) {
    return res.status(200).send('hi');
});
kubernetesRouter.get('/totalCpu', kubernetesController_1["default"].totalCpu, function (req, res) {
    return res.status(200).json(res.locals.cpu.data);
});
kubernetesRouter.get('/totalTransmit', kubernetesController_1["default"].totalTransmit, function (req, res) {
    return res.status(200).send('hi');
});
kubernetesRouter.get('/totalReceive', kubernetesController_1["default"].totalReceive, function (req, res) {
    return res.status(200).send('hi');
});
kubernetesRouter.get('/totalPods', kubernetesController_1["default"].totalPods, function (req, res) {
    return res.status(200).send('hi');
});
exports["default"] = kubernetesRouter;
