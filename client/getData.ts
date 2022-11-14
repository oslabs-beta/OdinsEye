import axios from 'axios';
import { GetDataType, ErrorType } from '../types';

const getData: GetDataType = async (route, elementId) => {
  try {
    const response = await axios.get(route);
    let element = document.getElementById(elementId);
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
};

export default getData;
