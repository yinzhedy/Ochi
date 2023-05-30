import React from 'react';
import useWalk from '../hooks/useWalk';
import useKeyPress from '../hooks/keyPress'
import Actor from './Actor'


export default function Character({skin}) {
  const {dir, step, walk, position} = useWalk(3); // Adjust maxSteps as needed
  const data = {
    h: 32,
    w: 32,
};


  useKeyPress((e) => {
    e.preventDefault();
    walk(e.key.replace("Arrow", "").toLowerCase())})

  return (
    <div>
      <Actor
      sprite={`skins/${skin}.png`}
      data={data}
      step={step}
      dir={dir}
      position={position}
      />

    </div>
    )
};
