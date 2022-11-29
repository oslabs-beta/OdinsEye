const React = require('react');
import NavBar from '../components/Navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DropDown from '../components/Dropdown';
import LineChart from '../components/LineChart';
import Popup from '../components/PopUp';
import DoughnutChart from '../components/DonutChart';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../types';
import { currentPage, saveNamespace } from '../rootReducer';
import PodName from '../components/PodName';

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

const KubPage = ({ namespaces }: KubType) => {
  const dispatch = useDispatch();

  //dark mode toggling
  const dark = useSelector((state: State) => state.dark);
  let theme: string;
  dark ? (theme = 'lightMode') : (theme = 'darkMode');

  //state of the current namespace
  const currName = useSelector((state: State) => state.currentNamespace);

  //page represents current namespace being displayed
  const [page, setCurrentPage] = useState<string>('');
  const [data, setData] = useState<KubDataType>({
    cpu: [],
    memory: [],
    notReady: 0,
    ready: [],
    reception: [],
    restarts: [],
    transmission: [],
  });

  //set pods for podsArray to spread within div
  const [pods, setPods] = useState<string[]>([]);
  const [currentPod, setCurrentPod] = useState<string>();

  //button to trigger popup
  const [buttonPopup, setButtonPopup] = useState(false);

  //helper function to grab metrics
  const getData = async (url: string): Promise<void> => {
    try {
      //first step grabs all data for the current namespace
      const response = await axios.get(url);
      const data = await response.data;
      setData(data);

      //second step grabs all pod names for current namespace and updates pod state
      const podResponse = await axios.get('/api/kubernetesMetrics/podNames', {
        params: { namespace: page },
      });
      const podData: string[] = await podResponse.data;
      setPods(podData);

      //thrid step checks the data that was retrieved, if num of pods NOT ready > 0 runs the following
      const badPods: string[] = [];
      if (data.notReady > 0) {
        const badPodResponse = await axios.get(
          '/api/kubernetesMetrics/podsNotReadyNames/',
          { params: { namespace: page, podData: podData } }
        );
        const badPodData = await badPodResponse.data;
        //data returned will be an array of arrays, ex: []
        setPods(badPodData);
      }
    } catch (err) {
      setPods(['Error Fetching Pods']);
      console.log('Kubernetes Page: ', err);
    }
  };

  //runs effect on first render
  useEffect(() => {
    dispatch(currentPage('kubernetes'));
    currName !== ''
      ? setCurrentPage(currName)
      : namespaces
      ? setCurrentPage(namespaces[0])
      : setCurrentPage('None');
  }, []);

  //runs effect on namespace change
  useEffect(() => {
    if (namespaces) {
      if (page !== 'None' && page) {
        getData(`/api/kubernetesMetrics/namespaceMetrics/${page}`);
      }
    }
  }, [page]);

  //Upon changing the namespace page, will save and update to current
  const handleChange = (newName: string) => {
    setCurrentPage(newName);
    //persists the current namespace selection when switching pages
    dispatch(saveNamespace(newName));
  };

  //Creates array of pod names
  const podsArray: JSX.Element[] = [];

  if (pods.length > 0) {
    pods.forEach((pod: string | string[]) => {
      if (Array.isArray(pod)) {
        if (parseInt(pod[0]) > 0) {
          podsArray.push(
            <PodName
              key={pod[1]}
              pod={pod[1]}
              ready={false}
              setCurrentPod={setCurrentPod}
              setButtonPopup={setButtonPopup}
            />
          );
        } else {
          podsArray.push(
            <PodName
              key={pod[1]}
              pod={pod[1]}
              ready={true}
              setCurrentPod={setCurrentPod}
              setButtonPopup={setButtonPopup}
            />
          );
        }
      } else {
        podsArray.push(
          <PodName
            key={pod}
            pod={pod}
            ready={true}
            setCurrentPod={setCurrentPod}
            setButtonPopup={setButtonPopup}
          />
        );
      }
    });
  }

  return (
    <div id='main-container' className={theme}>
      <div className='header'>
        <h1>Odin's Eye</h1>
      </div>
      <NavBar />
      <Popup
        podName={currentPod}
        setTrigger={setButtonPopup}
        trigger={buttonPopup}
      />
      <div className='data-container'>
        <div id='kube-list-data'>
          {namespaces ? (
            namespaces.length > 0 ? (
              <DropDown
                namespaces={namespaces}
                current={page}
                handleChange={handleChange}
              />
            ) : (
              <div id='dropdown'>
                <button id='dropdown-but'>None</button>
              </div>
            )
          ) : (
            <div></div>
          )}
          <div id='kube-total-pods'>
            <DoughnutChart
              data={
                pods[0] === 'Error Fetching Pods'
                  ? 0
                  : [pods.length - data.notReady, data.notReady]
              }
              label='Total Pods'
            />
          </div>
          <div id='pod-names'>
            <h2 id='pod-name-header'>Pod Names:</h2>
            {podsArray}
          </div>
        </div>
        <div className='charts'>
          <div className='line-graph'>
            <div id='total-cpu' className='line'>
              <LineChart
                data={data.cpu}
                label='Percent'
                yAxis='%'
                title='Total CPU % Usage'
              />
            </div>
            <div id='total-memory-use' className='line'>
              <LineChart
                data={data.memory}
                label='kB'
                yAxis='Kilobytes'
                title='Total Memory Usage (kB)'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='net-rec' className='line'>
              <LineChart
                data={data.reception}
                label='kB'
                yAxis='Kilobytes'
                title='Network Received (kB)'
              />
            </div>
            <div id='net-trans' className='line'>
              <LineChart
                data={data.transmission}
                label='kB'
                yAxis='Kilobytes'
                title='Network Transmitted (kB)'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='retarts' className='line'>
              <LineChart
                data={data.restarts}
                label='Restarts'
                yAxis='Restarts'
                title='Pod Restarts'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KubPage;
