import React, { useEffect, useState } from 'react';
import LineChart from './LineChart';
import axios from 'axios';
const styles = require('../styles/popup.scss');
import { Data } from '../../types';

type PopupType = {
  podName: string | undefined;
  trigger: boolean;
  setTrigger: (arg: boolean) => void;
};

type PopUpDataType = {
  cpu: Data[];
  memory: Data[];
  ready: Data[];
  reception: Data[];
  restarts: Data[];
  transmission: Data[];
};

const Popup = ({ podName, trigger, setTrigger }: PopupType) => {
  const initialData = {
    cpu: [],
    memory: [],
    ready: [],
    reception: [],
    restarts: [],
    transmission: [],
  };

  const [data, setData] = useState<PopUpDataType>(initialData);

  const getData = async (name: string): Promise<void> => {
    try {
      const response = await axios.get(
        `/api/kubernetesMetrics/podMetrics/${podName}`
      );
      const data = await response.data;
      setData(data);
    } catch (err) {
      console.log('Error in Popup: ', err);
    }
  };

  useEffect(() => {
    if (podName) {
      getData(podName);
    }
  }, [podName]);

  const lineObject: { [key: string]: any[] } = {
    totalCpu: [data.cpu, 'Cpu Usage', 'Percent', 'Total CPU % Usage'],
    totalMem: [
      data.memory,
      'Mem Usage',
      'Kilobytes',
      'Total Memory Usage (kB)',
    ],
    totalRec: [
      data.reception,
      'Byte Usage',
      'Kilobytes',
      'Netword Received (kB)',
    ],
    totalTrans: [
      data.transmission,
      'Byte Usage',
      'Kilobytes',
      'Network Transmitted (kB)',
    ],
    restart: [data.restarts, 'Restarts', 'Restarts', 'Pod Restarts'],
  };

  const charts: JSX.Element[] = [];

  for (let info in lineObject) {
    charts.push(
      <div className='line' id='total-cpu'>
        <LineChart
          key={lineObject[info][0]}
          data={lineObject[info][0]}
          label={lineObject[info][1]}
          yAxis={lineObject[info][2]}
          title={lineObject[info][3]}
        />
      </div>
    );
  }
  return trigger ? (
    <div id='popup'>
      <div id='popup-inner'>
        <h2>{podName}</h2>
        <button className='close-btn' onClick={() => setTrigger(false)}>
          X
        </button>
        <div className='data-container'>
          <div className='line-graph'>{charts}</div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Popup;
