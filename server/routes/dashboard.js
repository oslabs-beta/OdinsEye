"use strict";
exports.__esModule = true;
var express = require('express');
var dashboardController_1 = require("../controllers/dashboardController");
var dashboardRouter = express.Router();
// dashboardRouter.get(
//   '/totalMem',
//   dashboardController.totalMem,
//   (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.dashboard.totalMem);
//   }
// );
// dashboardRouter.get(
//   '/totalCpu',
//   dashboardController.totalCpu,
//   (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.dashboard);
//   }
// );
// dashboardRouter.get(
//   '/totalTransmit',
//   dashboardController.totalTransmit,
//   (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.dashboard);
//   }
// );
// dashboardRouter.get(
//   '/totalReceive',
//   dashboardController.totalReceive,
//   (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.dashboard);
//   }
// );
// dashboardRouter.get(
//   '/totalPods',
//   dashboardController.totalPods,
//   (req: Request, res: Response) => {
//     //pods metric/value will return multiple of the same values with different time stamp, just need the first one
//     return res
//       .status(200)
//       .json(res.locals.dashboard);
//   }
// );
// dashboardRouter.get(
//   '/totalNamespaces',
//   dashboardController.totalNamespaces,
//   (req: Request, res: Response) => {
//     //namespace metric/value will return multiple of the same values with different time stamp, just need the first one
//     return res.status(200).json(res.locals.dashboard);
//   },
dashboardRouter.get('/cpuUsage', dashboardController_1["default"].cpuUsageOverTotalCpu, function (req, res) {
    //namespace metric/value will return multiple of the same values with different time stamp, just need the first one
    return res.status(200).json(res.locals.cpuUsageOverTotalCpu);
});
dashboardRouter.get('/getAllMetrics', dashboardController_1["default"].getAllMetrics, function (req, res) {
    return res.status(200).json(res.locals.dashboard);
});
exports["default"] = dashboardRouter;
