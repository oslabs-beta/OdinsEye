import { MongoController, graphDataObject, res, req, next } from '../../types';

import DataObjectBuilder from './dataObjectBuilder';
import axios from 'axios';

const mongoController: MongoController = {
  mongoMetrics: async (req, res, next) => {
    const queryObject: graphDataObject = {
      linegraph: {
        opcounter: 'sum(rate(mongodb_ss_opcounters[5m]))',
        connections: 'mongodb_ss_connections{conn_type="active"}',
        queues: 'sum(mongodb_ss_globalLock_currentQueue)',
        latency: 'rate(mongodb_ss_opLatencies_latency[5m])',
        uptime: 'mongodb_ss_uptime',
        memory: 'mongodb_sys_memory_MemAvailable_kb',
        processes: 'mongodb_sys_cpu_procs_running',
      },
    };
    try {
      res.locals.mongoData = await DataObjectBuilder(queryObject);
      return next();
    } catch (err) {
      return next({
        log: `Error in mongoController.mongoMetrics: ${err}`,
        status: 500,
        message: 'Error occured while retrieving mongo metric data',
      });
    }
  },
};

export default mongoController;
