import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav id='navBar'>
      <div>HELLO I AM A NAVBAR</div>
      <Link to='/'>CHRIS</Link>
      <br />
      <Link to='/kubernetes'>WENDY</Link>
      <br />
      {/* <Link to='/mongo'>PETER</Link> */}
      {/* <br /> */}
      {/* <Link to='/alert'>EMILY</Link> */}
      <button
        id='eyepatch'
        onClick={(e) => {
          let eye = document.getElementById('eyepatch') as HTMLInputElement;
          eye.innerHTML === 'eye'
            ? (eye.innerHTML = 'eyepatch')
            : (eye.innerHTML = 'eye');
          console.log(eye);
        }}
      >
        eye
      </button>
    </nav>
  );
};

export default NavBar;
