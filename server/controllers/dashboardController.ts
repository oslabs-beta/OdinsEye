import { Request, Response, NextFunction } from 'express';
import { DashboardController } from '../../types';
import axios from 'axios';
const k8s = require('@kubernetes/client-node');
//prometheus client for node.js
const client = require('prom-client');
const start = new Date(Date.now() - 1440 * 60000).toISOString();
const end = new Date(Date.now()).toISOString();

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
//CoreV1Api: it allows access to core k8 resources such as services
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
//AppsV1Api: it allows access to app/v1 resources such as deployments and k8s
const k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);
//NetworkV1Api: (ingress) - Ingress is a collection of rules that allow inbound connections to reach the endpoints defined by a backend. An Ingress can be configured to give services externally-reachable urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
//https://docs.okd.io/latest/rest_api/network_apis/ingress-networking-k8s-io-v1.html
const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);
//to collect default metrics directly from prometheus client
//https://github.com/siimon/prom-client
client.collectDefaultMetrics();

const dashboardController: DashboardController = {
  getAllMetrics: async (req: Request, res: Response, next: NextFunction) => {
    try{
      const cpuResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=5m`
      );
      const memResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=${start}&end=${end}&step=5m`
      );
      const podsResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=count(kube_pod_info)&start=${start}&end=${end}&step=5m`
      );
      const notReadyPodsResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(kube_pod_status_ready{condition="false"})&start=${start}&end=${end}&step=5m`
      );
      const transmitResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[10m]))&start=${start}&end=${end}&step=5m`
      );
      const receiveData = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total[10m]))&start=${start}&end=${end}&step=10m`
      );
      const namespacesResponse = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=count(kube_namespace_created)&start=${start}&end=${end}&step=5m`
      );
      res.locals.dashboard = {
        totalCpu: [await cpuResponse.data.data.result[0].values],
        totalMem: [await memResponse.data.data.result[0].values],
        totalPods: [parseInt(await podsResponse.data.data.result[0].values[0][1])],
        notReadyPods: [parseInt(await notReadyPodsResponse.data.data.result[0].values[0][1])],
        totalTransmit: [await transmitResponse.data.data.result[0].values],
        totalReceive: [await receiveData.data.data.result[0].values],
        totalNamespaces: [parseInt(await namespacesResponse.data.data.result[0].values[0][1])]
      }
      return next(); 
    } catch (err) {
      return next({
        log: `Error in dashboardController.getAllMetrics: ${err}`,
        status: 500,
        message: 'Error occured while retrieving dashboard all metrics data',
      });
    }
  },
  // totalCpu: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[10m]))*100&start=${start}&end=${end}&step=5m`
  //     );
  //     const totalCpu = await response.data;
  //     res.locals.dashboard = totalCpu.data.result[0].values
  //     // console.log(res.locals.cpu);
  //     return next();
  //   } catch (err) {
  //     return next({
  //       log: `Error in dashboardController.getTotalCpu: ${err}`,
  //       status: 500,
  //       message: 'Error occured while retrieving dashboard cpu data',
  //     });
  //   }
  // },

  // totalMem: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9090/api/v1/query_range?query=sum(container_memory_usage_bytes)&start=${start}&end=${end}&step=5m`
  //     );
  //     const totalMem = await response.data;
  //     res.locals.dashboard = totalMem.data.result[0].values
  //     return next();
  //   } catch (err) {
  //     return next({
  //       log: `Error in dashboardController.getTotalCpu: ${err}`,
  //       status: 500,
  //       message: 'Error occured while retrieving dashboard mem data',
  //     });
  //   }
  // },

  // totalPods: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9090/api/v1/query_range?query=count(kube_pod_info)&start=${start}&end=${end}&step=5m`
  //     );
  //     // console.log(response.data.data.result[0].values[0]);
  //     const totalPods = await response.data;
  //     res.locals.dashboard.totalPods = totalPods.data.result[0].values[0][1]
  //     return next();
  //   } catch (err) {
  //     return next({
  //       log: `Error in dashboardController.getTotalCpu: ${err}`,
  //       status: 500,
  //       message: 'Error occured while retrieving dashboard pods data',
  //     });
  //   }
  // },

  // totalReceive: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const data = await axios.get(
  //       `http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_receive_bytes_total[10m]))&start=${start}&end=${end}&step=10m`
  //     );
  //     const totalReceive = await data.data;
  //     res.locals.dashboard.totalReceive = totalReceive.data.result[0].values
  //     return next();
  //   } catch (err) {
  //     return next({
  //       log: `Error in dashboardController.getTotalCpu: ${err}`,
  //       status: 500,
  //       message: 'Error occured while retrieving dashboard receive data',
  //     });
  //   }
  // },

  // totalTransmit: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9090/api/v1/query_range?query=sum(rate(node_network_transmit_bytes_total[10m]))&start=${start}&end=${end}&step=5m`
  //     );
  //     const totalTransmit = await response.data;
  //     res.locals.dashboard.totalTransmit = totalTransmit.data.result[0].values
  
  //     return next();
  //   } catch (err) {
  //     return next({
  //       log: `Error in dashboardController.getTotalCpu: ${err}`,
  //       status: 500,
  //       message: 'Error occured while retrieving dashboard transmit data',
  //     });
  //   }
  // },

  // totalNamespaces: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9090/api/v1/query_range?query=count(kube_namespace_created)&start=${start}&end=${end}&step=5m`
  //     );
  //     const totalNamespaces = await response.data;
  //     res.locals.dashboard.totalNamespaces = totalNamespaces.data.result[0].values[0][1]
  //     return next();
  //   } catch (err) {
  //     return next({
  //       log: `Error in dashboardController.getTotalCpu: ${err}`,
  //       status: 500,
  //       message: 'Error occured while retrieving dashboard transmit data',
  //     });
  //   }
  // },

  cpuUsageOverTotalCpu: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const totalCpuUage = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[5m]))&start=${start}&end=${end}&step=5m`
      );
      const totalCore = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(machine_cpu_cores)&start=${start}&end=${end}&step=5m`
      );
      const percentageOfCore = await axios.get(
        `http://localhost:9090/api/v1/query_range?query=sum(rate(container_cpu_usage_seconds_total[5m]))/sum(machine_cpu_cores)*100&start=${start}&end=${end}&step=5m`
      );
      const cpuUsageOverTotalCpu = await totalCpuUage;
      const totalCoreInCluster = await totalCore;
      const percent = await percentageOfCore;
      res.locals.cpuUsageOverTotalCpu = {
        cpu: cpuUsageOverTotalCpu.data.data.result[0].values[1][1],
        core: totalCoreInCluster.data.data.result[0].values[1][1],
        percent: percent.data.data.result[0].values[1][1]
      }
      return next();
    } catch (err) {
      return next({
        log: `Error in dashboardController.getTotalCpu: ${err}`,
        status: 500,
        message: 'Error occured while retrieving dashboard transmit data',
      });
    }
  }
};

export default dashboardController;
