import NavBar from '../components/Navbar';
import axios from 'axios';
import LineChart from '../components/LineChart';
import React, { useState, useEffect } from 'react';
import { currentPage } from '../rootReducer';
import { useDispatch } from 'react-redux';
import { MongoDataType } from '../../types';

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
    processes: [],
  };

  const [data, setData] = useState<MongoDataType>(initialData);

  // helper function to fetch mongodb data
  const getData = async (url: string, podsName?: boolean): Promise<void> => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

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
        <div id='mongo-charts' className='line-graph'>
          <div id='uptime' className='line'>
            <LineChart
              data={data.uptime}
              label='Uptime'
              yAxis='Current'
              title='Current Uptime'
            />
          </div>
          <div id='memory' className='line'>
            <LineChart
              data={data.memory}
              label='Memory'
              yAxis='Current'
              title='Current Memory'
            />
          </div>
          <div id='opcounter' className='line'>
            <LineChart
              data={data.opcounter}
              label='Operations'
              yAxis='Current'
              title='Current Operations'
            />
          </div>
          <div id='connections' className='line'>
            <LineChart
              data={data.connections}
              label='Connections'
              yAxis='Current'
              title='Current Connections'
            />
          </div>
          <div id='queue' className='line'>
            <LineChart
              data={data.queues}
              label='Queue'
              yAxis='Current'
              title='Current Queue'
            />
          </div>
          <div id='processes' className='line'>
            <LineChart
              data={data.processes}
              label='Processes'
              yAxis='Current'
              title='Current Processes'
            />
          </div>
          <div id='latency' className='line'>
            <LineChart
              data={data.queues}
              label='Latency'
              yAxis='Latency'
              title='Current Latency'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MongoPage;
