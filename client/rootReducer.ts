import {
  createAction,
  createReducer,
  createSlice,
  current,
} from '@reduxjs/toolkit';
import { State } from '../types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addNamespaces } from './getData';

//ACTIONS
const darkMode = createAction<boolean, 'darkMode'>('darkMode');
const currentPage = createAction<string, 'currentPage'>('currentPage');
const saveNamespace = createAction<string, 'saveNamespace'>('saveNamespace');

const initialState: State = {
  dark: true,
  namespaces: [],
  data: null,
  currentPage: 'main',
  currentNamespace: 'None',
  //possible global state values: user, total pods, namespaces?
};

//REDUCER

const rootReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(darkMode, (state, action) => {
      let dark;
      action.payload ? (dark = false) : (dark = true);
      return { ...state, dark };
    })
    .addCase(saveNamespace, (state, action) => {
      let currentNamespace = action.payload;
      return {
        ...state,
        currentNamespace,
      };
    })
    .addCase(currentPage, (state, action) => {
      let previous = document.getElementById(state.currentPage);
      if (previous) {
        previous.className = 'link';
      }
      let currentPage = action.payload;
      let newPage = document.getElementById(currentPage);
      if (newPage) {
        newPage.className = 'link-div current';
      }
      return { ...state, currentPage };
    })
    .addCase(addNamespaces.pending, (state, action) => {
      console.log('Retrieving namespaces...');
      return { ...state };
    })
    .addCase(addNamespaces.fulfilled, (state, action) => {
      const namespaces = action.payload;
      return { ...state, namespaces };
    })
    .addCase(addNamespaces.rejected, (state, action) => {
      console.log('Error, rejected');
      return { ...state };
    })
);

export default rootReducer;

export { darkMode, currentPage, addNamespaces, saveNamespace };
