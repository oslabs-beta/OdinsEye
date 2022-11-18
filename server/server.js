"use strict";
exports.__esModule = true;
var path = require('path');
var express = require('express');
var dashboard_1 = require("./routes/dashboard");
var kubernetes_1 = require("./routes/kubernetes");
var cors = require('cors');
var app = express();
var PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV) {
    app.use('/', express.static(path.join(__dirname, '../dist')));
}
app.use('/kubernetes', function (req, res) {
    express.static(path.join(__dirname, '../client/index.html'));
});
app.use('/mongo', function (req, res) {
    express.static(path.join(__dirname, '../client/index.html'));
});
app.use('/api/dashboard', dashboard_1["default"]);
app.use('/api/kubernetesMetrics', kubernetes_1["default"]);
app.get('/dashboard', function (req, res) {
    return res.status(200).send('hi');
});
//redirect to page 404 when endpoint does not exist
app.use('*', function (req, res) {
    return res.status(404).send('404 Page Not Found');
});
//global error handling
app.use(function (err, req, res, next) {
    var defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' }
    };
    var errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
//start app on port
app.listen(PORT, function () {
    console.log("Server listening on port: ".concat(PORT, "..."));
});
module.exports = app;
