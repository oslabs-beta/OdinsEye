import { KubernetesController, start, end, req, res, next } from '../../types';
import axios from 'axios';

const kubernetesController: KubernetesController = {
  namespaceNames: async (req, res, next) => {
    const namespaceQuery = 'sum+by+(namespace)+(kube_pod_info)';
    try {
      const response = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${namespaceQuery}&start=${start}&end=${end}&step=5m`
      );
      const array = response.data.data.result;
      const namespaceArray: string[] = [];
      array.forEach((element: any) => {
        namespaceArray.push(element.metric.namespace);
      });
      res.locals.namespaceNames = namespaceArray;
      return next();
    } catch (err) {
      return next({
        log: `Error in kuberenetesController.nameSpaceNames: ${err}`,
        status: 500,
        message: 'Error occured while retrieving namespace names data',
      });
    }
  },

  podNames: async (req, res, next) => {
    const namespace = req.query.namespace;
    const podNameQuery = `sum by (pod)(kube_pod_info{namespace="${namespace}"})`;
    try {
      const response = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${podNameQuery}&start=${start}&end=${end}&step=5m`
      );
      const array = response.data.data.result;
      const podNameArray: string[] = [];
      array.forEach((element: any) => {
        podNameArray.push(element.metric.pod);
      });
      res.locals.names = podNameArray;
      return next();
    } catch (err) {
      return next({
        log: `Error in kuberenetesController.podNames: ${err}`,
        status: 500,
        message: 'Error occured while retrieving pod names',
      });
    }
  },

  podsNotReadyNames: async (req, res, next) => {
    const { namespace, podData } = req.query;
    if (Array.isArray(podData)) {
      const promises = podData.map(async (name) => {
        const readyQuery = `sum(kube_pod_status_ready{condition="false",namespace="${namespace}",pod="${name}"})`;
        try {
          const response = await axios.get(
            `http://localhost:9090/api/v1/query_range?query=${readyQuery}&start=${start}&end=${end}&step=5m`
          );
          if (!response) {
            return [undefined, name];
          }
          const status = response.data.data.result[0].values[0][1];
          if (parseInt(status) > 0) {
            return [status, name];
          }
        } catch (err) {
          return next({
            log: `Error in kuberenetesController.podsNotReady: ${err}`,
            status: 500,
            message: 'Error occured while retrieving pods not ready data',
          });
        }
      });
      await Promise.all(promises).then((data) => {
        res.locals.status = data;
      });
    }
    return next();
  },

  getNameSpaceMetrics: async (req, res, next) => {
    const objectData: any = {};
    const { namespaceName } = req.params;
    const restartQuery = `sum(changes(kube_pod_status_ready{condition="true", namespace = "${namespaceName}"}[5m]))`;
    const readyQuery = `sum(kube_pod_status_ready{condition="true", namespace = "${namespaceName}"})`;
    const notReadyQuery = `sum(kube_pod_status_ready{condition="false", namespace = "${namespaceName}"})`;
    // const cpuQuery = `sum+by+(${ccNamespaceName})+(rate(container_cpu_usage_seconds_total[10m]))`
    const cpuQuery = `sum(rate(container_cpu_usage_seconds_total{container="", namespace=~"${namespaceName}"}[10m]))`;
    const memQuery = `sum(rate(container_memory_usage_bytes{container="", namespace=~"${namespaceName}"}[10m]))`;
    const receiveQuery = `sum(rate(node_network_receive_bytes_total{namespace = "${namespaceName}"}[10m]))`;
    const transmitQuery = `sum(rate(node_network_transmit_bytes_total{namespace = "${namespaceName}"}[10m]))`;
    try {
      //restarts per namespace
      const restartResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${restartQuery}&start=${start}&end=${end}&step=5m`
      );
      const array1 = restartResponse.data.data.result;
      const restartArray = [];
      restartArray.push(array1[0].values);
      objectData.restarts = restartArray;
      //pods that are unavailable within namespace
      const readyResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${readyQuery}&start=${start}&end=${end}&step=5m`
      );
      const array2 = readyResponse.data.data.result;
      const readyArray = [];
      readyArray.push(array2[0].values);
      objectData.ready = readyArray;

      //pods that are unavailable within namespace
      const notReadyResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${notReadyQuery}&start=${start}&end=${end}&step=5m`
      );
      const arrayNot = notReadyResponse.data.data.result[0].values[0][1];
      // const notReadyArray = [];
      // notReadyArray.push(arrayNot[0].values);
      objectData.notReady = parseInt(arrayNot);
      //total cpu within namespaces/pods
      const cpuResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${cpuQuery}&start=${start}&end=${end}&step=5m`
      );
      const array3 = cpuResponse.data.data.result;
      const cpuArray = [];
      cpuArray.push(array3[0].values);
      objectData.cpu = cpuArray;

      //total memory per pod
      const memResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${memQuery}&start=${start}&end=${end}&step=5m`
      );
      const array4 = memResponse.data.data.result;
      const memArray = [];
      memArray.push(array4[0].values);
      objectData.memory = memArray;

      //total network received per pod
      //NEED TO ADD IN ABILITY TO TAKE UNDEFINED VALUES
      const receiveResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${receiveQuery}&start=${start}&end=${end}&step=5m`
      );
      const array5 = receiveResponse.data.data.result;
      if (array5.length === 0) {
        objectData.reception = [];
      } else {
        const receiveArray = [];
        receiveArray.push(array5[0].values);
        objectData.reception = receiveArray;
      }
      //total transmitted data per pod
      //NEED TO ADD IN ABILITY TO TAKE UNDEFINED VALUES
      const transmitResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${transmitQuery}&start=${start}&end=${end}&step=5m`
      );
      const array6 = transmitResponse.data.data.result;
      if (array6.length === 0) {
        objectData.transmission = [];
      } else {
        const transmitArray = [];
        transmitArray.push(array6[0].values);
        objectData.transmission = transmitArray;
      }
      res.locals.namespaceData = objectData;
      return next();
    } catch (err) {
      return next({
        log: `Error in kuberenetesController.getMetrics: ${err}`,
        status: 500,
        message: 'Error occured while retrieving getMetrics data',
      });
    }
  },

  getPodMetrics: async (req, res, next) => {
    const objectData: any = {};
    const { podName } = req.params;
    const ccPodName = podName.replace(/-([a-z])/g, function (g) {
      return g[1].toUpperCase();
    });

    const restartQuery = `sum(changes(kube_pod_status_ready{condition="true", pod = "${podName}"}[5m]))`;
    const readyQuery = `sum(kube_pod_status_ready{condition="false", pod = "${podName}"})`;
    // const cpuQuery = `sum+by+(${ccNamespaceName})+(rate(container_cpu_usage_seconds_total[10m]))`
    const cpuQuery = `sum(rate(container_cpu_usage_seconds_total{container="", pod=~"${podName}"}[10m]))`;
    const memQuery = `sum(rate(container_memory_usage_bytes{container="", pod=~"${podName}"}[10m]))`;
    const receiveQuery = `sum(rate(node_network_receive_bytes_total{pod = "${podName}"}[10m]))`;
    const transmitQuery = `sum(rate(node_network_transmit_bytes_total{pod = "${podName}"}[10m]))`;
    try {
      //restarts per namespace
      const restartResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${restartQuery}&start=${start}&end=${end}&step=5m`
      );
      const array1 = restartResponse.data.data.result;
      const restartArray = [];
      // for (let i = 0; i<array1.length; i++){
      //     restartArray.push(array1[0].values[0][i][1])
      // }
      restartArray.push(array1[0].values);
      objectData.restarts = restartArray;

      //pods that are unavailable within namespace
      const readyResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${readyQuery}&start=${start}&end=${end}&step=5m`
      );
      const array2 = readyResponse.data.data.result;
      const readyArray = [];
      readyArray.push(array2[0].values);
      objectData.ready = readyArray;

      //total cpu within namespaces/pods
      const cpuResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${cpuQuery}&start=${start}&end=${end}&step=5m`
      );
      const array3 = cpuResponse.data.data.result;
      const cpuArray = [];
      cpuArray.push(array3[0].values);
      objectData.cpu = cpuArray;

      //total memory per pod
      const memResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${memQuery}&start=${start}&end=${end}&step=5m`
      );
      const array4 = memResponse.data.data.result;
      const memArray = [];
      memArray.push(array4[0].values);
      objectData.memory = memArray;

      //total network received per pod
      //NEED TO ADD IN ABILITY TO TAKE UNDEFINED VALUES
      const receiveResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${receiveQuery}&start=${start}&end=${end}&step=5m`
      );
      const array5 = receiveResponse.data.data.result;
      if (array5.length === 0) {
        objectData.reception = [];
      } else {
        const receiveArray = [];
        receiveArray.push(array5[0].values);
        objectData.reception = receiveArray;
      }
      //total transmitted data per pod
      //NEED TO ADD IN ABILITY TO TAKE UNDEFINED VALUES
      const transmitResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${transmitQuery}&start=${start}&end=${end}&step=5m`
      );
      const array6 = transmitResponse.data.data.result;
      if (array6.length === 0) {
        objectData.transmission = [];
      } else {
        const transmitArray = [];
        transmitArray.push(array6[0].values);
        objectData.transmission = transmitArray;
      }

      res.locals.podData = objectData;
      //console.log('res.locals.podData', res.locals.podData)
      return next();
    } catch (err) {
      return next({
        log: `Error in kuberenetesController.getPodMetrics: ${err}`,
        status: 500,
        message: 'Error occured while retrieving getMetrics data',
      });
    }
  },
};

export default kubernetesController;
