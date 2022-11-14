import axios from 'axios';
import { GetDataType, ErrorType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
// import { addNamespaces } from './rootReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';

type PathArray = string[][];

let paths: PathArray = [
  ['/api/dashboard/totalCpu', 'total-cpu', 'one'],
  ['/api/dashboard/totalNamespaces', 'total-names', 'two'],
  ['/api/dashboard/totalMem', 'total-memory-use', 'one'],
  ['/api/dashboard/totalPods', 'total-pods', 'two'],
  ['/api/dashboard/totalReceive', 'net-rec', 'three'],
  ['/api/dashboard/totalTransmit', 'net-trans', 'three'],
];
const kPaths: PathArray = [['/api/dashboard/logs', 'logs']];

const getData: GetDataType = (page) => {
  if (page) {
    paths = paths.concat(kPaths);
  }
  paths.forEach(async (path) => {
    try {
      const response = await axios.get(path[0]);

      let element = document.getElementById(path[1]);
      if (element) {
        switch (path[2]) {
          case 'one':
            element.innerText = JSON.stringify(response.data.result[0].values);
            return;
          case 'two':
            element.innerText = response.data.data.result[0].values[0][1];
            return;
          case 'three':
            element.innerText = JSON.stringify(
              response.data.data.result[0].values
            );
            return;
          default:
            console.log(path[1], response);
            return;
        }
      }

      // if (response.data.data.result[0].values) {
      //   console.log(path[1], response.data.data.result[0].values);

      // } else if (response.data.result[0].values) {
      //   console.log(path[1], response.data.result[0].values);
      //   element.innerText = JSON.stringify(response.data.result[0].values);
      // } else {
      //   console.log(path[1], response.data.result[0]);
      //   element.innerText = JSON.stringify(response.data.result[0]);
      // }
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
      const response = await axios.get('/api/kubernetesMetrics/namespaceNames');
      return response.data;
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
