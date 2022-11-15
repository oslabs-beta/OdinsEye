"use strict";
exports.__esModule = true;
var express = require('express');
var kubernetesController_1 = require("../controllers/kubernetesController");
var kubernetesRouter = express.Router();
kubernetesRouter.get('/totalRestarts', kubernetesController_1["default"].totalRestarts, function (req, res) {
    return res.status(200).json(res.locals.restarts);
});
kubernetesRouter.get('/namespaceNames', kubernetesController_1["default"].namespaceNames, function (req, res) {
    return res.status(200).json(res.locals.namespaceNames);
});
kubernetesRouter.get('/podNames', kubernetesController_1["default"].podNames, function (req, res) {
    return res.status(200).json(res.locals.names);
});
kubernetesRouter.get('/podsNotReady', kubernetesController_1["default"].podsNotReady, function (req, res) {
    return res.status(200).json(res.locals.ready);
});
kubernetesRouter.get('/namespaceMetrics/:namespaceName', kubernetesController_1["default"].getNameSpaceMetrics, function (req, res) {
    return res.status(200).json(res.locals.namespaceData);
});
kubernetesRouter.get('/podMetrics/:podName', kubernetesController_1["default"].getPodMetrics, function (req, res) {
    return res.status(200).json(res.locals.podData);
});
exports["default"] = kubernetesRouter;
