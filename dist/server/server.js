"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const express = require('express');
const dashboard_1 = __importDefault(require("./routes/dashboard"));
const kubernetes_1 = __importDefault(require("./routes/kubernetes"));
// import { resourceLimits } from 'worker_threads';
const cors = require('cors');
const app = express();
const PORT = 3030;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV) {
    app.use('/', express.static(path.join(__dirname, '../dist')));
}
app.use('/api/dashboard', dashboard_1.default);
app.use('/api/kubernetesMetrics', kubernetes_1.default);
app.get('/dashboard', (req, res) => {
    return res.status(200).send('hi');
});
//redirect to page 404 when endpoint does not exist
app.use('*', (req, res) => {
    return res.status(404).send('404 Page Not Found');
});
//global error handling
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
//start app on port
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});
module.exports = app;
