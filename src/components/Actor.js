import React from 'react';
import Sprite from "./Sprite";
// Actor component is defined as a default export of the module. It receives several props, including sprite, data, position, step, and dir.
function Actor({ sprite, data, position={x:0, y:0}, step = 0, dir= 0}) {
  // Destructure the 'h' and 'w' properties from the 'data' object
  const { h, w } = data;

  return (
    <Sprite
      image={sprite} // Pass the 'sprite' prop to the 'Sprite' component
      position={position} // Pass the 'position' prop to the 'Sprite' component
      data={{
        x: step * w, // Calculate the source x position based on the 'step' and 'w' values
        y: dir * h, // Calculate the source y position based on the 'dir' and 'h' values
        w, // Pass the 'w' prop to the 'Sprite' component
        h, // Pass the 'h' prop to the 'Sprite' component
      }}
    />
  );
}

export default Actor;
