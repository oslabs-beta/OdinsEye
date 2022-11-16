const React = require('react');
import NavBar from '../components/navbar';
const styles = require('../styles/index.scss');
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TestState } from '../../types';
import { addNamespaces } from '../getData';
import { AppDispatch } from '../store';
import LineChart from '../components/LineChart';
import DoughnutChart from '../components/DonutChart';

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
  return (
    <div className='main-container'>
      <h1 className='header'>Odin's Eye</h1>
      <NavBar />
      <div className='data-container'>
        <div id='list-data'>
          <div id='total-names'>
            Total Namespaces:
            <br />
            {nameLength}
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
        <div id='small-graphs'>
          <div id='total-cpu'>
            total cpu
            <LineChart
              url='/api/dashboard/totalCpu'
              label='Cpu Usage'
              yAxis='percent'
            />
          </div>
          <div id='total-memory-use'>
            total mem use
            <LineChart
              url='/api/dashboard/totalMem'
              label='Mem Usage'
              yAxis='kilobytes'
            />
          </div>
        </div>
        <div id='net-rec'>
          net rec
          <LineChart
            url='/api/dashboard/totalReceive'
            label='Mem Usage'
            yAxis='kilobytes'
          />
        </div>
        <div id='net-trans'>
          net-trans
          <LineChart
            url='/api/dashboard/totalTransmit'
            label='Mem Usage'
            yAxis='kilobytes'
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
