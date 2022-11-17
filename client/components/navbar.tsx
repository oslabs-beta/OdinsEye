import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkMode } from '../rootReducer';
import { TestState } from '../../types';

const NavBar = () => {
  const dispatch = useDispatch();
  const dark = useSelector((state: TestState) => state.dark);
  let classInfo: string;
  dark ? (classInfo = 'open') : (classInfo = 'closed');
  function toggleTheme() {
    const main = document.getElementById('root');
    if (main) {
      dark ? (main.className = 'darkMode') : (main.className = 'lightMode');
    }
  }
  return (
    <nav id='nav-bar'>
      <div id='logo'>
        <img
          src={require('../images/odin-logo.png').default}
          alt='odin-eye-logo'
        />
      </div>
      <Link className='link' to='/'>
        Main Page
      </Link>
      <br />
      <Link className='link' to='/kubernetes'>
        Kubernetes Clusters
      </Link>
      <br />
      {/* <Link to='/mongo'>PETER</Link> */}
      {/* <br /> */}
      {/* <Link to='/alert'>EMILY</Link> */}
      <img
        id='eyepatch'
        className={classInfo}
        src={
          dark
            ? require('../images/3.png').default
            : require('../images/4.png').default
        }
        onClick={(e) => {
          let eye = document.getElementById('eyepatch') as HTMLInputElement;
          dark ? (eye.className = 'open') : (eye.className = 'closed');
          toggleTheme();
          dispatch(darkMode(dark));
        }}
      />
      <br />
    </nav>
  );
};

export default NavBar;
