"use strict";
exports.__esModule = true;
var express = require('express');
var kubernetesController_1 = require("../controllers/kubernetesController");
var dataObjectBuilder_1 = require("../controllers/dataObjectBuilder");
var kubernetesRouter = express.Router();
kubernetesRouter.get('/namespaceNames', kubernetesController_1["default"].namespaceNames, function (req, res) {
    return res.status(200).json(res.locals.namespaceNames);
});
kubernetesRouter.get('/podNames', kubernetesController_1["default"].podNames, function (req, res) {
    return res.status(200).json(res.locals.names);
});
kubernetesRouter.get('/namespaceMetrics/:namespaceName', kubernetesController_1["default"].getNameSpaceMetrics, dataObjectBuilder_1["default"].dataObjectBuilder, function (req, res) {
    return res.status(200).json(req.app.locals.data);
});
kubernetesRouter.get('/podMetrics/:podName', kubernetesController_1["default"].getPodMetrics, dataObjectBuilder_1["default"].dataObjectBuilder, function (req, res) {
    return res.status(200).json(req.app.locals.data);
});
kubernetesRouter.get('/podsNotReadyNames/', kubernetesController_1["default"].podsNotReadyNames, function (req, res) {
    return res.status(200).json(res.locals.status);
});
exports["default"] = kubernetesRouter;
