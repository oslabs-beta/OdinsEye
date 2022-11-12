"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require('react');
const navbar_1 = __importDefault(require("../components/navbar"));
const KubPage = ({ name }) => {
    return (React.createElement("div", null,
        React.createElement("h1", null, name),
        React.createElement(navbar_1.default, null)));
};
exports.default = KubPage;
