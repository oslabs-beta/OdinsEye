"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.action2 = exports.darkMode = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
//ACTIONS
const darkMode = (0, toolkit_1.createAction)('darkMode');
exports.darkMode = darkMode;
const action2 = (0, toolkit_1.createAction)('action2');
exports.action2 = action2;
const initialState = {
    dark: false,
    test2: 1,
    data: null,
};
//REDUCER
const rootReducer = (0, toolkit_1.createReducer)(initialState, (builder) => builder
    .addCase(darkMode, (state, action) => {
    let dark;
    state.dark ? (dark = false) : (dark = true);
    return Object.assign(Object.assign({}, state), { dark });
})
    .addCase(action2, (state, action) => {
    const test2 = state.test2 + action.payload;
    return Object.assign(Object.assign({}, state), { test2 });
}));
exports.default = rootReducer;
