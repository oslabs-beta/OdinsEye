const React = require('react');
import { Routes, Route } from 'react-router-dom';
import MainPage from '../containers/mainpage';
import KubPage from '../containers/kubMain';
import MongoPage from '../containers/mongoMain';
import { useSelector } from 'react-redux';
import { State } from '../../types';

const App = () => {
  const namespaces = useSelector((state: State) => state.namespaces);
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/kubernetes' element={<KubPage namespaces={namespaces} />} />
      <Route path='/mongo' element={<MongoPage />} />
    </Routes>
  );
};

export default App;
