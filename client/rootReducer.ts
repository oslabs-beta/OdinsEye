import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { TestState } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNamespaces } from './getData';

//ACTIONS
const darkMode = createAction<boolean, 'darkMode'>('darkMode');
// const addNamespaces = createAsyncThunk<any>('addNamespace', getNamespaces);

const initialState: TestState = {
  dark: false,
  namespaces: [],
  data: null,
  //possible global state values: user, total pods, namespaces?
};

//REDUCER

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(darkMode, (state) => {
      let dark: boolean;
      state.dark ? (dark = false) : (dark = true);
      return { ...state, dark };
    })
    .addCase(addNamespaces.pending, (state, action) => {
      console.log('pending');
      return { ...state };
    })
    .addCase(addNamespaces.fulfilled, (state, action) => {
      console.log(action.payload);
      return { ...state };
    })
    .addCase(addNamespaces.rejected, (state, action) => {
      console.log('rejected');
      return { ...state };
    })
);

export default rootReducer;

export { darkMode, addNamespaces };
