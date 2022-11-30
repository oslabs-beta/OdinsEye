"use strict";
exports.__esModule = true;
var express = require('express');
var kubernetesController_1 = require("../controllers/kubernetesController");
var kubernetesRouter = express.Router();
// kubernetesRouter.get(
//   '/totalRestarts',
//   kubernetesController.totalRestarts,
//   (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.restarts);
//   }
// );
//getData.ts
kubernetesRouter.get('/namespaceNames', kubernetesController_1["default"].namespaceNames, function (req, res) {
    return res.status(200).json(res.locals.namespaceNames);
});
//kubmain
kubernetesRouter.get('/podNames', kubernetesController_1["default"].podNames, function (req, res) {
    return res.status(200).json(res.locals.names);
});
// kubmain
kubernetesRouter.get('/namespaceMetrics/:namespaceName', kubernetesController_1["default"].getNameSpaceMetrics, function (req, res) {
    return res.status(200).json(res.locals.namespaceData);
});
// request from popup
kubernetesRouter.get('/podMetrics/:podName', kubernetesController_1["default"].getPodMetrics, function (req, res) {
    return res.status(200).json(res.locals.podData);
});
//kubmain
kubernetesRouter.get('/podsNotReadyNames/', kubernetesController_1["default"].podsNotReadyNames, function (req, res) {
    return res.status(200).json(res.locals.status);
});
exports["default"] = kubernetesRouter;
