import { Request, Response, NextFunction } from 'express';
import { DashboardController } from '../../types';
import { graphDataObject } from '../../types';
import DataObjectBuilder from './dataObjectBuilder';
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
    const queryObject: graphDataObject = {
      linegraph: {
        totalCpu: 'sum(rate(container_cpu_usage_seconds_total[10m]))*100',
        totalMem: 'sum(container_memory_usage_bytes)',
        totalTransmit: 'sum(rate(node_network_transmit_bytes_total[10m]))',
        totalReceive: 'sum(rate(node_network_receive_bytes_total[10m]))',
      },
      donutint: {
        totalPods: 'count(kube_pod_info)',
        notReadyPods: 'sum(kube_pod_status_ready{condition="false"})',
        totalNamespaces: 'count(kube_namespace_created)',
      }
  }
    try{
      res.locals.dashboard = await DataObjectBuilder(queryObject);
      return next(); 
    } catch (err) {
      return next({
        log: `Error in dashboardController.getAllMetrics: ${err}`,
        status: 500,
        message: 'Error occured while retrieving dashboard all metrics data',
      });
    }
  },
  
  cpuUsageOverTotalCpu: async (req: Request, res: Response, next: NextFunction) => {
    const queryObject: graphDataObject = {
      cpubarchart: {
        cpu: 'sum(rate(container_cpu_usage_seconds_total[5m]))',
        core: 'sum(machine_cpu_cores)',
        percent: 'sum(rate(container_cpu_usage_seconds_total[5m]))/sum(machine_cpu_cores)*100',
      }
    }
    try {
      res.locals.cpuUsageOverTotalCpu = await DataObjectBuilder(queryObject);
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
