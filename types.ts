//request handle is a function that will be executed every time the server receives a particular request
import { RequestHandler } from 'express';
import { Request, Response, NextFunction } from 'express';

export type req = Request;
export type res = Response;
export type next = NextFunction;

//start time to be set 24 hour from now
export const start = new Date(Date.now() - 86_400_000).toISOString();
export const end = new Date(Date.now()).toISOString();

//type aliases
export type DashboardController = {
  getAllMetrics: RequestHandler;
  cpuUsageOverTotalCpu: RequestHandler;
};

export type KubernetesController = {
  namespaceNames: RequestHandler;
  podNames: RequestHandler;
  getNameSpaceMetrics: RequestHandler;
  getPodMetrics: RequestHandler;
  podsNotReadyNames?: RequestHandler;
};

export type MongoController = {
  mongoMetrics: RequestHandler;
};

export type graphDataObject = {
  [key: string] : {[key: string] : string}
};

export type State = {
  dark: boolean;
  namespaces: string[] | null;
  data: null | [];
  currentPage: string;
  currentNamespace: string;
};

export type ErrorType = {
  log: string;
  status: number;
  message: { err: string };
};

export type Data = [number, string];

export type AllDataType = {
  data?: number[] | number | undefined;
};

export type MainDataType = {
  totalCpu: Data[];
  totalMem: Data[];
  totalTransmit: Data[];
  totalReceive: Data[];
  totalPods: number;
  notReadyPods: number;
  totalNamespaces: number;
};

export type MongoDataType = {
  opcounter: Data[];
  connections: Data[];
  queues: Data[];
  latency: Data[];
  uptime: Data[];
  memory: Data[];
  processes: Data[];
};

export type KubDataType = {
  cpu: Data[];
  memory: Data[];
  notReady: number;
  ready: Data[];
  reception: Data[];
  restarts: Data[];
  transmission: Data[];
};
