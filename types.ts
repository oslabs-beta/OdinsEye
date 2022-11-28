//request handle is a function that will be executed every time the server receives a particular request
import { RequestHandler } from 'express';

//type aliases 
export type DashboardController = {
  getAllMetrics: RequestHandler;
  cpuUsageOverTotalCpu: RequestHandler;
};

export type KubernetesController = {
  namespaceNames: RequestHandler;
  podNames: RequestHandler;
  podsNotReady: RequestHandler;
  getNameSpaceMetrics: RequestHandler;
  getPodMetrics: RequestHandler;
  podsNotReadyNames?: RequestHandler;
};

export type MongoController = {
  mongoMetrics: RequestHandler;
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

export type AllDataType = {
  data?: number[] | number | undefined;
};
