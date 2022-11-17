const React = require('react');
import NavBar from '../components/navbar';
const styles = require('../styles/index.scss');
// import {logo} from 'odins-eye.png'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TestState } from '../../types';
import { addNamespaces } from '../getData';
import { AppDispatch } from '../store';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DonutChart';
import { AllDataType } from '../../types';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(addNamespaces());
  }, []);
  const namespaces = useSelector((state: TestState) => state.namespaces);
  let nameLength;
  if (namespaces) {
    nameLength = namespaces.length;
  }
  const dark = useSelector((state: TestState) => state.dark);
  let theme: string;

  return (
    <div id='main-container'>
      <div className='header'>
        <h1>Odin's Eye</h1>
      </div>
      <NavBar />
      <div className='data-container'>
        {/* <div id='small-graphs'> */}
        <div id='list-data'>
          <div id='total-names'>
            Total Namespaces
            <div id='names-num'>{nameLength}</div>
          </div>
          <div id='total-pods'>
            <DoughnutChart
              path='/api/dashboard/totalPods'
              path2='/api/kubernetesMetrics/podsNotReady'
              label='Total Pods'
              tag='total-pod-chart'
            />
          </div>
        </div>
        <div className='charts'>
          <div className='line-graph'>
            <div className='line' id='total-cpu'>
              <LineChart
                url='/api/dashboard/totalCpu'
                label='Cpu Usage'
                yAxis='%'
                title='Total CPU % Usage'
                color='rgba(137, 170, 230, 0.8)'
              />
            </div>
            <div className='line' id='total-memory-use'>
              <LineChart
                url='/api/dashboard/totalMem'
                label='Mem Usage'
                yAxis='Kilobytes'
                title='Total Memory Usage (kB)'
                color='rgba(54, 133, 181, 0.8)'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div className='line' id='net-rec'>
              <LineChart
                url='/api/dashboard/totalReceive'
                label='Mem Usage'
                yAxis='Kilobytes'
                title='Network Transmitted (kB)'
                color='rgba(4, 113, 166, 0.8)'
              />
            </div>
            <div className='line' id='net-trans'>
              <LineChart
                url='/api/dashboard/totalTransmit'
                label='Mem Usage'
                yAxis='Kilobytes'
                title='Network Received (kB)'
                color='rgba(51, 153, 137, 0.7)'
              />
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
