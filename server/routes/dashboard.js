"use strict";
exports.__esModule = true;
var express = require('express');
var dashboardController_1 = require("../controllers/dashboardController");
var dataObjectBuilder_1 = require("../controllers/dataObjectBuilder");
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
//mainpage
dashboardRouter.get('/cpuUsage', dashboardController_1["default"].cpuUsageOverTotalCpu, dataObjectBuilder_1["default"].dataObjectBuilder, function (req, res) {
    //namespace metric/value will return multiple of the same values with different time stamp, just need the first one
    return res.status(200).json(req.app.locals.data);
});
//mainpage
dashboardRouter.get('/getAllMetrics', dashboardController_1["default"].getAllMetrics, dataObjectBuilder_1["default"].dataObjectBuilder, function (req, res) {
    console.log(res.locals.data);
    return res.status(200).json(req.app.locals.data);
});
exports["default"] = dashboardRouter;
