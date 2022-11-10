import { 
    totalCpu,
    totalMem,
    totalPods,
    totalReceive,
    totalTransmit,
    DashboardController } from "../../types";
const k8s = require('@kubernetes/client-node');
//prometheus client for node.js
const client = require('prom-client');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);
const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);

client.collectDefaultMetrics();

const dashboardController: DashboardController {
    
}

export default dashboardController;