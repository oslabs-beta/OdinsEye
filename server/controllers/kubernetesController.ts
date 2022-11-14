import { Request, Response, NextFunction } from "express";
import { KubernetesController, ObjectData } from "../../types";
import axios from 'axios';
//const k8s = require('@kubernetes/client-node');
//prometheus client for node.js
//const client = require('prom-client');
const start = new Date(Date.now() - 60 * 60000).toISOString();
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
            const response = await axios.get(`http://localhost:9090/api/v1/query_range?query=${restartQuery}&start=${start}&end=${end}&step=5m`)
            console.log(response.data.data.result)
            res.locals.restarts = response.data;
            console.log(res.locals.restarts);
            return next();
        }
          
        catch(err){
            return next({
                log: `Error in kuberenetesController.getTotalRestarts: ${err}`,
                status: 500,
                message: 'Error occured while retrieving total restarts data',
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
            return next();
        }
          
        catch(err){
            return next({
                log: `Error in kuberenetesController.nameSpaceNames: ${err}`,
                status: 500,
                message: 'Error occured while retrieving namespace names data',
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
                log: `Error in kuberenetesController.podNames: ${err}`,
                status: 500,
                message: 'Error occured while retrieving pod names',
            });
        }
    },
    podsNotReady: async (req: Request, res: Response, next: NextFunction) => {
        const readyQuery = 'sum+by+(namespace)+(kube_pod_status_ready{condition="false"})'
        try{
            console.log('into try block')
            const response = await axios.get(`http://localhost:9090/api/v1/query_range?query=${readyQuery}&start=${start}&end=${end}&step=5m`)
            console.log(response.data.data.result)
            res.locals.ready = response.data;
            return next();
        }
        catch(err){
            return next({
                log: `Error in kuberenetesController.podsNotReady: ${err}`,
                status: 500,
                message: 'Error occured while retrieving pods not ready data',
            });
        }
    },
    getMetrics: async (req: Request, res: Response, next: NextFunction) => {
        const objectData: any = {
        };
        const { podName } = req.params
        const restartQuery = `sum+by+(${podName})(changes(kube_pod_status_ready{condition="true"}[5m]))`
        const readyQuery = `sum+by+(${podName})+(kube_pod_status_ready{condition="false"})`
        const cpuQuery = `sum+by+(${podName})+rate(container_cpu_usage_seconds_total[10m])`
        const memQuery = `sum+by+(${podName})(container_memory_usage_bytes)`
        const receiveQuery = `sum+by+(${podName})(rate(node_network_receive_bytes_total[10m]))`
        const transmitQuery = `sum+by+(${podName})(rate(node_network_transmit_bytes_total[10m]))`
        try {
            const response = await axios.get(`http://localhost:9090/api/v1/query_range?query=${restartQuery}&start=${start}&end=${end}&step=5m`)
            const array = response.data.data.result
            const newArray = [];
            for (let i=0; i<array.length; i++){
                newArray.push(array[0].values)
            }
            console.log(newArray)
            objectData.restarts = newArray
            // const response1 = await axios.get(`http://localhost:9090/api/v1/query_range?query=${readyQuery}&start=${start}&end=${end}&step=5m`)
            // const response2 = await axios.get(`http://localhost:9090/api/v1/query_range?query=${cpuQuery}&start=${start}&end=${end}&step=5m`)
            // const response3 = await axios.get(`http://localhost:9090/api/v1/query_range?query=${memQuery}&start=${start}&end=${end}&step=5m`)
            // const response4 = await axios.get(`http://localhost:9090/api/v1/query_range?query=${receiveQuery}&start=${start}&end=${end}&step=5m`)
            // const response5 = await axios.get(`http://localhost:9090/api/v1/query_range?query=${transmitQuery}&start=${start}&end=${end}&step=5m`)
            res.locals.data = objectData;
            return next();
        } catch (err) {
            return next({
                log: `Error in kuberenetesController.getMetrics: ${err}`,
                status: 500,
                message: 'Error occured while retrieving getMetrics data',
            });
        }
    }
}

export default kubernetesController;