"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const kubernetesController_1 = __importDefault(require("../controllers/kubernetesController"));
const kubernetesRouter = express.Router();
kubernetesRouter.get('/totalMem', kubernetesController_1.default.totalMem, (req, res) => {
    return res.status(200).send('hi');
});
kubernetesRouter.get('/totalCpu', kubernetesController_1.default.totalCpu, (req, res) => {
    return res.status(200).json(res.locals.cpu.data);
});
kubernetesRouter.get('/totalTransmit', kubernetesController_1.default.totalTransmit, (req, res) => {
    return res.status(200).send('hi');
});
kubernetesRouter.get('/totalReceive', kubernetesController_1.default.totalReceive, (req, res) => {
    return res.status(200).send('hi');
});
kubernetesRouter.get('/totalPods', kubernetesController_1.default.totalPods, (req, res) => {
    return res.status(200).send('hi');
});
exports.default = kubernetesRouter;
