const express = require('express');
import { Request, Response } from 'express';
import mongoController from '../controllers/mongoController';

const mongoRouter = express.Router();

mongoRouter.get(
    '/opCounter',
    mongoController.opCounter,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.opcounter);
    }
);

mongoRouter.get(
    '/connections',
    mongoController.connections,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.connections);
    }
);

mongoRouter.get(
    '/queue',
    mongoController.queue,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.queue);
    }
);

mongoRouter.get(
    '/latency',
    mongoController.latency,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.latency);
    }
);

mongoRouter.get(
    '/uptime',
    mongoController.uptime,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.uptime);
    }
);

mongoRouter.get(
    '/memory',
    mongoController.memory,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.memory);
    }
);

mongoRouter.get(
    '/processes',
    mongoController.processes,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.processes);
    }
);


export default mongoRouter;