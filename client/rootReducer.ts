import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { TestState } from '../types';

//ACTIONS
const darkMode = createAction<boolean, 'darkMode'>('darkMode');
const action2 = createAction<number, 'action2'>('action2');

const initialState: TestState = {
  dark: false,
  test2: 1,
  data: null,
  //possible global state values: user, total pods, namespaces?
};

//REDUCER

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(darkMode, (state, action) => {
      console.log('reducer', action.payload);
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
