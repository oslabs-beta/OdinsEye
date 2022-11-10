//request handle is a function that will be executed every time the server receives a particular request
import { RequestHandler } from "express"
export type DashboardController = {
    totalMem: RequestHandler,
    totalCpu: RequestHandler,
    totalTransmit: RequestHandler,
    totalReceive: RequestHandler,
    totalPods: RequestHandler,
}