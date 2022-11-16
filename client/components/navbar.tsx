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
  return (
    <nav id='nav-bar'>
      <button
        id='eyepatch'
        className={classInfo}
        onClick={(e) => {
          let eye = document.getElementById('eyepatch') as HTMLInputElement;
          dark ? (eye.className = 'open') : (eye.className = 'closed');
          dispatch(darkMode(dark));
        }}
      ></button>
      <br />
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
    </nav>
  );
};

export default NavBar;
