import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import test from 'node:test';

//ACTIONS
const action1 = createAction<number, 'action1'>('action1');
const action2 = createAction<number, 'action2'>('action2');

interface TestState {
  test1: boolean;
  test2: number;
  data: null | [];
}

const initialState: TestState = {
  test1: false,
  test2: 1,
  data: null,
};

//REDUCER

const rootReducer = createReducer(0, (builder) =>
  builder
    .addCase(action1, (state, action) => {
      return state + action.payload;
    })
    .addCase(action2, (state, action) => {
      return state + action.payload;
    })
);

export default rootReducer;

export { action1, action2 };
