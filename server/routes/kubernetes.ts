const express = require('express');
import { Request, Response } from 'express';
import kubernetesController from '../controllers/kubernetesController';

const kubernetesRouter = express.Router();

// kubernetesRouter.get(
//   '/totalRestarts',
//   kubernetesController.totalRestarts,
//   (req: Request, res: Response) => {
//     return res.status(200).json(res.locals.restarts);
//   }
// );
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
// kubernetesRouter.get(
//   '/podsNotReady',
//   kubernetesController.podsNotReady,
//   (req: Request, res: Response) => {
//     return res
//       .status(200)
//       .json(parseInt(res.locals.ready.data.result[0].values[0][1]));
//   }
// );
kubernetesRouter.get(
  '/namespaceMetrics/:namespaceName',
  kubernetesController.getNameSpaceMetrics,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.namespaceData);
  }
);
kubernetesRouter.get(
  '/podMetrics/:podName',
  kubernetesController.getPodMetrics,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.podData);
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
