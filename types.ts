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
    totalRestarts: RequestHandler,
    namespaceNames: RequestHandler,
    podNames: RequestHandler,
    podsNotReady: RequestHandler,
    getNameSpaceMetrics: RequestHandler,
    getPodMetrics: RequestHandler
}

export type TestState = {
  dark: boolean;
  test2: number;
  data: null | [];
};

export type GetDataType = {
  (path: string, elementId: string): Promise<any>;
};

export type ErrorType = {
  log: string;
  status: number;
  message: { err: string };
};


