"use strict";
exports.__esModule = true;
var express = require('express');
var kubernetesController_1 = require("../controllers/kubernetesController");
var kubernetesRouter = express.Router();
kubernetesRouter.get('/totalRestarts', kubernetesController_1["default"].totalRestarts, function (req, res) {
    return res.status(200).json(res.locals.restarts);
});
kubernetesRouter.get('/namespaceNames', kubernetesController_1["default"].namespaceNames, function (eq, res) {
    return res.status(200).json(res.locals.namespaceNames);
});
kubernetesRouter.get('/podNames', kubernetesController_1["default"].podNames, function (eq, res) {
    return res.status(200).json(res.locals.names);
});
exports["default"] = kubernetesRouter;