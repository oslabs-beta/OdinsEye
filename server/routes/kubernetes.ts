const express = require('express');
import { Request, Response } from 'express';
import kubernetesController from '../controllers/kubernetesController';

const kubernetesRouter = express.Router();

kubernetesRouter.get('/totalRestarts', kubernetesController.totalRestarts, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.restarts);
})
kubernetesRouter.get('/namespaceNames', kubernetesController.namespaceNames, (eq: Request, res: Response) => {
    return res.status(200).json(res.locals.namespaceNames)
})
kubernetesRouter.get('/podNames', kubernetesController.podNames, (eq: Request, res: Response) => {
    return res.status(200).json(res.locals.names)
})



export default kubernetesRouter;
