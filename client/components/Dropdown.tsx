const React = require('react');
import { useState, useEffect, useRef } from 'react';

type DropDownType = {
  namespaces: string[] | null;
  current: string;
  handleChange: (name: string) => void;
};

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

const DropDown = ({ namespaces, current, handleChange }: DropDownType) => {
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => {
    setOpen(!open);
  };

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
  const handleMenu = (name: string) => {
    setOpen(false);
  };

  const handleClickOutside = () => {
    setOpen(false);
  };
  const ref = useOutsideClick(handleClickOutside);
  return (
    <div id='dropdown'>
      <button id='dropdown-but' ref={ref} onClick={handleOpen}>
        {current}
      </button>
      {open ? <ul className='menu'>{nameSpaceArr}</ul> : null}
    </div>
  );
};

export default DropDown;
