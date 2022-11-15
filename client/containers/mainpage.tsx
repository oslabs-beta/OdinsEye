const React = require('react');
import NavBar from '../components/navbar';
const styles = require('../styles/index.scss');
import { getData } from '../getData';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TestState } from '../../types';
import { addNamespaces } from '../getData';
import { AppDispatch } from '../store';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DonutChart';
import { AllDataType } from '../../types'


// type AppProps = {
//   name?: string;
// };

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const initialData: AllDataType = {};
  const [data, setData] = useState(initialData);
  useEffect(() => {
    setData(getData());
    dispatch(addNamespaces());
    //list other metrics below
  }, []);
  const namespaces = useSelector((state: TestState) => state.namespaces);
  return (
    <div className='main-container'>
      <h1 className='header'>Odin's Eye</h1>
      <NavBar />
      <div className='data-container'>
        {/* <div id='small-graphs'> */}
        <div id='list-data'>
          <div id='total-names'>total names</div>
          <div id='total-pods'>total pods</div>
        </div>
        <div className='charts'>
          <div className='line-graph'>
            <div className='line' id='total-cpu'>total cpu
              <LineChart url='/api/dashboard/totalCpu' label='Cpu Usage' yAxis='Percent'/>
            </div>
            <div className='line' id='total-memory-use'>total mem use
              <LineChart url='/api/dashboard/totalMem' label='Mem Usage' yAxis='Kilobytes'/>
            </div>
          </div>
          <div className='line-graph'>
            <div className='line' id='net-rec'>net rec
              <LineChart url='/api/dashboard/totalReceive' label='Mem Usage' yAxis='Kilobytes'/>
            </div>
            <div className='line' id='net-trans'>net-trans
              <LineChart url='/api/dashboard/totalTransmit' label='Mem Usage' yAxis='Kilobytes'/>
            </div>
        </div>
        </div>
          {/* <div id='test'> */}
          {/* <DoughnutChart data={data.totalPods} /> */}
          {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default MainPage;
