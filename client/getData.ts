import axios from 'axios';
import { ErrorType } from '../types';
import { useDispatch, useSelector } from 'react-redux';
// import { addNamespaces } from './rootReducer';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { AllDataType } from '../types';

type PathArray = string[][];
type GetDataType = (pathname?: string) => any;

// let paths: PathArray = [
//   ['/api/dashboard/totalCpu', 'total-cpu'],
//   ['/api/dashboard/totalNamespaces', 'total-names'],
//   ['/api/dashboard/totalMem', 'total-memory-use'],
//   ['/api/dashboard/totalPods', 'total-pods'],
//   ['/api/dashboard/totalReceive', 'net-rec'],
//   ['/api/dashboard/totalTransmit', 'net-trans'],
// ];
// const kPaths: PathArray = [['/api/dashboard/logs', 'logs']];

// const getData: GetDataType = async (pathname): Promise<any> => {
//   const allData: AllDataType = {};
//   try {
//     const response = await axios.get('/api/dashboard/totalCpu');
//     switch (paths[0][1]) {
//       case 'total-cpu':
//         allData.data = response.data.result[0].values;
//         return allData;
//       case 'total-memory-use':
//         allData.data = response.data.result[0].values;
//         return allData;
//       case 'total-names':
//         allData.data = response.data.data.result[0].values[0][1];
//         return;
//       case 'total-pods':
//         allData.data = [parseInt(response.data.data.result[0].values[0][1])];
//         return;
//       case 'net-rec':
//         allData.data = response.data.result[0].values;
//         return;
//       case 'net-trans':
//         allData.data = response.data.result[0].values;
//         return;
//       default:
//         console.log(paths[1], response);
//         return;
//     }
//   } catch (err) {
//     const frontErr: ErrorType = {
//       log: 'error in getData',
//       status: 500,
//       message: { err: 'an error ocurred' },
//     };
//     const errorObj = Object.assign({}, frontErr, err);
//     return errorObj;
//   }
//   return allData;
// };

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

// const setCurrentPage

export { addNamespaces };
