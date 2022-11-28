"use strict";
exports.__esModule = true;
var express = require('express');
var mongoController_1 = require("../controllers/mongoController");
var mongoRouter = express.Router();
mongoRouter.get('/mongoMetrics', mongoController_1["default"].mongoMetrics, function (req, res) {
    return res.status(200).json(res.locals.mongoData);
});
exports["default"] = mongoRouter;
