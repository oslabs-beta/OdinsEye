const React = require('react');
import NavBar from '../components/Navbar';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import LiveChart from '../components/LiveChart';
const styles = require('../styles/index.scss');
const styles2 = require('../styles/colors.scss');
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types';
import { addNamespaces } from '../getData';
import { AppDispatch } from '../store';
import { currentPage } from '../rootReducer';
import { BounceLoader } from 'react-spinners';
import axios from 'axios';
import DonutChart from '../components/DonutChart';
import { MainDataType } from '../../types';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loaded, setLoaded] = useState<boolean>(true);
  //the bounce loader will only render the first time the page loads
  const [firstLoad, setfirstLoad] = useState<boolean>(false);
  const [data, setData] = useState<MainDataType>({
    totalCpu: [],
    totalMem: [],
    totalTransmit: [],
    totalReceive: [],
    totalPods: 0,
    notReadyPods: 0,
    totalNamespaces: 0,
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

  //Create line charts
  const lineObject: { [key: string]: any[] } = {
    totalCpu: [data.totalCpu, 'Cpu Usage', 'Percent', 'Total CPU % Usage'],
    totalMem: [
      data.totalMem,
      'Mem Usage',
      'Kilobytes',
      'Total Memory Usage (kB)',
    ],
    totalRec: [
      data.totalReceive,
      'Byte Usage',
      'Kilobytes',
      'Netword Received (kB)',
    ],
    totalTrans: [
      data.totalTransmit,
      'Byte Usage',
      'Kilobytes',
      'Network Transmitted (kB)',
    ],
  };

  const charts: JSX.Element[] = [];

  //Object used to generate line objects
  for (let info in lineObject) {
    charts.push(
      <div key={lineObject[info][3]} className='line' id='total-cpu'>
        <LineChart
          key={lineObject[info][3] + 'chart'}
          data={lineObject[info][0]}
          label={lineObject[info][1]}
          yAxis={lineObject[info][2]}
          title={lineObject[info][3]}
        />
      </div>
    );
  }

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
              <DonutChart
                data={[data.totalPods - data.notReadyPods, data.notReadyPods]}
                label='Total Pods'
              />
            </div>
          </div>
        </div>
        <div id='live-data' className='line-graph'>
          <div className='line'>
            <LiveChart
              key='rec'
              label={'Byte Usage'}
              path={'http://localhost:3000/live/received'}
              title='Live Network Received'
              type='Kilobytes'
            />
          </div>
          <div className='line'>
            <LiveChart
              key='trans'
              label={'Byte Usage'}
              path={'http://localhost:3000/live/transmit'}
              title='Live Network Transmitted'
              type='Kilobytes'
            />
          </div>
          {charts}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
