import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { darkMode } from '../rootReducer';
import { TestState } from '../../types';

const NavBar = () => {
  const dispatch = useDispatch();
  const darkTest = useSelector((state: TestState) => state.dark);
  return (
    <nav id='nav-bar'>
      <button
        id='eyepatch'
        onClick={(e) => {
          let eye = document.getElementById('eyepatch') as HTMLInputElement;
          dispatch(darkMode(darkTest));
          eye.innerHTML === 'eye'
            ? (eye.innerHTML = 'eyepatch')
            : (eye.innerHTML = 'eye');
        }}
      >
        eye
      </button>
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
