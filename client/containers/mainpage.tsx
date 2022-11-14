const React = require('react');
import NavBar from '../components/navbar';
const styles = require('../styles/index.scss');
import axios from 'axios';
import getData from '../getData';
import { useState, useEffect } from 'react';

type AppProps = {
  name: string;
};

const MainPage = ({ name }: AppProps) => {
  useEffect(() => {
    const totalCPU = getData('/api/dashboard/totalCpu', 'total-cpu');
    //list other metrics below
  });
  return (
    <div className='main-container'>
      <h1 className='header'>Odin's Eye</h1>
      <NavBar />
      <div className='data-container'>
        <div id='small-graphs'>
          <div id='total-cpu'>total cpu</div>
          <div id='total-memory-use'>total mem use</div>
          <div id='total-pods'>total pods</div>
        </div>
        <div id='net-rec'>net rec</div>
        <div id='net-trans'>net-trans</div>
      </div>
    </div>
  );
};

export default MainPage;
