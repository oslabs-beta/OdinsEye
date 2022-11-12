import { Request, Response, NextFunction } from "express";
import { KubernetesController } from "../../types";
import axios from 'axios';
//const k8s = require('@kubernetes/client-node');
//prometheus client for node.js
//const client = require('prom-client');
const start = new Date(Date.now() - 1440 * 60000).toISOString();
const end = new Date(Date.now()).toISOString();

// const kc = new k8s.KubeConfig();
// kc.loadFromDefault();

// const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// const k8sApi1 = kc.makeApiClient(k8s.AppsV1Api);
// const k8sApi3 = kc.makeApiClient(k8s.NetworkingV1Api);
//to collect default metrics directly from prometheus client 
//https://github.com/siimon/prom-client
// client.collectDefaultMetrics();

const kubernetesController: KubernetesController = {
    totalRestarts: async (req: Request, res: Response, next: NextFunction) => {
        const restartQuery = 'sum+by+(namespace)(changes(kube_pod_status_ready{condition="true"}[5m]))'
        try{
            console.log('into try block')
            const response = await axios.get(`http://localhost:9090/api/v1/query_range?query=sum+by(namespace)(changes(kube_pod_status_ready{condition="true"}[5m]))&start=${start}&end=${end}&step=5m`)
            console.log(response.data)
            res.locals.restarts = await response.data;
            console.log(res.locals.restarts);
            return next();
        }
          
        catch(err){
            return next({
                log: `Error in kuberenetesController.getTotalRestarts: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard cpu data',
            });
        }
    },
    namespaceNames: async (req: Request, res: Response, next: NextFunction) => {
        const namespaceQuery = 'sum+by+(namespace)+(kube_pod_info)'
        try{
            console.log('into try block')
            const response = await axios.get(`http://localhost:9090/api/v1/query_range?query=${namespaceQuery}&start=${start}&end=${end}&step=5m`)
            const array = response.data.data.result;
            const namespaceArray:string[] = [];
            array.forEach((element:any)=>{
                namespaceArray.push(element.metric.namespace)
            })
            res.locals.namespaceNames = namespaceArray;
            console.log(res.locals.namespaceNames)
            // res.locals.restarts = await response.data;
            // console.log(res.locals.restarts);
            return next();
        }
          
        catch(err){
            return next({
                log: `Error in kuberenetesController.getTotalRestarts: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard cpu data',
            });
        }
    },
    podNames: async (req: Request, res: Response, next: NextFunction) => {
        const podNameQuery = 'sum+by+(pod)+(kube_pod_info)'
        try{
            console.log('into try block')
            const response = await axios.get(`http://localhost:9090/api/v1/query_range?query=${podNameQuery}&start=${start}&end=${end}&step=5m`)
            console.log(response.data.data.result)
            const array = response.data.data.result;
            const podNameArray:string[] = [];
            array.forEach((element:any)=>{
                podNameArray.push(element.metric.pod)
            })
            res.locals.names = podNameArray;
            console.log(res.locals.names)
            // res.locals.restarts = await response.data;
            // console.log(res.locals.restarts);
            return next();
        }
          
        catch(err){
            return next({
                log: `Error in kuberenetesController.getTotalRestarts: ${err}`,
                status: 500,
                message: 'Error occured while retrieving dashboard cpu data',
            });
        }
    }
}

export default kubernetesController;