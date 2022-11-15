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
import { AllDataType } from '../../types';

const MainPage = () => {
  // let paths: PathArray = [
  //   ['/api/dashboard/totalCpu', 'total-cpu'],
  //   ['/api/dashboard/totalNamespaces', 'total-names'],
  //   ['/api/dashboard/totalMem', 'total-memory-use'],
  //   ['/api/dashboard/totalPods', 'total-pods'],
  //   ['/api/dashboard/totalReceive', 'net-rec', 'three'],
  //   ['/api/dashboard/totalTransmit', 'net-trans', 'three'],
  // ];
  const dispatch = useDispatch<AppDispatch>();
  const initialData: AllDataType = {};
  const [data, setData] = useState(initialData);
  console.log(data);
  useEffect(() => {
    // setData(getData());
    dispatch(addNamespaces());
    //list other metrics below
  }, []);
  const namespaces = useSelector((state: TestState) => state.namespaces);
  let nameLength;
  const listArray: JSX.Element[] = [];
  if (namespaces) {
    nameLength = namespaces.length;
    let count = 1;
    namespaces.forEach((el) => {
      listArray.push(
        <li key={'li' + count} className='list-names'>
          {el}
        </li>
      );
      count++;
    });
  }
  return (
    <div className='main-container'>
      <h1 className='header'>Odin's Eye</h1>
      <NavBar />
      <div className='data-container'>
        <div id='list-data'>
          <div id='total-names'>
            Total Namespaces: {nameLength}
            <br />
            <ul id='name-list'>{listArray}</ul>
          </div>
          <div id='total-pods'>
            <DoughnutChart
              path='/api/dashboard/totalPods'
              label='Total Pods'
              tag='total-pod-chart'
            />
          </div>
        </div>
        <div id='small-graphs'>
          <div id='total-cpu'>total cpu</div>
          <div id='total-memory-use'>total mem use</div>
        </div>
        <div id='net-rec'>net rec</div>
        <div id='net-trans'>net-trans</div>
        <LineChart
          url='/api/dashboard/totalCpu'
          label='Cpu Usage'
          yAxis='percent'
        />
        <LineChart
          url='/api/dashboard/totalMem'
          label='Mem Usage'
          yAxis='kilobytes'
        />
        <LineChart
          url='/api/dashboard/totalTransmit'
          label='Mem Usage'
          yAxis='kilobytes'
        />
        <LineChart
          url='/api/dashboard/totalReceive'
          label='Mem Usage'
          yAxis='kilobytes'
        />
        <div id='test'>{/* <DoughnutChart data={data.totalPods} /> */}</div>
      </div>
    </div>
  );
};

export default MainPage;
