const React = require('react');
import { useState, useEffect, useRef } from 'react';

type PodNameType = {
  pod: string;
  ready: boolean;
  setCurrentPod: (name: string) => void;
  setButtonPopup: (on: boolean) => void;
};

const PodName = ({
  pod,
  ready,
  setCurrentPod,
  setButtonPopup,
}: PodNameType) => {
  let className;
  ready ? (className = 'pod-list') : (className = 'pod-list-bad');
  return (
    <div key={pod}>
      <a
        className={className}
        onClick={() => {
          setCurrentPod(pod);
          setButtonPopup(true);
        }}
      >
        {pod}
      </a>
      <br />
    </div>
  );
};

export default PodName;
