//request handle is a function that will be executed every time the server receives a particular request
import { RequestHandler } from 'express';
//type alias
export type DashboardController = {
  totalMem: RequestHandler;
  totalCpu: RequestHandler;
  totalTransmit: RequestHandler;
  totalReceive: RequestHandler;
  totalPods: RequestHandler;
  totalNamespaces: RequestHandler;
};

export type KubernetesController = {
  totalRestarts: RequestHandler;
  namespaceNames: RequestHandler;
  podNames: RequestHandler;
  podsNotReady: RequestHandler;
  getNameSpaceMetrics: RequestHandler;
  getPodMetrics: RequestHandler;
  podsNotReadyNames?: RequestHandler;
};

export type MongoController = {
  opCounter: RequestHandler;
  connections: RequestHandler;
  queue: RequestHandler;
  latency: RequestHandler;
  uptime: RequestHandler;
  memory: RequestHandler;
  processes: RequestHandler;
};

export type State = {
  dark: boolean;
  namespaces: string[] | null;
  data: null | [];
  currentPage: string;
};

export type ErrorType = {
  log: string;
  status: number;
  message: { err: string };
};

export type AllDataType = {
  data?: number[] | number | undefined;
  // totalCpu?: any[] | unde;
  // totalNames?: number;
  // totalMem?: any[];
  // totalPods?: number;
  // totalRec?: any[];
  // totalTrans?: any[];
  // logs?: any[];
};
