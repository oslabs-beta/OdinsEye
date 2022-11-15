import axios from 'axios';
import { GetDataType, ErrorType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
// import { addNamespaces } from './rootReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AllDataType } from '../types';
import { totalmem } from 'os';

type PathArray = string[][];

let paths: PathArray = [
  ['/api/dashboard/totalCpu', 'total-cpu'],
  ['/api/dashboard/totalNamespaces', 'total-names'],
  ['/api/dashboard/totalMem', 'total-memory-use'],
  ['/api/dashboard/totalPods', 'total-pods'],
  ['/api/dashboard/totalReceive', 'net-rec', 'three'],
  ['/api/dashboard/totalTransmit', 'net-trans', 'three'],
];
const kPaths: PathArray = [['/api/dashboard/logs', 'logs']];

const getData: GetDataType = (page): AllDataType => {
  if (page) {
    paths = paths.concat(kPaths);
  }
  const allData: AllDataType = {};
  paths.forEach(async (path) => {
    try {
      const response = await axios.get(path[0]);
      let element = document.getElementById(path[1]);
      if (element) {
        switch (path[1]) {
          case 'total-cpu':
            allData.totalCpu = response.data.result[0].values;
            return;
          case 'total-memory-use':
            allData.totalMem = response.data.result[0].values;
            return;
          case 'total-names':
            allData.totalNames = response.data.data.result[0].values[0][1];
            return;
          case 'total-pods':
            allData.totalPods = response.data.data.result[0].values[0][1];
            return;
          case 'net-rec':
            allData.totalRec = response.data.data.result[0].values;
            return;
          case 'net-trans':
            allData.totalTrans = response.data.data.result[0].values;
            return;
          default:
            console.log(path[1], response);
            return;
        }
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
  return allData;
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
