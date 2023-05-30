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

  const spriteSize = 32; // Adjust sprite size as needed
  const spriteSheetWidth = 576; // Adjust sprite sheet width as needed
  const spriteSheetHeight = 256; // Adjust sprite sheet height as needed
  const numSteps = 4; // Number of steps in the sprite sheet

  useKeyPress((e) => {
    e.preventDefault();
    walk(e.key.replace("Arrow", "").toLowerCase())})

  // const getSpriteLocation = () => {
  //   const directionMap = {
  //     down: 0,
  //     left: 1,
  //     right: 2,
  //     up: 3,
  //   };

  //   const stepMap = {
  //     0: 0,
  //     1: 1,
  //     2: 0,
  //     3: 2,
  //   };

  //   const spriteX = step * spriteSize;
  //   const spriteY = directionMap[dir] * spriteSize;
  //   const offsetX = stepMap[step] * spriteSheetWidth;
  //   const offsetY = 0;

  //   return {
  //     backgroundPosition: `-${spriteX + offsetX}px -${spriteY + offsetY}px`,
  //   };
  // };

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
