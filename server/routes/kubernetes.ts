const express = require('express');
import { Request, Response } from 'express';
import kubernetesController from '../controllers/kubernetesController';
import dataController from '../controllers/dataObjectBuilder';

const kubernetesRouter = express.Router();

kubernetesRouter.get(
  '/namespaceNames',
  kubernetesController.namespaceNames,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.namespaceNames);
  }
);
kubernetesRouter.get(
  '/podNames',
  kubernetesController.podNames,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.names);
  }
);
kubernetesRouter.get(
  '/namespaceMetrics/:namespaceName',
  kubernetesController.getNameSpaceMetrics,
  dataController.dataObjectBuilder,
  (req: Request, res: Response) => {
    return res.status(200).json(req.app.locals.data);
  }
);
kubernetesRouter.get(
  '/podMetrics/:podName',
  kubernetesController.getPodMetrics,
  dataController.dataObjectBuilder,
  (req: Request, res: Response) => {
    return res.status(200).json(req.app.locals.data);
  }
);
kubernetesRouter.get(
  '/podsNotReadyNames/',
  kubernetesController.podsNotReadyNames,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.status);
  }
);

export default kubernetesRouter;
