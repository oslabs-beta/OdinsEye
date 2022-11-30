const React = require('react');
import NavBar from '../components/Navbar';
const styles = require('../styles/index.scss');
const styles2 = require('../styles/colors.scss');
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types';
import { addNamespaces } from '../getData';
import { AppDispatch } from '../store';
import BarChart from '../components/BarChart';
import { currentPage } from '../rootReducer';
import { BounceLoader } from 'react-spinners';
import axios from 'axios';
import LineChart from '../components/LineChart';
import LiveChart from '../components/LiveChart';
import DoughnutChart from '../components/DonutChart';

type MainDataType = {
  totalCpu: any[];
  totalMem: any[];
  totalTransmit: any[];
  totalReceive: any[];
  totalPods: number;
  notReadyPods: number;
  totalNamespaces: string;
};

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loaded, setLoaded] = useState(true);
  //the bounce loader will only render the first time the page loads
  const [firstLoad, setfirstLoad] = useState(false);
  const [data, setData] = useState<MainDataType>({
    totalCpu: [],
    totalMem: [],
    totalTransmit: [],
    totalReceive: [],
    totalPods: 0,
    notReadyPods: 0,
    totalNamespaces: '',
  });

  //helper function to grab metrics
  const getData = async (url: string): Promise<any> => {
    try {
      const response = await axios.get(url);
      const metrics = await response.data;
      setData(metrics);
    } catch (err) {
      console.log('Main page: ', err);
    }
  };

  //grab all metrics from our server on first load
  useEffect(() => {
    getData('/api/dashboard/getAllMetrics');
  }, []);

  useEffect(() => {
    //invoking addNamespace function from root reducer
    dispatch(addNamespaces());
    //highlight navbar main page button
    dispatch(currentPage('main'));
    setfirstLoad(true);
    //to wait 6s before the namespace number loads
    setTimeout(() => {
      setLoaded(false);
    }, 6000);
  }, []);

  const namespaces = useSelector((state: State) => state.namespaces);
  let nameLength;
  if (namespaces) {
    nameLength = namespaces.length;
  }
  let theme: string;

  return (
    <div id='main-container'>
      <div className='header'>
        <h1>Odin's Eye</h1>
      </div>
      <NavBar />
      <div className='data-container'>
        <div id='list-data'>
          {loaded && !firstLoad ? (
            <BounceLoader
              color={'rgba(54, 133, 181, 0.8)'}
              loading={loaded}
              size={100}
              cssOverride={{
                marginTop: '110px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          ) : (
            <div id='total-names'>
              Total Namespaces
              <div id='names-num'>{nameLength}</div>
            </div>
          )}
          <div className='bar-chart'>
            <BarChart
              title={'Cluster Core Cpu Usage'}
              url={'/api/dashboard/cpuUsage'}
              labels={['Core Usage', 'Total Core Cpu']}
            />
          </div>
          <div id='total-pods'>
            <div id='total-pods'>
              <DoughnutChart
                data={[data.totalPods - data.notReadyPods, data.notReadyPods]}
                label='Total Pods'
              />
            </div>
          </div>
        </div>
        <div id='live-data' className='line-graph'>
          <div className='line'>
            <LiveChart
              label={'Byte Usage'}
              path={'http://localhost:3000/live/received'}
              title='Live Network Received'
              type='Kilobytes'
            />
          </div>
          <div className='line'>
            <LiveChart
              label={'Byte Usage'}
              path={'http://localhost:3000/live/transmit'}
              title='Live Network Transmitted'
              type='Kilobytes'
            />
          </div>
          <div className='line' id='total-cpu'>
            <LineChart
              data={data.totalCpu}
              label='Cpu Usage'
              yAxis='Percent'
              title='Total CPU % Usage'
            />
          </div>
          <div className='line' id='total-memory-use'>
            <LineChart
              data={data.totalMem}
              label='Mem Usage'
              yAxis='Kilobytes'
              title='Total Memory Usage (kB)'
            />
          </div>
          <div className='line' id='net-rec'>
            <LineChart
              data={data.totalReceive}
              label='Byte Usage'
              yAxis='Kilobytes'
              title='Netword Received (kB)'
            />
          </div>
          <div className='line' id='net-trans'>
            <LineChart
              data={data.totalTransmit}
              label='Byte Usage'
              yAxis='Kilobytes'
              title='Netword Transmitted (kB)'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
