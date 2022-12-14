import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkMode } from '../rootReducer';
import { State } from '../../types';

const NavBar = () => {
  //Dispatch action for toggling light/dark mode in global state
  const dispatch = useDispatch();
  const dark = useSelector((state: State) => state.dark);

  let classInfo: string;

  dark ? (classInfo = 'open') : (classInfo = 'closed');

  //helper function to toggle class name for theme on the root component
  function toggleTheme() {
    const main = document.getElementById('root');
    //main component changes
    if (main) {
      dark ? (main.className = 'theme-dark') : (main.className = 'theme-light');
    }
    //Used to grab the body and alter the theme for the body html element
    const body = Array.from(document.getElementsByTagName('body'))[0];
    if (body) {
      dark
        ? body.setAttribute('data-theme', 'dark')
        : body.setAttribute('data-theme', 'light');
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
      <div id='main' className='link-div'>
        <Link className='link' to='/'>
          Main Page
        </Link>
      </div>
      <div id='kubernetes' className='link-div'>
        <Link className='link' to='/kubernetes'>
          Kubernetes Clusters
        </Link>
      </div>
      <div id='mongo' className='link-div'>
        <Link className='link' to='/mongo'>
          MongoDB
        </Link>
      </div>
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
