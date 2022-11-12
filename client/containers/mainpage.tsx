const React = require('react');
import NavBar from '../components/navbar';
const styles = require('../styles/index.scss');

type AppProps = {
  name: string;
};

const MainPage = ({ name }: AppProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <NavBar />
    </div>
  );
};

export default MainPage;
