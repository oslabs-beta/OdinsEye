import { MongoController, start, end, res, req, next } from '../../types';
import axios from 'axios';

const mongoController: MongoController = {
  mongoMetrics: async (req, res, next) => {
    const queryObject: { [key: string]: string } = {
      opcounter: 'sum(rate(mongodb_ss_opcounters[5m]))',
      connections: 'mongodb_ss_connections{conn_type="active"}',
      queues: 'sum(mongodb_ss_globalLock_currentQueue)',
      latency: 'rate(mongodb_ss_opLatencies_latency[5m])',
      uptime: 'mongodb_ss_uptime',
      memory: 'mongodb_sys_memory_MemAvailable_kb',
      processes: 'mongodb_sys_cpu_procs_running',
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

const DataObjectBuilder = async (obj: {
  [key: string]: string;
}): Promise<{ [key: string]: string[] } | unknown> => {
  const objectData: { [key: string]: string[] } = {};
  try {
    for (let key in obj) {
      const response = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${obj[key]}&start=${start}&end=${end}&step=5m`
      );
      objectData[key] = [response.data.data.result[0].values];
    }
  } catch (err) {
    return err;
  }
  return objectData;
};

export default mongoController;
