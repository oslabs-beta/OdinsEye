import React, { useEffect, useState } from 'react';
import KLineChart from './KLineChart';
import axios from 'axios';
const styles = require('../styles/popup.scss');

type PopupType = {
  namespace: string;
  podName: string | undefined;
  trigger: boolean;
  setTrigger: (arg: boolean) => void;
};

type PopUpDataType = {
  cpu: any[];
  memory: any[];
  ready: any[];
  reception: any[];
  restarts: any[];
  transmission: any[];
};

const Popup = ({ namespace, podName, trigger, setTrigger }: PopupType) => {
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
      console.log(err);
    }
  };
  useEffect(() => {
    if (podName) {
      getData(podName);
    }
  }, [podName]);

  return trigger ? (
    <div id='popup'>
      <div id='popup-inner'>
        <h2>{podName}</h2>
        <button className='close-btn' onClick={() => setTrigger(false)}>
          X
        </button>
        <div className='data-container'>
          <div className='line-graph'>
            <div id='total-cpu' className='line'>
              <KLineChart
                data={data.cpu}
                label='test'
                yAxis='%'
                title='Total CPU % Usage'
              />
            </div>
            <div id='total-memory-use' className='line'>
              <KLineChart
                data={data.memory}
                label='kB'
                yAxis='kilobytes'
                title='Total Memory Usage (kB)'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='net-rec' className='line'>
              <KLineChart
                data={data.ready}
                label='kB'
                yAxis='kilobytes'
                title='Network Received (kB)'
              />
            </div>
            <div id='net-trans' className='line'>
              <KLineChart
                data={data.transmission}
                label='kB'
                yAxis='kilobytes'
                title='Network Transmitted (kB)'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='retarts' className='line'>
              <KLineChart
                data={data.restarts}
                label='Restarts'
                yAxis='restarts'
                title='Pod Restarts'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Popup;
