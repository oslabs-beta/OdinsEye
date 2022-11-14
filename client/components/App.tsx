const React = require('react');
import { Routes, Route } from 'react-router-dom';
import MainPage from '../containers/mainpage';
import KubPage from '../containers/kubMain';
import AlertsPage from '../containers/alertPage';
import MongoPage from '../containers/mongoMain';
import { AppDispatch } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { addNamespaces } from '../getData';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(addNamespaces());

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/kubernetes' element={<KubPage />} />
      {/* <Route path='/mongo' element={<MongoPage name={prop3} />} />
      <Route path='/alert' element={<AlertsPage name={prop2} />} /> */}
    </Routes>
  );
};

export default App;
