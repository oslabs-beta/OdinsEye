const React = require('react');
import NavBar from '../components/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DropDown from '../components/Dropdown';
import { AllDataType } from '../../types';
import KLineChart from '../components/KLineChart';
import Popup from '../components/PopUp';
import KDoughnutChart from '../components/KDonutChart';

//passdown namespaces, then render conditionally based on the current namespace selected

type KubType = {
  namespaces: string[] | null;
};

type KubDataType = {
  cpu: any[];
  memory: any[];
  notReady: number;
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
    notReady: 0,
    ready: [],
    reception: [],
    restarts: [],
    transmission: [],
  };
  const [data, setData] = useState<KubDataType>(initialData);
  const [pods, setPods] = useState<string[]>([]);
  const [currentPod, setCurrentPod] = useState<string>();
  const podsArray: JSX.Element[] = [];
  const getData = async (url: string, podsName?: boolean): Promise<void> => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setData(data);
      const podResponse = await axios.get('/api/kubernetesMetrics/podNames', {
        params: { namespace: page },
      });
      const podData: string[] = await podResponse.data;
      setPods(podData);
      const badPods: any[] = [];
      if (data.notReady > 0) {
        // console.log(podData, 'data');
        const badPodResponse = await axios.get(
          '/api/kubernetesMetrics/podsNotReadyNames/',
          { params: { namespace: page, podData: podData } }
        );
        const badPodData = await badPodResponse.data;
        setPods(badPodData);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData(`/api/kubernetesMetrics/namespaceMetrics/${page}`);
  }, [page]);

  const handleChange = (newName: string) => {
    setCurrentPage(newName);
  };

  const [buttonPopup, setButtonPopup] = useState(false);
  if (pods.length > 0) {
    pods.forEach((pod: string | string[]) => {
      if (Array.isArray(pod)) {
        if (parseInt(pod[0]) > 0) {
          podsArray.push(
            <div key={pod[1]}>
              <a
                className='pod-list-bad'
                onClick={() => {
                  setCurrentPod(pod[1]);
                  setButtonPopup(true);
                }}
              >
                {pod[1]}
              </a>
              <br />
            </div>
          );
        } else {
          podsArray.push(
            <div key={pod[1]}>
              <a
                className='pod-list'
                onClick={() => {
                  setCurrentPod(pod[1]);
                  setButtonPopup(true);
                  handleChange(page);
                }}
              >
                {pod}
              </a>
              <br />
            </div>
          );
        }
      } else {
        podsArray.push(
          <div key={pod}>
            <a
              className='pod-list'
              onClick={() => {
                setCurrentPod(pod);
                setButtonPopup(true);
              }}
            >
              {pod}
            </a>
            <br />
          </div>
        );
      }
    });
  }
  return (
    <div className='main-container'>
      <div className='header'>
        <h1>Odin's Eye</h1>
      </div>
      <NavBar />
      <Popup
        namespace={page}
        podName={currentPod}
        setTrigger={setButtonPopup}
        trigger={buttonPopup}
      />
      <div className='data-container'>
        <div id='kube-list-data'>
          <DropDown
            namespaces={namespaces}
            current={page}
            handleChange={handleChange}
          />
          <div id='kube-total-pods'>
            <KDoughnutChart
              data={[pods.length - data.notReady, data.notReady]}
              label='Total Pods'
            />
          </div>
          <div id='pod-names'>
            <h2>
              Pod Names:
              <br />
            </h2>
            {podsArray}
          </div>
        </div>
        <div className='charts'>
          <div className='line-graph'>
            <div id='total-cpu' className='line'>
              <KLineChart
                data={data.cpu}
                label='Percent'
                yAxis='%'
                title='Total CPU % Usage'
              />
            </div>
            <div id='total-memory-use' className='line'>
              <KLineChart
                data={data.memory}
                label='kB'
                yAxis='Kilobytes'
                title='Total Memory Usage (kB)'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='net-rec' className='line'>
              <KLineChart
                data={data.ready}
                label='kB'
                yAxis='Kilobytes'
                title='Network Received (kB)'
              />
            </div>
            <div id='net-trans' className='line'>
              <KLineChart
                data={data.transmission}
                label='kB'
                yAxis='Kilobytes'
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
        {/* <div id='logs'>logs</div> */}
      </div>
    </div>
  );
};

export default KubPage;

//need to send: namespace, and if want specific pod metric: pod-name
