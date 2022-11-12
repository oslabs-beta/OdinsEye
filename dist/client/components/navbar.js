"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const NavBar = () => {
    return (react_1.default.createElement("nav", { id: 'navBar' },
        react_1.default.createElement("div", null, "HELLO I AM A NAVBAR"),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/' }, "CHRIS"),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/kubernetes' }, "WENDY"),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/mongo' }, "PETER"),
        react_1.default.createElement("br", null),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/alert' }, "EMILY")));
};
exports.default = NavBar;
