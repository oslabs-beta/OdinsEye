const React = require('react');
import NavBar from '../components/navbar';

type AppProps = {
  name: string;
};

const MongoPage = () => {
  return (
    <div id='main-container'>
      <div className='header'>
        <h1>Odin's Eye</h1>
      </div>
      <NavBar />
      <div className='data-container'>
        <div id='temp'>
          <h1 id='mongo'>PETER DID IT!!</h1>

          <img
            src={require('../images/hammer.png').default}
            alt='mjolnir'
            id='mjolnir'
          />
        </div>
        <h1 id='mongo'>COMING SOON</h1>
        {/* <div id='list-data'></div> */}
        {/* <div className='charts'></div> */}
      </div>
    </div>
  );
};

export default MongoPage;
