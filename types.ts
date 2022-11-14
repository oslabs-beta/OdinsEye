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
    podNames: RequestHandler
}

export type TestState = {
  dark: boolean;
  namespaces: string[] | null;
  data: null | [];
};

export type GetDataType = (page?: string) => void;

// {
//   (path: string, elementId: string): Promise<any>;
// };

export type ErrorType = {
  log: string;
  status: number;
  message: { err: string };
};
