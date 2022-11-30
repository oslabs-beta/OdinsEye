"use strict";
exports.__esModule = true;
exports.end = exports.start = void 0;
//start time to be set 24 hour from now
exports.start = new Date(Date.now() - 86400000).toISOString();
exports.end = new Date(Date.now()).toISOString();
