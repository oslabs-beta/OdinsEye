const React = require('react');
import NavBar from '../components/navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DropDown from '../components/Dropdown';
import { AllDataType } from '../../types';

//passdown namespaces, then render conditionally based on the current namespace selected

type KubType = {
  namespaces: string[] | null;
};

//get request for each pod
const KubPage = ({ namespaces }: KubType) => {
  const [page, setCurrentPage] = useState('default'); //need to set to current namespace
  //will need to update get request to include namespace within the function
  const initialData: AllDataType = {};
  const [data, setData] = useState(initialData);
  useEffect(() => {
    // setData(getData('k8'));
    //list other metrics below
  }, []);
  const handleChange = (newName: string) => {
    setCurrentPage(newName);
  };
  return (
    <div className='main-container'>
      <DropDown
        namespaces={namespaces}
        current={page}
        handleChange={handleChange}
      />
      <h1 className='header'>Kubernetes</h1>
      <NavBar />
      <div className='data-container'>
        <div id='list-data'>
          <div id='total-pods'>total pods</div>
        </div>
        <div id='small-graphs'>
          <div id='total-cpu'>total cpu</div>
          <div id='total-memory-use'>total mem use</div>
          <div id='net-rec'>net rec</div>
          <div id='net-trans'>net-trans</div>
          {/* <div id='extra'>extra</div> */}
        </div>
        <div id='logs'>logs</div>
      </div>
    </div>
  );
};

export default KubPage;

//need to send: namespace, and if want specific pod metric: pod-name
