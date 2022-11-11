import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import test from 'node:test';

//ACTIONS
const darkMode = createAction<number, 'darkMode'>('darkMode');
const action2 = createAction<number, 'action2'>('action2');

interface TestState {
  dark: boolean;
  test2: number;
  data: null | [];
}

const initialState: TestState = {
  dark: false,
  test2: 1,
  data: null,
};

//REDUCER

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(darkMode, (state, action) => {
      let dark: boolean;
      state.dark ? (dark = false) : (dark = true);
      return { ...state, dark };
    })
    .addCase(action2, (state, action) => {
      const test2 = state.test2 + action.payload;
      return { ...state, test2 };
    })
);

export default rootReducer;

export { darkMode, action2 };
