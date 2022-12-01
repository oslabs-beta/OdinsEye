const express = require('express');
import { Request, Response } from 'express';
import dashboardController from '../controllers/dashboardController';
import dataController from '../controllers/dataObjectBuilder';

const dashboardRouter = express.Router();

dashboardRouter.get(
  '/cpuUsage',
  dashboardController.cpuUsageOverTotalCpu,
  dataController.dataObjectBuilder,
  (req: Request, res: Response) => {
    return res.status(200).json(req.app.locals.data);
  }
);
dashboardRouter.get(
  '/getAllMetrics',
  dashboardController.getAllMetrics,
  dataController.dataObjectBuilder,
  (req: Request, res: Response) => {
    return res.status(200).json(req.app.locals.data);
  }
);

export default dashboardRouter;
