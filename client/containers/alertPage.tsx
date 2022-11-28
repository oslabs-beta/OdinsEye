const React = require('react');
import NavBar from '../components/Navbar';

type AppProps = {
  name: string;
};

const AlertsPage = ({ name }: AppProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <NavBar />
    </div>
  );
};

export default AlertsPage;
