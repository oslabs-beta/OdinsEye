"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require('react');
const react_router_dom_1 = require("react-router-dom");
const mainpage_1 = __importDefault(require("../containers/mainpage"));
const kubMain_1 = __importDefault(require("../containers/kubMain"));
const alertPage_1 = __importDefault(require("../containers/alertPage"));
const mongoMain_1 = __importDefault(require("../containers/mongoMain"));
const App = () => {
    let prop1 = 'CHRIS';
    let prop2 = 'EMILY';
    let prop3 = 'PETER';
    let prop4 = 'WENDY';
    return (React.createElement(react_router_dom_1.Routes, null,
        React.createElement(react_router_dom_1.Route, { path: '/', element: React.createElement(mainpage_1.default, { name: prop1 }) }),
        React.createElement(react_router_dom_1.Route, { path: '/kubernetes', element: React.createElement(kubMain_1.default, { name: prop4 }) }),
        React.createElement(react_router_dom_1.Route, { path: '/mongo', element: React.createElement(mongoMain_1.default, { name: prop3 }) }),
        React.createElement(react_router_dom_1.Route, { path: '/alert', element: React.createElement(alertPage_1.default, { name: prop2 }) })));
};
exports.default = App;
