const express = require('express');
import { Request, Response } from 'express';
import dashboardController from '../controllers/dashboardController';

const dashboardRouter = express.Router();

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

dashboardRouter.get(
  '/cpuUsage',
  dashboardController.cpuUsageOverTotalCpu,
  (req: Request, res: Response) => {
    //namespace metric/value will return multiple of the same values with different time stamp, just need the first one
    return res.status(200).json(res.locals.cpuUsageOverTotalCpu);
  }
); 


dashboardRouter.get(
  '/getAllMetrics',
  dashboardController.getAllMetrics,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.dashboard);
  }
);


export default dashboardRouter;
