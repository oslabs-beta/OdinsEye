const React = require('react');
import NavBar from '../components/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DropDown from '../components/Dropdown';
import KLineChart from '../components/KLineChart';
import Popup from '../components/PopUp';
import KDoughnutChart from '../components/KDonutChart';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../types';
import { currentPage, saveNamespace } from '../rootReducer';
import PodName from '../components/podName';

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
  const currName = useSelector((state: State) => state.currentNamespace);
  const [page, setCurrentPage] = useState<string>('None');
  const [data, setData] = useState<KubDataType>({
    cpu: [],
    memory: [],
    notReady: 0,
    ready: [],
    reception: [],
    restarts: [],
    transmission: [],
  });
  // const [podState, setPodState] = useState<boolean>(false);
  const [pods, setPods] = useState<string[]>([]);
  const [currentPod, setCurrentPod] = useState<string>();
  const podsArray: JSX.Element[] = [];
  const getData = async (url: string, podsName?: boolean): Promise<void> => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      console.log('url',url)
      console.log('kube data', data);
      setData(data);
      const podResponse = await axios.get('/api/kubernetesMetrics/podNames', {
        params: { namespace: page },
      });
      const podData: string[] = await podResponse.data;
      setPods(podData);
      const badPods: string[] = [];
      if (data.notReady > 0) {
        const badPodResponse = await axios.get(
          '/api/kubernetesMetrics/podsNotReadyNames/',
          { params: { namespace: page, podData: podData } }
        );
        const badPodData = await badPodResponse.data;
        setPods(badPodData);
      }
    } catch (err) {

      setPods(['Error Fetching Pods']);
      console.log(err);
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
      if (page !== 'None') {
        getData(`/api/kubernetesMetrics/namespaceMetrics/${page}`);
      }
    } else {
      setPods(['No Pods']);
    }
  }, [page]);

  //Upon changing the namespace page, will save and update to current
  const handleChange = (newName: string) => {
    setCurrentPage(newName);
    //persists the current namespace selection when switching pages
    dispatch(saveNamespace(newName));
  };
  const [buttonPopup, setButtonPopup] = useState(false);

  if (pods.length > 0) {
    pods.forEach((pod: string | string[]) => {
      // if (!pod) {
      //   setPodState(true);
      //   <div key={pod[1]}>
      //     <a
      //       className='pod-list-load'
      //       onClick={() => {
      //         setCurrentPod(pod[1]);
      //         setButtonPopup(true);
      //       }}
      //     >
      //       {pod[1] + '- Loading'}
      //     </a>
      //     <br />
      //   </div>;
      // }
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
  const dark = useSelector((state: State) => state.dark);

  let theme: string;

  dark ? (theme = 'lightMode') : (theme = 'darkMode');
  return (
    <div id='main-container' className={theme}>
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
            <h2 id='pod-name-header'>Pod Names:</h2>
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
                data={data.reception}
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

//need to send: namespace, and if want specific pod metric: pod-name
