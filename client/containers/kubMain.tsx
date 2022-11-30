import NavBar from '../components/Navbar';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import DropDown from '../components/Dropdown';
import LineChart from '../components/LineChart';
import Popup from '../components/PopUp';
import DonutChart from '../components/DonutChart';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../types';
import { currentPage, saveNamespace } from '../rootReducer';
import PodName from '../components/PodName';
import { KubDataType } from '../../types';

type KubType = {
  namespaces: string[] | null;
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
      const newData = await response.data;
      setData(newData);
      //second step grabs all pod names for current namespace and updates pod state
      const podResponse = await axios.get('/api/kubernetesMetrics/podNames', {
        params: { namespace: page },
      });
      const podData: string[] = await podResponse.data;
      setPods(podData);

      //thrid step checks the data that was retrieved, if num of pods NOT ready > 0 runs the following
      const badPods: string[] = [];
      if (newData.notReady > 0) {
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

  if (Array.isArray(pods) && pods.length > 0) {
    pods.forEach((pod: string | string[]) => {
      let status;
      let podName;

      Array.isArray(pod) ? (podName = pod[1]) : (podName = pod);
      Array.isArray(pod) && parseInt(pod[0]) > 0
        ? (status = false)
        : (status = true);

      podsArray.push(
        <PodName
          key={podName}
          pod={podName}
          ready={status}
          setCurrentPod={setCurrentPod}
          setButtonPopup={setButtonPopup}
        />
      );
    });
  }

  let dropdown;
  if (namespaces) {
    namespaces.length > 0
      ? (dropdown = (
          <DropDown
            namespaces={namespaces}
            current={page}
            handleChange={handleChange}
          />
        ))
      : (dropdown = (
          <div id='dropdown'>
            <button id='dropdown-but'>None</button>
          </div>
        ));
  }

  //Creates line chart array from line chart data object
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
          {dropdown}
          <div id='kube-total-pods'>
            <DonutChart
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
        <div className='line-graph'>{charts}</div>
      </div>
    </div>
  );
};

export default KubPage;
