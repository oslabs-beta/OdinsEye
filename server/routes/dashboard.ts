const express = require('express');
import { Request, Response } from 'express';
const k8s = require('@kubernetes/client-node');
//prometheus client for node.js
const client = require('prom-client');
const dashboardRouter = express.Router();

// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// const k8sApi2 = kc.makeApiClient(k8s.ExtensionsV1beta1Api);
// const k8sApi3 = kc.makeApiClient(k8s.AppsV1Api);
// client.collectDefaultMetrics();

// k8sApi.listNamespacedPod('default').then((res: any) => {
//     console.log(res.body);
// });


export default dashboardRouter;

