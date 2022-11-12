const express = require('express');
import { Request, Response } from 'express';
import dashboardController from '../controllers/dashboardController';

const dashboardRouter = express.Router();

dashboardRouter.get('/totalMem', dashboardController.totalMem, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})

dashboardRouter.get('/totalCpu', dashboardController.totalCpu, (req: Request, res: Response) => {
    return res.status(200).json(res.locals.cpu.data);
})

dashboardRouter.get('/totalTransmit', dashboardController.totalTransmit, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})

dashboardRouter.get('/totalReceive', dashboardController.totalReceive, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})

dashboardRouter.get('/totalPods', dashboardController.totalPods, (req: Request, res: Response) => {
    return res.status(200).send('hi');
})



export default dashboardRouter;

