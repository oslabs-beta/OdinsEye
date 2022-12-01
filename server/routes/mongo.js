"use strict";
exports.__esModule = true;
var express = require('express');
var mongoController_1 = require("../controllers/mongoController");
var dataObjectBuilder_1 = require("../controllers/dataObjectBuilder");
var mongoRouter = express.Router();
mongoRouter.get('/mongoMetrics', mongoController_1["default"].mongoMetrics, dataObjectBuilder_1["default"].dataObjectBuilder, function (req, res) {
    return res.status(200).json(req.app.locals.data);
});
exports["default"] = mongoRouter;
