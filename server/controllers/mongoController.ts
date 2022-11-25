import { Request, Response, NextFunction } from 'express';
import { MongoController } from '../../types';
import axios from 'axios';
import { parse } from 'path';

const start = new Date(Date.now() - 1440 * 60000).toISOString();
const end = new Date(Date.now()).toISOString();

const mongoController: MongoController = {
    opCounter: async (req: Request, res: Response, next: NextFunction) => {
        const opCounterQuery =
            'sum(rate(mongodb_ss_opcounters[5m]))';
        try {
            const response = await axios.get(
                `http://localhost:9090/api/v1/query_range?query=${opCounterQuery}&start=${start}&end=${end}&step=5m`
            );
            res.locals.opcounter = response.data;
            return next();
        } catch (err) {
            return next({
                log: `Error in mongoController.opCounter: ${err}`,
                status: 500,
                message: 'Error occured while retrieving mongo op counter data',
            });
        }
    },
    connections: async (req: Request, res: Response, next: NextFunction) => {
        const connectionsQuery =
            'mongodb_ss_connections{conn_type="active"}';
        try {
            const response = await axios.get(
                `http://localhost:9090/api/v1/query_range?query=${connectionsQuery}&start=${start}&end=${end}&step=5m`
            );
            res.locals.connections = response.data;
            return next();
        } catch (err) {
            return next({
                log: `Error in mongoController.connections: ${err}`,
                status: 500,
                message: 'Error occured while retrieving mongo connection data',
            });
        }
    },
    queue: async (req: Request, res: Response, next: NextFunction) => {
        const queueQuery =
            'sum(mongodb_ss_globalLock_currentQueue)';
        try {
            const response = await axios.get(
                `http://localhost:9090/api/v1/query_range?query=${queueQuery}&start=${start}&end=${end}&step=5m`
            );
            res.locals.queue = response.data;
            return next();
        } catch (err) {
            return next({
                log: `Error in mongoController.queue: ${err}`,
                status: 500,
                message: 'Error occured while retrieving mongo queue data',
            });
        }
    },
    latency: async (req: Request, res: Response, next: NextFunction) => {
        const latencyQuery =
            'rate(mongodb_ss_opLatencies_latency[5m])';
        try {
            const response = await axios.get(
                `http://localhost:9090/api/v1/query_range?query=${latencyQuery}&start=${start}&end=${end}&step=5m`
            );
            res.locals.latency = response.data;
            return next();
        } catch (err) {
            return next({
                log: `Error in mongoController.latency: ${err}`,
                status: 500,
                message: 'Error occured while retrieving mongo latency data',
            });
        }
    },
    uptime: async (req: Request, res: Response, next: NextFunction) => {
        const uptimeQuery =
            'mongodb_ss_uptime';
        try {
            const response = await axios.get(
                `http://localhost:9090/api/v1/query_range?query=${uptimeQuery}&start=${start}&end=${end}&step=5m`
            );
            res.locals.uptime = response.data;
            return next();
        } catch (err) {
            return next({
                log: `Error in mongoController.uptime: ${err}`,
                status: 500,
                message: 'Error occured while retrieving mongo uptime data',
            });
        }
    },
    memory: async (req: Request, res: Response, next: NextFunction) => {
        const memoryQuery =
            'mongodb_sys_memory_MemAvailable_kb';
        try {
            const response = await axios.get(
                `http://localhost:9090/api/v1/query_range?query=${memoryQuery}&start=${start}&end=${end}&step=5m`
            );
            res.locals.uptime = response.data;
            return next();
        } catch (err) {
            return next({
                log: `Error in mongoController.memory: ${err}`,
                status: 500,
                message: 'Error occured while retrieving mongo memory data',
            });
        }
    },
    processes: async (req: Request, res: Response, next: NextFunction) => {
        const processQuery =
            'mongodb_sys_cpu_procs_running';
        try {
            const response = await axios.get(
                `http://localhost:9090/api/v1/query_range?query=${processQuery}&start=${start}&end=${end}&step=5m`
            );
            res.locals.processes = response.data;
            return next();
        } catch (err) {
            return next({
                log: `Error in mongoController.processes: ${err}`,
                status: 500,
                message: 'Error occured while retrieving mongo cpu processes data',
            });
        }
    }
}