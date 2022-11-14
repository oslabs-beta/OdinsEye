const React = require('react');
import { Routes, Route } from 'react-router-dom';
import MainPage from '../containers/mainpage';
import KubPage from '../containers/kubMain';
import AlertsPage from '../containers/alertPage';
import MongoPage from '../containers/mongoMain';
import { useDispatch, useSelector } from 'react-redux';
import { TestState } from '../../types';

const App = () => {
  const namespaces = useSelector((state: TestState) => state.namespaces);
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/kubernetes' element={<KubPage namespaces={namespaces} />} />
      {/* <Route path='/mongo' element={<MongoPage name={prop3} />} />
      <Route path='/alert' element={<AlertsPage name={prop2} />} /> */}
    </Routes>
  );
};

export default App;
