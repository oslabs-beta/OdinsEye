const express = require('express');
import { Request, Response } from 'express';
import kubernetesController from '../controllers/kubernetesController';

const kubernetesRouter = express.Router();

kubernetesRouter.get('/totalRestarts', kubernetesController.totalRestarts, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.restarts);
})
kubernetesRouter.get('/namespaceNames', kubernetesController.namespaceNames, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.namespaceNames)
})
kubernetesRouter.get('/podNames', kubernetesController.podNames, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.names)
})
kubernetesRouter.get('/podsNotReady', kubernetesController.podsNotReady, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.ready)
})
kubernetesRouter.get('/:podName', kubernetesController.getMetrics, (req: Response, res: Response)=> {
    return res.status(200).json(res.locals.data)
})



export default kubernetesRouter;
