"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const dashboardController_1 = __importDefault(require("../controllers/dashboardController"));
const dashboardRouter = express.Router();
dashboardRouter.get('/totalMem', dashboardController_1.default.totalMem, (req, res) => {
    return res.status(200).send('hi');
});
dashboardRouter.get('/totalCpu', dashboardController_1.default.totalCpu, (req, res) => {
    return res.status(200).json(res.locals.cpu.data);
});
dashboardRouter.get('/totalTransmit', dashboardController_1.default.totalTransmit, (req, res) => {
    return res.status(200).send('hi');
});
dashboardRouter.get('/totalReceive', dashboardController_1.default.totalReceive, (req, res) => {
    return res.status(200).send('hi');
});
dashboardRouter.get('/totalPods', dashboardController_1.default.totalPods, (req, res) => {
    return res.status(200).send('hi');
});
exports.default = dashboardRouter;
