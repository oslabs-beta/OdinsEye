const React = require('react');
import NavBar from '../components/navbar';
const styles = require('../styles/index.scss');
const styles2 = require('../styles/colors.scss');
// import {logo} from 'odins-eye.png'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../types';
import { addNamespaces } from '../getData';
import { AppDispatch } from '../store';
// import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DonutChart';
import { AllDataType } from '../../types';
import BarChart from '../components/BarChart';
import { currentPage } from '../rootReducer';
import { BounceLoader } from 'react-spinners';
import axios from 'axios';
import KLineChart from '../components/KLineChart';
import KDonutChart from '../components/KDonutChart'

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

  const getData = async (url: string): Promise<any> => {
    try {
      const response = await axios.get(url)
      console.log(response)
      const metrics = await response.data;
      console.log(data)
      setData(metrics)
    }
    catch(err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    getData('/api/dashboard/getAllMetrics')
  },[])
  console.log('data', data.totalCpu)

  useEffect(() => {
    setTimeout(() => {
      setLoaded(false)
    }, 6000)
  }, [])

  useEffect(() => {
    dispatch(addNamespaces());
    dispatch(currentPage('main'));
    setfirstLoad(true);
  }, []);

  const namespaces = useSelector((state: State) => state.namespaces);
  let nameLength;
  if (namespaces) {
    nameLength = namespaces.length;
  }
  let theme: string;
  console.log(firstLoad)

  return (
      <div id='main-container'>
        <div className='header'>
          <h1>Odin's Eye</h1>
        </div>
        <NavBar />
        <div className='data-container'>
          {/* <div id='small-graphs'> */}
          <div id='list-data'>
            { loaded && !firstLoad  ? (
                <BounceLoader
                  color={'rgba(54, 133, 181, 0.8)'}
                  loading={loaded}
                  size={100}
                  cssOverride={{
                    marginTop: '110px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              ):(
            <div id='total-names'>
              Total Namespaces
              <div id='names-num'>{nameLength}</div>
            </div>
            )}
            <div id='total-pods'>
              <KDonutChart
                data={[data.totalPods - data.notReadyPods, data.notReadyPods]}
                label='Total Pods'
              />
            </div>
          </div>
          <div className='bar-chart'>
            <BarChart />
          </div>
          <div className='charts'>
            <div className='line-graph'>
              <div className='line' id='total-cpu'>
                {/* <LineChart
                  url='/api/dashboard/totalCpu'
                  obj='totalCpu'
                  label='Cpu Usage'
                  yAxis='%'
                  title='Total CPU % Usage'
                  color='rgba(137, 170, 230, 0.8)'
                /> */}
                <KLineChart 
                  data={data.totalCpu}
                  label='Cpu Usage'
                  yAxis='Percent'
                  title='Total CPU % Usage'
                />
              </div>
              <div className='line' id='total-memory-use'>
                {/* <LineChart
                  url='/api/dashboard/totalMem'
                  obj='totalMem'
                  label='Mem Usage'
                  yAxis='Kilobytes'
                  title='Total Memory Usage (kB)'
                  color='rgba(54, 133, 181, 0.8)'
                /> */}
                <KLineChart 
                  data={data.totalMem}
                  label='Mem Usage'
                  yAxis='Kilobytes'
                  title='Total Memory Usage (kB)'
                />
              </div>
            </div>
            <div className='line-graph'>
              <div className='line' id='net-rec'>
                {/* <LineChart
                  url='/api/dashboard/totalReceive'
                  obj='totalReceive'
                  label='Mem Usage'
                  yAxis='Kilobytes'
                  title='Network Transmitted (kB)'
                  color='rgba(4, 113, 166, 0.8)'
                /> */}
                <KLineChart 
                  data={data.totalReceive}
                  label='Byte Usage'
                  yAxis='Kilobytes'
                  title='Netword Received (kB)'
                />
              </div>
              <div className='line' id='net-trans'>
                {/* <LineChart
                  url='/api/dashboard/totalTransmit'
                  obj='totalTransmit'
                  label='Mem Usage'
                  yAxis='Kilobytes'
                  title='Network Received (kB)'
                  color='rgba(51, 153, 137, 0.7)'
                /> */}
                <KLineChart 
                  data={data.totalTransmit}
                  label='Byte Usage'
                  yAxis='Kilobytes'
                  title='Netword Transmitted (kB)'
                />
              </div>
            </div>
          </div>
        </div>
      </div> 

  );
};

export default MainPage;
