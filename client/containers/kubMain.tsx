const React = require('react');
import NavBar from '../components/navbar';

type AppProps = {
  name: string;
};

const KubPage = ({ name }: AppProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <NavBar />
    </div>
  );
};

export default KubPage;
