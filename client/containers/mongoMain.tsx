const React = require('react');
import NavBar from '../components/Navbar';
import { currentPage } from '../rootReducer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

type AppProps = {
  name: string;
};

const MongoPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentPage('mongo'));
  }, []);
  return (
    <div id='main-container'>
      <div className='header'>
        <h1>Odin's Eye</h1>
      </div>
      <NavBar />
      <div className='data-container'>
        <div id='temp'>
          <h1 id='mongo-h1'>PETER DID IT!!</h1>
          <img
            src={require('../images/hammer.png').default}
            alt='mjolnir'
            id='mjolnir'
          />
          <h1 id='mongo-h1'>COMING SOON</h1>
        </div>
        {/* <div id='list-data'></div> */}
        {/* <div className='charts'></div> */}
      </div>
    </div>
  );
};

export default MongoPage;
