import axios from 'axios';
import { graphDataObject, start, end } from '../../types';

const DataObjectBuilder = async (
  obj: graphDataObject
): Promise<{ [key: string]: string[] } | unknown> => {
  const objectData: { [key: string]: string | number[] } = {};
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
  } catch (err) {
    return err;
  }
  return objectData;
};

export default DataObjectBuilder;
