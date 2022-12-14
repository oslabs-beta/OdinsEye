import { KubernetesController, start, end, req, res, next } from '../../types';
import { Request, Response, NextFunction } from 'express';
import { graphDataObject } from '../../types';
import DataObjectBuilder from './dataObjectBuilder';
import axios from 'axios';

const kubernetesController: KubernetesController = {
  namespaceNames: async (req: Request, res: Response, next: NextFunction) => {
    const namespaceQuery = 'sum+by+(namespace)+(kube_pod_info)';
    try {
      const response = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=${namespaceQuery}&start=${start}&end=${end}&step=5m`
      );
      const array = await response.data.data.result;
      const namespaceArray: string[] = [];
      array.forEach((element: any) => {
        namespaceArray.push(element.metric.namespace);
      });
      res.locals.namespaceNames = namespaceArray;
      return next();
    } catch (err) {
      return next({
        log: `Error in kubernetesController.nameSpaceNames: ${err}`,
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
        log: `Error in kubernetesController.podNames: ${err}`,
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
            log: `Error in kubernetesController.podsNotReady: ${err}`,
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
    const queryObject: graphDataObject = {
      linegraph: {
        restarts: `sum(changes(kube_pod_status_ready{condition="true", namespace = "${namespaceName}"}[5m]))`,
        ready: `sum(kube_pod_status_ready{condition="true", namespace = "${namespaceName}"})`,
        cpu: `sum(rate(container_cpu_usage_seconds_total{container="", namespace=~"${namespaceName}"}[10m]))`,
        memory: `sum(rate(container_memory_usage_bytes{container="", namespace=~"${namespaceName}"}[10m]))`,
        reception: `sum(rate(node_network_receive_bytes_total{namespace = "${namespaceName}"}[10m]))`,
        transmission: `sum(rate(node_network_transmit_bytes_total{namespace = "${namespaceName}"}[10m]))`,
      },
      donutint: {
        notReady: `sum(kube_pod_status_ready{condition="false", namespace = "${namespaceName}"})`,
      },
    };
    try {
      req.app.locals.queries = queryObject;
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
    const { podName } = req.params;
    const queryObject: graphDataObject = {
      linegraph: {
        restarts: `sum(changes(kube_pod_status_ready{condition="true", pod = "${podName}"}[5m]))`,
        ready: `sum(kube_pod_status_ready{condition="false", pod = "${podName}"})`,
        cpu: `sum(rate(container_cpu_usage_seconds_total{container="", pod=~"${podName}"}[10m]))`,
        memory: `sum(rate(container_memory_usage_bytes{container="", pod=~"${podName}"}[10m]))`,
        reception: `sum(rate(node_network_receive_bytes_total{pod = "${podName}"}[10m]))`,
        transmission: `sum(rate(node_network_transmit_bytes_total{pod = "${podName}"}[10m]))`,
      },
    };
    try {
      req.app.locals.queries = queryObject;
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
