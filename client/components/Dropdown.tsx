const React = require('react');
import { useState, useEffect, useRef } from 'react';

type DropDownType = {
  namespaces: string[] | null;
  current: string;
  handleChange: (name: string) => void;
};

const DropDown = ({ namespaces, current, handleChange }: DropDownType) => {
  //react hook to open/close the dropdown
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(!open);
  };

  //creates array of html button elements of each namespaces
  const nameSpaceArr: any = [];
  if (namespaces) {
    namespaces.forEach((name) => {
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
  }
  //function to close menu after selection click
  const handleMenu = (name: string) => {
    setOpen(false);
  };

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  return (
    <div id='dropdown'>
      <button id='dropdown-but' ref={ref} onClick={handleOpen}>
        {current}
      </button>
      {open ? <ul className='menu'>{nameSpaceArr}</ul> : null}
    </div>
  );
};

//helper function to close dropdown if click is outside of the dropdown
const useOutsideClick = (cb: Function) => {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        cb();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return ref;
};

export default DropDown;
