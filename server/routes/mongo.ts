const express = require('express');
import { Request, Response } from 'express';
import mongoController from '../controllers/mongoController';
import dataController from '../controllers/dataObjectBuilder';

const mongoRouter = express.Router();

mongoRouter.get(
    '/mongoMetrics',
    mongoController.mongoMetrics,
    dataController.dataObjectBuilder,
    (req: Request, res: Response) => {
        return res.status(200).json(req.app.locals.data);
    }
);


export default mongoRouter;