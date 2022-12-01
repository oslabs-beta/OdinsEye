import axios from 'axios';
import { DataController, start, end } from '../../types';
import { Request, Response, NextFunction } from 'express';

const dataController: DataController = {
 dataObjectBuilder:  async (res: Response, req: Request, next: NextFunction) => {
  const objectData: { [key: string]: string | number[] } = {};
  const obj = req.app.locals.queries;
  try {
    for (let key in obj) {
      if (key === 'linegraph') {
        for (let query in obj[key]) {
          const response = await axios.get(
            `http://localhost:9090/api/v1/query_range?query=${obj[key][query]}&start=${start}&end=${end}&step=5m`
          );
          if (response.data.data.result.length === 0) {
            objectData[query] = [];
          } else {
            objectData[query] = [response.data.data.result[0].values];
          }
        }
      }
      if (key === 'donutint') {
        for (let query in obj[key]) {
          const response = await axios.get(
            `http://localhost:9090/api/v1/query_range?query=${obj[key][query]}&start=${start}&end=${end}&step=5m`
          );
          const data = parseInt(response.data.data.result[0].values[0][1]);
          objectData[query] = [data];
        }
      }
      if (key === 'cpubarchart') {
        for (let query in obj[key]) {
          const response = await axios.get(
            `http://localhost:9090/api/v1/query_range?query=${obj[key][query]}&start=${start}&end=${end}&step=5m`
          );
          objectData[query] = [response.data.data.result[0].values[1][1]];
        }
      }
    }
    req.app.locals.data = objectData
    return next();
  } catch (err) {
    return next({
      log: `Error in dataController.dataObjectBuilder: ${err}`,
      status: 500,
      message: 'Error occured while creating data object',
    })
  }
}
}
export default dataController;
