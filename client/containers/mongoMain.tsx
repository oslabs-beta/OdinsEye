const React = require('react');
import NavBar from '../components/Navbar';
import axios from 'axios';
import KLineChart from '../components/LineChart';
import { useState, useEffect } from 'react';
import { currentPage } from '../rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../types';

type MongoDataType = {
  opcounter: any[];
  connections: any[];
  queues: any[];
  latency: any[];
  uptime: any[];
  memory: any[];
  processes: any[];
}

const MongoPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentPage('mongo'));
  }, []);

  const initialData = {
    opcounter: [],
    connections: [],
    queues: [],
    latency: [],
    uptime: [],
    memory: [],
    processes: []
  };

  const[data, setData] = useState<MongoDataType>(initialData);

  // helper function to fetch mongodb data
  const getData = async (url: string, podsName?: boolean): Promise<void> => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setData(data);
    } catch (err) {
      console.log(err)
    }
  }

  // fetch data on load
  useEffect(() => {
    getData('/api/mongodb/mongoMetrics');
  }, []);

  return (
    <div id='main-container'>
      <div className='header'>
        <h1>Odin's Eye</h1>
      </div>
      <NavBar />
      <div className='data-container'>
        {/* <div id='list-data'></div> */}
        <div id='mongo-charts' className='charts'>
          <div className='line-graph'>
            <div id='uptime' className='line'>
              <KLineChart
                data={data.uptime}
                label='Uptime'
                yAxis='Current'
                title='Current Uptime'
              />
            </div>
            <div id='memory' className='line'>
              <KLineChart
                data={data.memory}
                label='Memory'
                yAxis='Current'
                title='Current Memory'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='opcounter' className='line'>
              <KLineChart
                data={data.opcounter}
                label='Operations'
                yAxis='Current'
                title='Current Operations'
              />
            </div>
            <div id='connections' className='line'>
              <KLineChart
                data={data.connections}
                label='Connections'
                yAxis='Current'
                title='Current Connections'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='queue' className='line'>
              <KLineChart
                data={data.queues}
                label='Queue'
                yAxis='Current'
                title='Current Queue'
              />
            </div>
            <div id='processes' className='line'>
              <KLineChart
                data={data.processes}
                label='Processes'
                yAxis='Current'
                title='Current Processes'
              />
            </div>
          </div>
          <div className='line-graph'>
            <div id='latency' className='line'>
              <KLineChart
                data={data.queues}
                label='Latency'
                yAxis='Latency'
                title='Current Latency'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MongoPage;
