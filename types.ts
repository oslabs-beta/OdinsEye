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
  getMetrics: RequestHandler;
};

export type TestState = {
  dark: boolean;
  namespaces: string[] | null;
  data: null | [];
};

export type GetDataType = (page?: string) => any;

export type ErrorType = {
  log: string;
  status: number;
  message: { err: string };
};

export type AllDataType = {
  totalCpu?: any[];
  totalNames?: number;
  totalMem?: any[];
  totalPods?: number[];
  totalRec?: any[];
  totalTrans?: any[];
  logs?: any[];
  data?: any;
};
