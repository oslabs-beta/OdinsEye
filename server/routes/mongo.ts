const express = require('express');
import { Request, Response } from 'express';
import mongoController from '../controllers/mongoController';

const mongoRouter = express.Router();

mongoRouter.get(
    '/mongoMetrics',
    mongoController.mongoMetrics,
    (req: Request, res: Response) => {
        return res.status(200).json(res.locals.mongoData);
    }
);


export default mongoRouter;