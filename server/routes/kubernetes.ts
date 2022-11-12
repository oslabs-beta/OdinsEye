const express = require('express');
import { Request, Response } from 'express';
import kubernetesController from '../controllers/kubernetesController';

const kubernetesRouter = express.Router();

kubernetesRouter.get('/totalMem', kubernetesController.totalMem, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})

kubernetesRouter.get('/totalCpu', kubernetesController.totalCpu, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.cpu.data);
})

kubernetesRouter.get('/totalTransmit', kubernetesController.totalTransmit, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})

kubernetesRouter.get('/totalReceive', kubernetesController.totalReceive, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})

kubernetesRouter.get('/totalPods', kubernetesController.totalPods, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})



export default kubernetesRouter;
