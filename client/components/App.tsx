const React = require('react');
import { Routes, Route } from 'react-router-dom';
import MainPage from '../containers/mainpage';
import KubPage from '../containers/kubMain';
import AlertsPage from '../containers/alertPage';
import MongoPage from '../containers/mongoMain';

const App = () => {
  let prop1 = 'CHRIS';
  let prop2 = 'EMILY';
  let prop3 = 'PETER';
  let prop4 = 'WENDY';
  return (
    <Routes>
      <Route path='/' element={<MainPage name={prop1} />} />
      <Route path='/kubernetes' element={<KubPage name={prop4} />} />
      <Route path='/mongo' element={<MongoPage name={prop3} />} />
      <Route path='/alert' element={<AlertsPage name={prop2} />} />
    </Routes>
  );
};

export default App;
