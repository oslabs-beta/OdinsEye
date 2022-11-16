const React = require('react');
import NavBar from '../components/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DropDown from '../components/Dropdown';
import { AllDataType } from '../../types';
import KLineChart from '../components/KLineChart';
import Popup from '../components/PopUp';

//passdown namespaces, then render conditionally based on the current namespace selected

type KubType = {
  namespaces: string[] | null;
};

type KubDataType = {
  cpu: any[];
  memory: any[];
  ready: any[];
  reception: any[];
  restarts: any[];
  transmission: any[];
};

//get request for each pod
const KubPage = ({ namespaces }: KubType) => {
  const [page, setCurrentPage] = useState('default'); //need to set to current namespace
  //will need to update get request to include namespace within the function
  const initialData = {
    cpu: [],
    memory: [],
    ready: [],
    reception: [],
    restarts: [],
    transmission: [],
  };
  const [data, setData] = useState<KubDataType>(initialData);
  const [pods, setPods] = useState<string[]>([]);
  const [currentPod, setCurrentPod] = useState<string>();
  const getData = async (url: string, podsName?: boolean): Promise<void> => {
    try {
      if (podsName) {
        const response = await axios.get(url, { params: { namespace: page } });
        const data = await response.data;
        setPods(data);
      } else {
        const response = await axios.get(url);
        const data = await response.data;
        setData(data);
      }
      // return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(page);
    getData(`/api/kubernetesMetrics/namespaceMetrics/${page}`);
    console.log(getData('/api/kubernetesMetrics/podNames', true));
  }, [page]);
  const handleChange = (newName: string) => {
    setCurrentPage(newName);
  };
  const podsArray: JSX.Element[] = [];
  const [buttonPopup, setButtonPopup] = useState(false);
  if (pods.length > 0) {
    pods.forEach((name: string) => {
      podsArray.push(
        <div key={name}>
          <a
            className='pod-list'
            onClick={() => {
              setCurrentPod(name);
              setButtonPopup(true);
            }}
          >
            {name}
          </a>
          <br />
        </div>
      );
    });
  }

  return (
    <div className='main-container'>
      <DropDown
        namespaces={namespaces}
        current={page}
        handleChange={handleChange}
      />
      <h1 className='header'>Kubernetes</h1>
      <NavBar />
      <Popup
        namespace={page}
        podName={currentPod}
        setTrigger={setButtonPopup}
        trigger={buttonPopup}
      />
      <div className='data-container'>
        <div id='list-data'>
          <div id='total-pods'>
            total pods: {pods.length}
            <br />
            unhealthy:{data.ready.length}
          </div>
          <div id='pod-names'>{podsArray}</div>
        </div>
        <div id='small-graphs'>
          <div id='total-cpu'>
            <KLineChart
              data={data.cpu}
              label='test'
              yAxis='%'
              title='Total CPU % Usage'
            />
          </div>
          <div id='total-memory-use'>
            <KLineChart
              data={data.memory}
              label='kB'
              yAxis='kilobytes'
              title='Total Memory Usage (kB)'
            />
          </div>
          <div id='net-rec'>
            <KLineChart
              data={data.ready}
              label='kB'
              yAxis='kilobytes'
              title='Network Received (kB)'
            />
          </div>
          <div id='net-trans'>
            <KLineChart
              data={data.transmission}
              label='kB'
              yAxis='kilobytes'
              title='Network Transmitted (kB)'
            />
          </div>
          <div id='retarts'>
            <KLineChart
              data={data.restarts}
              label='Restarts'
              yAxis='restarts'
              title='Pod Restarts'
            />
          </div>
          {/* <div id='retarts'>
            <KLineChart
              data={data.ready}
              label='test'
              yAxis='test'
              title='Pod Restarts'
            />
          </div> */}
        </div>
        {/* <div id='logs'>logs</div> */}
      </div>
    </div>
  );
};

export default KubPage;

//need to send: namespace, and if want specific pod metric: pod-name
