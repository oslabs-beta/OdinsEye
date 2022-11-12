const React = require('react');
import NavBar from '../components/navbar';
import { connect } from 'react-redux';
import * as actions from '../rootReducer';

type AppProps = {
  name: string;
};

type TestState = {
  dark: boolean;
  test2: number;
  data: null | [];
};

const mapStateToProps = (state: TestState) => ({});

const mapDispatchToProps = (dispatch: Function) => ({
  darkMode: (obj: boolean) => dispatch(actions.darkMode(obj)),
});

const KubPage = ({ name }: AppProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <NavBar />
      <div id='total-pods'>total pods</div>
      <div id='total-cpu'>totalcpu</div>
    </div>
  );
};

export default KubPage;
