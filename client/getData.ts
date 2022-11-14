import axios from 'axios';
import { GetDataType, ErrorType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
// import { addNamespaces } from './rootReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';

type PathArray = string[][];

let paths: PathArray = [
  ['/api/dashboard/totalCpu', 'total-cpu'],
  ['/api/dashboard/totalNamespaces', 'total-cpu'],
  ['/api/dashboard/totalMem', 'total-memory-use'],
  ['/api/dashboard/totalPods', 'total-pods'],
  ['/api/dashboard/totalReceive', 'net-rec'],
  ['/api/dashboard/totalTransmit', 'net-trans'],
];
const kPaths: PathArray = [['/api/dashboard/logs', 'logs']];

const getData: GetDataType = (page) => {
  if (page) {
    paths = paths.concat(kPaths);
  }
  paths.forEach(async (path) => {
    try {
      console.log(path);
      const response = await axios.get(path[0]);
      let element = document.getElementById(path[1]);
      if (element) {
        element.innerText = JSON.stringify(response.data.result[0]);
      }
    } catch (err) {
      const frontErr: ErrorType = {
        log: 'error in getData',
        status: 500,
        message: { err: 'an error ocurred' },
      };
      const errorObj = Object.assign({}, frontErr, err);
      return;
    }
  });
};

const addNamespaces = createAsyncThunk(
  'addNamespaces',
  async (data, thunkApi) => {
    try {
      console.log(data);
      const response = await axios.get('/api/dashboard/namespaces');
      console.log(response);
      return response;
    } catch (err) {
      const frontErr: ErrorType = {
        log: 'error in getNamespaces',
        status: 500,
        message: { err: 'an error ocurred' },
      };
      const errorObj = Object.assign({}, frontErr, err);
      return thunkApi.rejectWithValue(errorObj.message);
    }
  }
);

export { getData, addNamespaces };
