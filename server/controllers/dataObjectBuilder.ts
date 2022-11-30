import axios from 'axios';
import { graphDataObject } from '../../types';

const start = new Date(Date.now() - 1440 * 60000).toISOString();
const end = new Date(Date.now()).toISOString();

const DataObjectBuilder = async (obj: graphDataObject): Promise<{ [key: string] : string[] } | unknown> => {
    const objectData: { [key: string] : string|number[] } = {};
    try {
        for (let key in obj) {
            if (key === "linegraph") {
                for (let query in obj[key]) {
                    const response = await axios.get(
                        `http://localhost:9090/api/v1/query_range?query=${obj[key][query]}&start=${start}&end=${end}&step=5m`
                    )
                    if (response.data.data.result.length === 0) {
                        objectData[query] = []
                    } else {
                        objectData[query] = [response.data.data.result[0].values]
                    }
                }
            }
            if (key === "donutint") {
                for (let query in obj[key]) {
                    const response = await axios.get(
                        `http://localhost:9090/api/v1/query_range?query=${obj[key][query]}&start=${start}&end=${end}&step=5m`
                    )
                    const data = parseInt(response.data.data.result[0].values[0][1])
                    objectData[query] = [data]
                }
            }
            if (key === "cpubarchart") {
                for (let query in obj[key]) {
                    const response = await axios.get(
                        `http://localhost:9090/api/v1/query_range?query=${obj[key][query]}&start=${start}&end=${end}&step=5m`
                    )
                    objectData[query] = [response.data.data.result[0].values[1][1]]
                }
            }
        }
    } catch (err) {
        return err
    }
    return objectData;
}

export default DataObjectBuilder

// response objects

// mongo
// mongoMetrics: response.data.data.result[0].values => []

// kubernetes
// namespaceNames, podNames, : response.data.data.result => [] (pushing element.metric.namespace into outputarray)
// podsNotReadyNames : response.data.data.result[0].values[0][1] => [status, name]
// getNameSpaceMetrics : restartResponse.data.data.result[0].values => []
// getPodMetrics : restartResponse.data.data.result[0].values => []

// dashboard
// getAllMetrics  : data.data.result[0].values + 
//  totalPods, notReadyPods, totalNamespaces: data.data.result[0].values[0][1] -> main, donutchart, parsing int
// cpuUsageOverTotalCpu : data.data.result[0].values[1][1] -> main, cpu barchart
