const React = require('react');
import { useState, useEffect } from 'react';

type DropDownType = {
  nameSpaces: string[];
  current: string;
  handleChange: (name: string) => void;
};

const DropDown = ({ nameSpaces, current, handleChange }: DropDownType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };
  const nameSpaceArr: any = [];
  nameSpaces.forEach((name) => {
    nameSpaceArr.push(
      <li key={`li` + name} className='menu-item'>
        <button
          key={'li-but' + name}
          onClick={() => {
            handleMenu(name);
            handleChange(name);
          }}
        >
          {name}
        </button>
      </li>
    );
  });

  const handleMenu = (name: string) => {
    setOpen(false);
  };
  return (
    <div id='dropdown'>
      <button id='dropdown-but' onClick={handleOpen}>
        {current}
      </button>
      {open ? <ul className='menu'>{nameSpaceArr}</ul> : null}
    </div>
  );
};

export default DropDown;
