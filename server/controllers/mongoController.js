"use strict";
exports.__esModule = true;
var mongoController = {
    mongoMetrics: function (req, res, next) {
        var queryObject = {
            linegraph: {
                opcounter: 'sum(rate(mongodb_ss_opcounters[5m]))',
                connections: 'mongodb_ss_connections{conn_type="active"}',
                queues: 'sum(mongodb_ss_globalLock_currentQueue)',
                latency: 'rate(mongodb_ss_opLatencies_latency[5m])',
                uptime: 'mongodb_ss_uptime',
                memory: 'mongodb_sys_memory_MemAvailable_kb',
                processes: 'mongodb_sys_cpu_procs_running'
            }
        };
        try {
            req.app.locals.queries = queryObject;
            return next();
        }
        catch (err) {
            return next({
                log: "Error in mongoController.mongoMetrics: ".concat(err),
                status: 500,
                message: 'Error occured while retrieving mongo metric data'
            });
        }
    }
};
exports["default"] = mongoController;
