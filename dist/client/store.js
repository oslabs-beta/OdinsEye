"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppDispatch = exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const react_redux_1 = require("react-redux");
const rootReducer_1 = __importDefault(require("./rootReducer"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: rootReducer_1.default,
});
exports.useAppDispatch = react_redux_1.useDispatch;
